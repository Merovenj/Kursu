# Prior Art — what exists, and what KÜRSÜ adds

Hand this to contributors and grant reviewers so nobody thinks we're reinventing
the wheel.

## Fork these (mature, maintained)

- **Semaphore** — `github.com/semaphore-protocol`. Anonymous group membership +
  one-signal-per-scope via nullifiers. Ships a boilerplate GitHub template and a
  `SemaphoreVoting.sol` extension. This is our enrollment + anonymous-vote layer.
- **MACI** — `github.com/privacy-scaling-explorations/maci` (docs `maci.pse.dev`).
  Receipt-free, coercion-resistant on-chain voting. Explicitly leaves Sybil
  resistance to an external solution — that "external" is our eligibility bridge.

## Learn from (don't fork wholesale)

- **ElectAnon** (Onur & Yurdakul) — Turkish-authored anonymous ranked-choice
  protocol; same research lineage.
- zk-SNARK e-voting "voting sandbox" work — proving eligibility for a session
  while staying anonymous, for local/national elections.
- **clr.fund** — a live MACI deployment.
- **Helios** — the classic end-to-end-verifiable voting system (not blockchain);
  read for the verifiability model.

## What KÜRSÜ actually contributes (greenfield)

1. **e-Devlet eligibility bridge** — no open implementation exists; no official
   third-party federation. Barcode doc → zkTLS (Reclaim/zkPass) → blind enrollment.
2. **Grassroots party-governance layer** — proposal threshold, votable rule,
   soulbound one-member-one-vote framed for a base.
3. **Transparent treasury** on the same public ledger as the votes.

## Funding match

PSE runs a Semaphore grants round for real-world community applications —
non-dilutive money aimed at exactly this kind of integration.
