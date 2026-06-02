// MOCK adapter — DEMO ONLY. Any non-empty code "passes".
// This is Sybil-trivial by design; deployments using it MUST show the demo banner.
import { createHash } from "node:crypto";
import { EligibilityAdapter } from "./base.js";

export class MockEligibilityAdapter extends EligibilityAdapter {
  async verify(token) {
    const code = String(token || "").trim();
    if (!code) return { eligible: false, nullifierSeed: "" };
    // deterministic seed so the same code can't enroll twice in the demo
    const nullifierSeed = createHash("sha256").update("mock:" + code).digest("hex");
    return { eligible: true, nullifierSeed };
  }
}
