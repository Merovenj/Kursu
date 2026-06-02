<!-- CONTRIBUTORS.md -->
# Contributors

KÜRSÜ is a commons. Everyone who moves it forward is recognized here — code is
not the only contribution. We follow the spirit of the all-contributors
convention (https://allcontributors.org).

Contribution types: 💻 code · 🎨 design · 📖 docs · 🔐 security/crypto ·
🌍 translation · 📋 coordination · 💰 treasury · 🧪 testing · 🔎 review · 💡 ideas

<!-- Add yourself in your first PR. Format: name/handle — types — one line. -->

| Contributor | Contributions |
|---|---|
| _your name here_ | 💡 (first PR — welcome) |

## Where upstream work shaped us — and where we diverge

Honest credit names both the debt and the departure. A divergence is not a
criticism; it is a difference in philosophy, stated openly.

### ElectAnon (Onur & Yurdakul)

**Where it was decisive for us:**

- The Semaphore-based anonymity model: identity commitments in a Merkle tree,
  nullifiers to stop double-voting, eligibility proven in zero-knowledge.
- Self-tallying — everyone computes the result; no trusted counter.
- The autonomous timed-state machine so no authority can freeze a running poll.
- Ranked-choice with an algorithm-agnostic tally, and Merkle-forest scaling to
  ~1,000,000 voters. This is the backbone of our poll/tally/scalability layer.

**Where our philosophy diverges — and why:**

- ElectAnon is anonymous but **not receipt-free**: at reveal, a voter discloses
  their vote-id and secret to self-tally, so a voter *can prove how they voted.*
- We consider a provable vote a **vote-buying / coercion market**: the moment you
  can hand someone a voucher of *how* you voted, that voucher has a price, and the
  merkez (or any buyer) has a lever.
- **Our design forbids that voucher.** Through MACI-style receipt-freeness, you
  cannot produce proof of how you voted — not to a briber, not to a boss, not to
  the party. The vote is verifiable in the *aggregate* and anonymous in the
  *individual*, but **how you voted is knowable only to your conscience.**
- This costs us a coordinator (a privacy trust point, kept off-shore and
  threshold-split) — a price we pay deliberately to keep the ballot un-sellable.

In short: we owe ElectAnon the skeleton of anonymity and scale; we part ways on
the receipt, because a receipt is a market and a conscience is not.

### Semaphore (Privacy & Scaling Explorations)

**Where it was decisive:** the core primitive — prove membership of a Merkle-tree
group and emit one nullifier-bound signal per scope, without revealing which
member. This *is* our enrollment + one-member-one-vote layer; we use it directly.

**Where we diverge / extend:** Semaphore is a neutral library, not an opinion. We
add the parts it deliberately leaves out — *who* is admitted to the group (the
eligibility adapter), the **blind enrollment** so the registrar never learns the
identity↔commitment mapping, and the **soulbound** (non-transferable) treatment of
the membership so a seat can't be sold. Semaphore gives the gate; we decide who
holds the key and forbid passing it on.

### MACI (Privacy & Scaling Explorations)

**Where it was decisive:** receipt-freeness. MACI is the reason we can promise that
**you cannot prove how you voted** — the exact property ElectAnon lacks and the one
that kills the vote-buying market. Used for high-stakes ("critical") polls.

**Where we diverge / accept a cost:** MACI reintroduces a coordinator who can
*decrypt* (a privacy trust point, though never an integrity one — it cannot forge
the tally). We don't pretend that away: we keep the coordinator **off-shore,
threshold-split (t-of-n), and rotated**, and we use MACI only where coercion is a
real threat, not everywhere. A deliberate, documented trade, not a free lunch.

### Helios (Ben Adida)

**Where it influenced us:** the discipline of **end-to-end verifiability** — cast-
as-intended, recorded-as-cast, tallied-as-recorded — and the culture of "don't
trust, verify" with an open, independently checkable tally. Our public hash-chained
ledger and standalone verifier node carry Helios's spirit.

**Where we diverge:** Helios is web/server-based and assumes a trusted bulletin
board; it does not target coercion resistance for binding political stakes. We move
the bulletin board to an open, append-only, externally auditable ledger (no single
trusted server), and we add coercion resistance via MACI. We took the *standard of
verifiability* from Helios, not its trust model.

## The KÜRSÜ Medal — recognition, not payment

Contribution is rewarded with recognition, openly and verifiably — never with a
claim on the project (there are no shares; KÜRSÜ is a commons).

**On-theme, crypto-native:** a **soulbound contributor token** — non-transferable,
just like a KÜRSÜ member identity. It cannot be bought or sold; it only marks
that you helped. (A POAP works equally well, as the Semaphore project did for its
contributors.) Tiers:

- 🥉 **Katkıcı (Contributor)** — first merged PR.
- 🥈 **Bakımcı (Maintainer)** — sustained ownership of a module.
- 🥇 **Kurucu Çember (Founding Circle)** — built KÜRSÜ in its first season.
- 🏅 **Onur Madalyası (Honor Medal)** — for upstream giants whose work we build
  on, if they accept it (e.g. the Semaphore/MACI/ElectAnon authors). By
  invitation and consent only.

**No-crypto fallback:** this table + a README Hall of Fame + GitHub's own
contributor graph. The medal must never gate participation — it only celebrates it.

> Medals carry no monetary value, no governance weight, and no obligation. They
> are opt-in and never reveal anything a contributor hasn't chosen to share.
