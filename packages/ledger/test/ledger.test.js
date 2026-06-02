import { test } from "node:test";
import assert from "node:assert";
import { append, verify } from "../src/index.js";

test("chain verifies and detects tampering", () => {
  let c = [];
  c = append(c, { type: "VOTE", nullifier: "a", scope: "p1" });
  c = append(c, { type: "VOTE", nullifier: "b", scope: "p1" });
  assert.equal(verify(c).ok, true);
  c[0].type = "TAMPER";
  assert.equal(verify(c).ok, false);
});
