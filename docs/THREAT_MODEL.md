# Threat Model

Honest about what is and isn't defended.

## Properties we want

- **Eligibility** — only real members vote.
- **One-member-one-vote** — soulbound, non-transferable, nullifier-enforced.
- **Ballot secrecy** — who voted how is never revealed.
- **Public verifiability** — anyone can recompute the result.
- **Coercion/bribery resistance** (MACI tier) — you cannot prove to a briber how
  you voted.

## Key risks

### 1. Enrollment bridge (the weak link)
A compromised eligibility verifier could mint fake members (Sybil) or log the
identity↔commitment mapping (de-anonymization). Mitigation: **blind enrollment**
(verifier sees "already enrolled?" via a deterministic nullifier, not the
mapping). This module deserves the most review.

### 2. Sybil attacks — transparency as immune system
We do **not** claim Sybil is impossible. Strategy:
- Raise cost at the gate (e-Devlet eligibility + soulbound one-vote).
- Make any attack **visible** in the open ledger (anomalous enrollment surges,
  timing/clustering are publicly auditable and contestable).
- Caveat: **detection ≠ prevention.** In the window before detection, a flood can
  produce a headline number an adversary spins as "fake". Keep the gate; rely on
  daylight as the second line, not the only line.

### 3. Coordinator key (MACI)
The coordinator can decrypt ballots (so it is a privacy trust point, not an
integrity one). Compromise silently breaks secrecy. Mitigation: off-shore,
threshold (t-of-n) key, rotation, opsec.

### 4. Client device
Malware or forced-app-install defeats any e-voting scheme. Out of scope; document
honestly to users.

### 5. Legitimacy, not money
A bug here costs legitimacy, which is the product. Hence: no real votes before the
`M08` audit, and the permanent DEMO banner until then.
