// e-Devlet adapter — REFERENCE TARGET, NOT IMPLEMENTED (tickets M01/M02).
//
// Design intent (do NOT ship a credential-harvesting version):
//   - The user proves, via zkTLS (e.g. Reclaim / zkPass), that an authenticated
//     e-Devlet session returned "party membership = <party>".
//   - The app receives a cryptographic attestation of that session result, never
//     the user's e-Devlet password or raw document.
//   - From the attestation we derive a deterministic, non-reversible nullifierSeed
//     (so one citizen = one enrollment) WITHOUT learning the identity (blind
//     enrollment, see packages/identity).
//
// This is the project's hardest and most legally novel module. See
// docs/ARCHITECTURE.md and docs/KVKK.md before implementing.
import { EligibilityAdapter } from "./base.js";

export class EDevletAdapter extends EligibilityAdapter {
  async verify(_token) {
    throw new Error(
      "EDevletAdapter is a stub. Implement zkTLS attestation (M01/M02). " +
      "Never collect e-Devlet credentials."
    );
  }
}
