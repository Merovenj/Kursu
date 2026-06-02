# @kursu/eligibility

The seam that makes KÜRSÜ generalizable. An adapter answers ONE question:
*is this person an eligible member?* — ephemerally, storing nothing else.

Implement `EligibilityAdapter` for any base / country / source.

- `mock` — DEMO. Any non-empty code passes. Trivially Sybil-able; for demos only.
- `edevlet` — reference target (Turkish party membership). **Not implemented** —
  this is the greenfield bridge (tickets M01/M02), intended via barcoded e-Devlet
  document / zkTLS (Reclaim/zkPass). It must NEVER ask the user for their e-Devlet
  password; the user proves a session result, not their credentials.
