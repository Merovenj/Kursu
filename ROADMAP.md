# Roadmap — PoC → MVP

Build order; dependencies noted so nobody is blocked.

## Phase A — PoC (≈2 weeks, $0, volunteers) — goal: believable demo, NOT a real vote

| Ticket | Work | Module | Tags / deps |
|---|---|---|---|
| T01 | Repo + CI + signed-commit policy | infra | good-first-issue |
| T02 | Web skeleton (from design) | web | good-first-issue · T01 |
| T03 | Multi-user relayer (free tier) | relayer | T01 |
| T04 | Mock e-Devlet enroll flow | web | DEMO · T02 |
| T05 | Semaphore integration (membership + nullifier) | identity | crypto · T03 |
| T05b | Fallback: simulated nullifier (decide by day 9) | identity | crypto |
| T06 | Proposal + threshold → promote to vote | governance | T03 |
| T07 | Public ledger → GitHub mirror (signed) | ledger | verifiability · T03 |
| T08 | "DEMO — not a real vote" banner + KVKK text | web | good-first-issue |
| T09 | Demo script + ~20-person friendly trial | product | T04–T08 |

## Phase B — MVP (months 1–6) — goal: real, audited system

| Ticket | Work | Module | Tags / deps |
|---|---|---|---|
| M01 | Real e-Devlet bridge: zkTLS PoC (Reclaim/zkPass) | eligibility | crypto · research |
| M02 | Blind enrollment + nullifier set | eligibility | crypto · M01 |
| M03 | Soulbound identity persistence | identity | crypto · M02 |
| M04 | MACI round for critical votes (coercion resistance) | identity | crypto · M03 |
| M05 | Distributed coordinator key (threshold) + opsec | infra | security · M04 |
| M06 | Independent verifier node (runs on a Raspberry Pi) | ledger | verifiability |
| M07 | Persistent ledger (L2 / IPFS / Arweave) | ledger | M06 |
| M08 | **Security audit** — circuits + contracts | security | funded · M03–M07 |
| M09 | KVKK compliance + data-minimization leak test | legal | M02 |
| M10 | Accessibility + field test (non-technical member) | web | M01–M07 |
