// @kursu/ledger — append-only, hash-chained public log.
// NEVER write personal data here. Only commitments, nullifiers, tallies, and
// treasury memos. The chain lets anyone detect tampering independently.
import { createHash } from "node:crypto";

const GENESIS = "0".repeat(64);
const h = (s) => createHash("sha256").update(s).digest("hex");

/** Compute the hash of an entry given the previous hash. */
export function entryHash(prevHash, entry) {
  return h(prevHash + "|" + JSON.stringify(entry));
}

/** Append an entry to an in-memory chain. Returns the new chain. */
export function append(chain, entry) {
  const prev = chain.length ? chain[chain.length - 1].hash : GENESIS;
  const body = { ...entry, ts: entry.ts || Date.now() };
  return [...chain, { ...body, prev, hash: entryHash(prev, body) }];
}

/** Verify a full chain. Returns { ok, brokenAt }. */
export function verify(chain) {
  let prev = GENESIS;
  for (let i = 0; i < chain.length; i++) {
    const { hash, prev: p, ...body } = chain[i];
    if (p !== prev) return { ok: false, brokenAt: i };
    if (entryHash(prev, body) !== hash) return { ok: false, brokenAt: i };
    prev = hash;
  }
  return { ok: true, brokenAt: -1 };
}

// TODO(T07): mirror the chain to a public git repo (signed commits) so the
// ledger is externally auditable. TODO(M07): persist to L2 / IPFS / Arweave.
