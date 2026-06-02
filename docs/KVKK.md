# Data Protection (KVKK / GDPR posture)

## Principle: store nothing you must protect

Political party membership is **special-category personal data** (KVKK Art. 6 /
GDPR Art. 9). The safest design is to never hold it.

- **Ephemeral eligibility.** The eligibility adapter checks "member? yes/no" at
  enrollment and immediately discards everything else. No membership data at rest.
- **No identity on the ledger.** Only commitments and nullifiers (hashes) are
  written. The public, immutable ledger never contains personal data — which also
  avoids the right-to-erasure conflict an immutable store would otherwise create.
- **Consent done right.** A single, clear, informed consent — not click-fatigue.
  Dark-pattern consent walls weaken consent; they don't strengthen it.

## Cross-border transfer

If infrastructure is off-shore (for resilience/opsec), remember KVKK still applies
to data of people in Türkiye regardless of server location, and Art. 9 transfer
rules apply. Off-shore is for resilience, not for escaping the law.

## Legal distinctness

KÜRSÜ must be structurally independent of any political party (an open-source
commons, not a party organ) so that funding is not a "party donation" and the
project is not bound by party-organ rules. This is counsel's first task.
