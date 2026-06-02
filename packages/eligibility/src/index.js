// @kursu/eligibility — pluggable eligibility adapters.
// nullifierSeed is a deterministic, NON-reversible value derived from the
// underlying identity so the same person cannot enroll twice — WITHOUT the
// system learning who they are.
export { EligibilityAdapter } from "./base.js";
import { MockEligibilityAdapter } from "./mock.js";
import { EDevletAdapter } from "./edevlet.js";

const REGISTRY = { mock: MockEligibilityAdapter, edevlet: EDevletAdapter };

export function getAdapter(name = process.env.KURSU_ELIGIBILITY_ADAPTER || "mock") {
  const A = REGISTRY[name];
  if (!A) throw new Error("unknown eligibility adapter: " + name);
  return new A();
}
