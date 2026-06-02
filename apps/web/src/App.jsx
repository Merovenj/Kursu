// KÜRSÜ web — minimal reference UI (enroll → propose/endorse → vote → ledger).
// Crypto is SIMULATED in demo mode; the banner says so. Design polish lives in
// the frontend-design pass — this is the wired skeleton (tickets T02/T04/T06).
import React, { useEffect, useState } from "react";
import { api } from "./lib/api.js";

const DEMO = (import.meta.env.VITE_DEMO_MODE ?? "true") !== "false";

export default function App() {
  const [identity, setIdentity] = useState(null);  // {secret, commitment}
  const [code, setCode] = useState("");
  const [state, setState] = useState(null);
  const [err, setErr] = useState("");

  const refresh = () => api.state().then(setState).catch((e) => setErr(e.message));
  useEffect(() => { refresh(); }, []);

  const enroll = async () => {
    setErr("");
    try {
      await api.enroll(code);
      const secret = crypto.getRandomValues(new Uint8Array(16)).reduce((s, b) => s + b.toString(16).padStart(2, "0"), "");
      setIdentity({ secret, commitment: "0x" + secret.slice(0, 16) });
      refresh();
    } catch (e) { setErr(e.message); }
  };

  const voteNullifier = (pollId) =>
    "0x" + [...(identity?.secret + ":" + pollId)].reduce((a, c) => (a * 33 + c.charCodeAt(0)) >>> 0, 5381).toString(16);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 20, fontFamily: "system-ui, sans-serif" }}>
      {DEMO && (
        <div style={{ background: "#fbe9e7", border: "1px solid #C1361F", color: "#9A2A17", padding: "8px 12px", marginBottom: 16, fontSize: 13 }}>
          ⚠️ DEMO — not a real vote. Crypto is simulated; enrollment is mocked. Not for binding decisions.
        </div>
      )}
      <h1 style={{ fontWeight: 800 }}>KÜRSÜ<span style={{ color: "#C1361F" }}>.</span></h1>
      <p style={{ color: "#666" }}>Açık, doğrulanabilir, merkezsiz taban yönetişimi.</p>
      {err && <p style={{ color: "#C1361F" }}>{err}</p>}

      {!identity ? (
        <section>
          <h3>Kayıt</h3>
          <p style={{ color: "#666", fontSize: 14 }}>Barkodlu üyelik belgesinin doğrulama kodunu gir (demo: herhangi bir kod).</p>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="doğrulama kodu"
                 style={{ padding: 10, width: "60%" }} />
          <button onClick={enroll} style={{ padding: 10, marginLeft: 8 }}>Doğrula ve kaydol</button>
        </section>
      ) : (
        <>
          <p style={{ fontSize: 13, color: "#3C6E47" }}>Kayıtlı ✓ commitment {identity.commitment}</p>

          <section>
            <h3>Oylamalar</h3>
            {state?.polls?.length ? state.polls.map((p) => (
              <div key={p.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 10 }}>
                <b>{p.title}</b>
                <ul>{p.options.map((o) => <li key={o}>{o} — {p.tally?.[o] ?? 0}</li>)}</ul>
                <select id={"sel-" + p.id} defaultValue="">
                  <option value="" disabled>Seç…</option>
                  {p.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <button style={{ marginLeft: 8 }} onClick={async () => {
                  const sel = document.getElementById("sel-" + p.id).value;
                  if (!sel) return;
                  try { await api.vote(p.id, sel, voteNullifier(p.id)); refresh(); }
                  catch (e) { setErr(e.message); }
                }}>Oyu mühürle</button>
              </div>
            )) : <p style={{ color: "#666" }}>Henüz oylamaya düşmüş öneri yok.</p>}
          </section>

          <section>
            <h3>Bekleyen öneriler — eşik: {state?.threshold?.toLocaleString("tr-TR")}</h3>
            {state?.proposals?.map((p) => (
              <div key={p.id} style={{ borderBottom: "1px solid #eee", padding: "8px 0" }}>
                {p.title} — {p.endorsements}/{state.threshold}
                <button style={{ marginLeft: 8 }} onClick={() => api.endorse(p.id).then(refresh).catch((e) => setErr(e.message))}>Destekle</button>
              </div>
            ))}
            <button style={{ marginTop: 8 }} onClick={() => {
              const title = prompt("Öneri başlığı?"); if (!title) return;
              api.propose({ id: "u" + Date.now(), title, options: ["Evet", "Hayır"] }).then(refresh).catch((e) => setErr(e.message));
            }}>+ Yeni öneri (Evet/Hayır)</button>
          </section>
        </>
      )}

      <footer style={{ marginTop: 30, fontSize: 12, color: "#888", borderTop: "1px solid #eee", paddingTop: 12 }}>
        İstişari · bağlayıcı resmî organ değildir · kişisel veri saklanmaz · <a href="https://github.com/&lt;org&gt;/kursu">kaynak kod</a>
      </footer>
    </div>
  );
}
