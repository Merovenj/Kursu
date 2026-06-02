# circuits/

**Do not roll your own ZK.** KÜRSÜ uses audited, maintained circuits:

- **Semaphore** (`@semaphore-protocol/*`) — membership proof + nullifier. Use the
  Semaphore boilerplate as the starting point for `KURSU_IDENTITY_BACKEND=semaphore`.
- **MACI** (`privacy-scaling-explorations/maci`) — for critical, coercion-resistant
  votes. Note MACI needs a **trusted setup** and a **coordinator** (privacy trust
  point, not integrity). Keep the coordinator key off-shore and threshold-split.

## Wiring tasks
- M03: swap the simulated nullifier in `packages/identity` for real Semaphore proofs.
- M04: add a MACI round option for polls flagged "critical".
- M05: distributed coordinator key + opsec runbook.
- M08: external audit of all circuits + verifier contracts before any real vote.
