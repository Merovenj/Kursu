// @kursu/relayer — thin demo backend. In-memory store. NOT for production.
// Real deployments: persist enrollment nullifier set + ledger, move coordinator
// off-shore, and never let this process see identity<->commitment mappings.
import express from "express";
import cors from "cors";
import { getAdapter } from "@kursu/eligibility";
import { enrollmentNullifier } from "@kursu/identity";
import { proposalThreshold, isPromoted, tally } from "@kursu/governance";
import { append, verify } from "@kursu/ledger";

const app = express();
app.use(cors());
app.use(express.json());

const db = { enrolled: new Set(), proposals: new Map(), polls: new Map(), votes: [], ledger: [] };
const log = (entry) => { db.ledger = append(db.ledger, entry); };

app.get("/health", (_req, res) => res.json({ ok: true, demo: true, threshold: proposalThreshold() }));

// Enroll: verify eligibility (ephemerally), record only a blind nullifier.
app.post("/enroll", async (req, res) => {
  const { code } = req.body || {};
  const { eligible, nullifierSeed } = await getAdapter().verify(code);
  if (!eligible) return res.status(403).json({ error: "not eligible" });
  const nf = enrollmentNullifier(nullifierSeed);
  if (db.enrolled.has(nf)) return res.status(409).json({ error: "already enrolled" });
  db.enrolled.add(nf);
  log({ type: "ENROLL", nullifier: nf });        // no identity, just the blind nullifier
  res.json({ ok: true, enrolledCount: db.enrolled.size });
});

// Propose (anyone). Starts with 1 endorsement.
app.post("/proposals", (req, res) => {
  const { id, title, options } = req.body || {};
  if (!id || !title || !Array.isArray(options) || options.length < 2)
    return res.status(400).json({ error: "need id, title, >=2 options" });
  db.proposals.set(id, { id, title, options, endorsements: 1 });
  log({ type: "PROPOSAL", id });
  res.json({ ok: true });
});

// Endorse. Promotes to a live poll once the threshold is reached.
app.post("/proposals/:id/endorse", (req, res) => {
  const p = db.proposals.get(req.params.id);
  if (!p) return res.status(404).json({ error: "no such proposal" });
  p.endorsements += 1;
  log({ type: "ENDORSE", id: p.id });
  if (isPromoted(p.endorsements) && !db.polls.has(p.id)) {
    db.polls.set(p.id, { ...p });
    db.proposals.delete(p.id);
    log({ type: "PROMOTED", id: p.id });
  }
  res.json({ ok: true, endorsements: p.endorsements, threshold: proposalThreshold() });
});

// Vote on a live poll. nullifier = one vote per (member, poll).
app.post("/polls/:id/vote", (req, res) => {
  const poll = db.polls.get(req.params.id);
  if (!poll) return res.status(404).json({ error: "no such poll" });
  const { option, nullifier } = req.body || {};
  if (!poll.options.includes(option)) return res.status(400).json({ error: "bad option" });
  if (db.votes.find((v) => v.scope === poll.id && v.nullifier === nullifier))
    return res.status(409).json({ error: "already voted" });
  db.votes.push({ scope: poll.id, option, nullifier });
  log({ type: "VOTE", scope: poll.id, nullifier });
  res.json({ ok: true });
});

app.get("/state", (_req, res) => res.json({
  enrolledCount: db.enrolled.size,
  threshold: proposalThreshold(),
  proposals: [...db.proposals.values()],
  polls: [...db.polls.values()].map((p) => ({ ...p, tally: tally(db.votes.filter((v) => v.scope === p.id), p.options) })),
}));

app.get("/ledger", (_req, res) => res.json({ ok: verify(db.ledger).ok, entries: db.ledger }));

const port = process.env.KURSU_RELAYER_PORT || 8787;
app.listen(port, () => console.log("[KÜRSÜ relayer] DEMO on :" + port));
