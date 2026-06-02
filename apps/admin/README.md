# `apps/admin/` — KÜRSÜ Admin Panel (clickable mockup)

> ⚠ **This is a presentation prototype, not a working system.** All data is
> hardcoded in-memory, there is no backend, no database, no real crypto, no
> ledger. The mockup exists so the KÜRSÜ idea can be clicked through in a
> meeting in under five minutes.

## Run

```bash
cd apps/admin
npm install
npm run dev
```

Opens at `http://localhost:5174`.

## What this mockup shows

Six screens chained into one story:

1. **Dashboard** — token balances (100 faucet / 5 voting, soulbound) and a live
   epoch countdown.
2. **Proposals** — stage badges (Endorsement / Temperature Check / Formal Vote /
   Decided) and a Member ↔ Bystander toggle so you can show the public,
   read-only view.
3. **Endorsement** — 5-point sentiment, support climbs toward the 20,000
   threshold. The lead proposal sits at 19,940; a click on "Simulate +62
   (demo)" crosses the threshold and fires the threshold-reached moment.
4. **Temperature Check** — 72-hour countdown, live 5-point aggregation, flat
   anonymous comments. Every label makes the anonymity guarantee explicit.
5. **Formal Vote** — Approve / Reject / Abstain with a binding-and-irreversible
   warning. **After voting, the confirmation says only "Recorded ✓".** No
   receipt, no "you chose X", no proof-of-vote. The conscience-vs-market
   epigraph is on the same screen so the point is unmissable in the demo.
6. **Public Ledger** — append-only rows showing anonymous tallies, nullifier
   hashes, and threshold/L2 events. No identity field anywhere.

## The three differentiators, made visible

| | Where the mockup shows it |
|---|---|
| Formal vote is secret — no receipt | Formal Vote → Recorded ✓ ceremony; the epigraph; the `no user_id stored` line |
| Anonymity is structural | Privacy notes on Endorsement, Temperature Check, Formal Vote, and Ledger screens |
| The 20K L2 token is recognition, not money | Token badges marked *soulbound, non-transferable*; Dashboard note "para değildir, bir tanıma işaretidir" |

## Deliberate divergence from the PDF spec

The accompanying PDF spec (`KÜRSÜ_Admin_Panel_-_Updated_Architecture_(...).pdf`)
contains one passage that contradicts the project's stated philosophy:

> **PDF, p.7, "FORMAL VOTING TRANSPARENCY":**
> *Vote attribution IS visible (binding vote)*

That is **not** what the mockup shows. The mockup follows the project's
declared stance from `CONTRIBUTORS.md` ("a receipt is a market; a conscience
is not") and from the chat brief that produced this build: formal votes are
receipt-free. Aggregate counts are public; individual attribution is never
recorded, never returned to the voter, never shown anywhere in the UI.

If the PDF spec is going to be the binding document going forward, that
passage needs to be revised — or KÜRSÜ should drop the receipt-free claim.
The two cannot both be true.

## Stack

- React 18 + Vite 5 (vanilla; no router, no UI library)
- All styling in `src/styles.css` (CSS custom properties for the brand palette)
- Fonts via Google Fonts CDN (Fraunces, Archivo, JetBrains Mono)
- State in a single `useReducer` in `src/App.jsx`
- All seed data in `src/data.js`

No external API calls. No localStorage. The "Reset demo state" button in the
bottom-right returns everything to seed.
