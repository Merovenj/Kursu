# Governance

KÜRSÜ is governed like an open-source commons, modeled on the Linux kernel: open
contribution, signed and verifiable work, meritocratic maintenance, and an
inviolable right to fork.

## Roles

- **Maintainer Council (3–5).** Reviews and merges across modules, cuts releases,
  mediates disputes. Rotating and accountable — not a single BDFL.
- **Module Maintainers.** One owner each for: `eligibility`, `identity`,
  `governance`, `ledger`, `web`, `relayer`. Listed in `.github/CODEOWNERS`.
- **Contributors.** Anyone. Start with a `good-first-issue`.
- **Treasury Stewards.** Signers on the multi-sig. No single steward can spend.
  Every movement is posted to the public ledger (see `TREASURY.md`).
- **Independent Security Reviewers.** External; may block a merge on security
  grounds.

## Decision process

1. Propose via a GitHub issue / discussion (public).
2. Rough consensus among module maintainer(s) + at least one council member.
3. Security- or privacy-affecting changes require a security reviewer sign-off.
4. Disputes escalate to the Council. If still unresolved, **fork.** The right to
   fork is the ultimate check on capture and is never restricted.

## Amendable by design

These rules — and project parameters such as the proposal threshold — are not
fixed by any center. They are themselves subject to change by the community
process above. Nothing here is sacred except openness and the right to fork.
