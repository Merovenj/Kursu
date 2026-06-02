// Tiny relayer client. Falls back to a clear error if the relayer isn't running.
const BASE = import.meta.env.VITE_RELAYER_URL || "http://localhost:8787";
async function j(path, opts) {
  const r = await fetch(BASE + path, { headers: { "content-type": "application/json" }, ...opts });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.statusText);
  return r.json();
}
export const api = {
  state: () => j("/state"),
  enroll: (code) => j("/enroll", { method: "POST", body: JSON.stringify({ code }) }),
  propose: (p) => j("/proposals", { method: "POST", body: JSON.stringify(p) }),
  endorse: (id) => j("/proposals/" + id + "/endorse", { method: "POST" }),
  vote: (id, option, nullifier) => j("/polls/" + id + "/vote", { method: "POST", body: JSON.stringify({ option, nullifier }) }),
  ledger: () => j("/ledger"),
};
