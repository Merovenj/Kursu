# Architecture

KÜRSÜ composes existing, maintained primitives. It does not roll its own crypto.

## Layers

1. **Eligibility adapter** (`packages/eligibility`). Answers one question:
   "is this person an eligible member — yes/no?" Ephemeral: the answer is used
   then forgotten. Pluggable, so KÜRSÜ generalizes beyond any one country/party.
   - `mock` — DEMO; any non-empty code passes.
   - `edevlet` — reference target; proves Turkish party membership via a barcoded
     e-Devlet document / zkTLS (Reclaim/zkPass). **Stub — greenfield (M01/M02).**
2. **Blind enrollment** (`packages/identity`). The user generates a Semaphore
   identity *on their device*; only the commitment is added to the group. The
   verifier checks "not enrolled before" via a nullifier set — it never learns
   which commitment maps to which person.
3. **Group** — a Merkle tree of identity commitments (Semaphore). Stored as
   commitments only; never personal data.
4. **Governance** (`packages/governance`). Anyone proposes. A proposal is promoted
   to a live vote once it passes the endorsement threshold (configurable; default
   ~1% of enrolled). The threshold itself is votable.
5. **Voting.**
   - Low-stakes: plain Semaphore — anonymous, one signal per scope (nullifier
     prevents double-voting).
   - High-stakes: MACI — adds coercion/bribery resistance via a coordinator that
     can decrypt but cannot forge the tally (it publishes a ZK proof of correct
     counting).
6. **Transparency ledger** (`packages/ledger`). Append-only, hash-chained,
   mirrored to a public location. Anyone runs a verifier node to recompute the
   tally. No identity is ever written.

## Generalization

The eligibility adapter is the seam. Implement the `EligibilityAdapter` interface
and KÜRSÜ works for any base with any eligibility source.

## What we deliberately do NOT solve

- **Client-device compromise** (malware/coercion at the phone) — out of scope for
  any cryptographic voting system.
- **Perfect Sybil prevention** — see the threat model: we raise cost and make
  attacks *visible* in the open ledger rather than claiming impossibility.
