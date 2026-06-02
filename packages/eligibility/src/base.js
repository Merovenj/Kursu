// Base interface for eligibility adapters (separate module to avoid cycles).
// An adapter returns { eligible: boolean, nullifierSeed: string }.

/**
 * @typedef {Object} EligibilityResult
 * @property {boolean} eligible
 * @property {string}  nullifierSeed   deterministic per-person, non-reversible
 */
export class EligibilityAdapter {
  /** @param {string} token @returns {Promise<EligibilityResult>} */
  async verify(token) { throw new Error("not implemented"); }
}
