# Security Policy

## Status: UNAUDITED — not for binding votes

KÜRSÜ has **not** completed a security audit (ticket `M08`). Until then it is a
demo. Do not rely on it for real decisions. Every deployment must show the
"DEMO — not a real vote" banner.

## Reporting a vulnerability

Please disclose responsibly. Email: `vedatgurer@gmail.com` (PGP key: TODO).
Do **not** open a public issue for exploitable vulnerabilities. We aim to
acknowledge within 72 hours.

## Sensitive areas (extra care)

- **Eligibility bridge** — the enrollment path is the prime de-anonymization /
  Sybil surface. See `docs/THREAT_MODEL.md`.
- **Coordinator key (MACI)** — compromise silently breaks ballot secrecy. Keep
  it off-shore, threshold-split, rotated.
- **Ledger integrity** — never write identity; preserve the hash chain.
