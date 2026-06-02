// @kursu/identity — enrollment, soulbound one-vote, and per-scope nullifiers.
//
// Backend is selectable:
//   KURSU_IDENTITY_BACKEND=semaphore  -> real ZK (fork Semaphore; see circuits/)
//   KURSU_IDENTITY_BACKEND=simulated  -> DEMO; deterministic hashes, NOT private
//
// The simulated backend has the SAME shape as the real one so the rest of the
// app is identical. It is NOT anonymous and NOT secure — demo only.
import { createHash, randomBytes } from "node:crypto";

const BACKEND = process.env.KURSU_IDENTITY_BACKEND || "simulated";
const h = (s) => createHash("sha256").update(s).digest("hex");

/** Create a member identity on the user's device. Secret never leaves it. */
export function createIdentity() {
  const secret = randomBytes(32).toString("hex");       // stays client-side
  const commitment = h("commitment:" + secret);          // public
  return { secret, commitment };
}

/** Enrollment nullifier: one per person, prevents double enrollment, hides who. */
export function enrollmentNullifier(nullifierSeed) {
  return h("enroll:" + nullifierSeed);
}

/**
 * Produce a vote signal for a given poll scope.
 * The vote nullifier is unique per (identity, scope) => one vote per poll,
 * but reveals nothing across polls.
 * @returns {{ nullifier: string, proof: string }}
 */
export function generateVoteSignal(identitySecret, scope) {
  if (BACKEND === "semaphore") {
    // TODO(M05): replace with real Semaphore proof generation.
    // import { generateProof } from "@semaphore-protocol/proof"
    throw new Error("semaphore backend not wired yet — see circuits/README.md");
  }
  const nullifier = h("vote:" + scope + ":" + identitySecret);
  const proof = "SIMULATED";   // DEMO marker; not a real ZK proof
  return { nullifier, proof };
}

export const isSimulated = BACKEND !== "semaphore";
