#!/usr/bin/env node
// Independent verifier: recompute and check a ledger file (one JSON entry/line).
// Anyone can run this. "Don't trust, verify."
import { readFileSync } from "node:fs";
import { verify } from "./index.js";

const path = process.argv[2];
if (!path) { console.error("usage: kursu-ledger-verify <ledger.jsonl>"); process.exit(2); }
const chain = readFileSync(path, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
const r = verify(chain);
if (r.ok) { console.log("OK — chain intact, " + chain.length + " entries"); process.exit(0); }
console.error("TAMPERED — chain breaks at entry " + r.brokenAt); process.exit(1);
