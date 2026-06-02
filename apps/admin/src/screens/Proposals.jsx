import React from "react";
import StageBadge from "../components/StageBadge.jsx";
import SentimentBar from "../components/SentimentBar.jsx";
import { ORG, fmt } from "../data.js";

export default function Proposals({ state, setScreen, bystander, setBystander, dispatch }) {
  const { proposals } = state;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20 }}>
        <div>
          <div className="kicker">Önergeler / Proposals</div>
          <h1>Önergeler</h1>
          <p style={{ color: "var(--ink-soft)", maxWidth: 600 }}>
            Her önerge dört evreden geçer: <em>destek</em>, <em>sıcaklık</em>,
            <em> biçimsel oylama</em>, <em>karar</em>. Eşik {fmt(ORG.threshold)}.
          </p>
        </div>
        <div className="toggle" role="tablist" aria-label="View mode">
          <button className={!bystander ? "on" : ""} onClick={() => setBystander(false)}>Member view</button>
          <button className={bystander ? "on" : ""} onClick={() => setBystander(true)}>Bystander view</button>
        </div>
      </div>

      {bystander && (
        <div className="privacy-note">
          Bystander görünümü: yalnızca duyarlılık yüzdeleri görünür. Hiçbir
          katılım eylemi yapılamaz, kimlik gerekmez.
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        {proposals.map((p) => (
          <div className="card" key={p.id}>
            <div style={{ display: "flex", gap: 12, alignItems: "baseline", justifyContent: "space-between" }}>
              <div>
                <span className="mono" style={{ color: "var(--ink-mute)", marginRight: 10 }}>{p.id}</span>
                <StageBadge stage={p.stage} />
              </div>
              <span className="mono" style={{ color: "var(--ink-mute)", fontSize: 12 }}>
                {bystander ? "—" : `${fmt(p.support)} support`}
              </span>
            </div>
            <h3 style={{ margin: "6px 0 4px" }}>{p.title}</h3>
            <p style={{ color: "var(--ink-soft)", marginBottom: 10 }}>{p.summary}</p>

            {p.stage !== "decided" && (
              <div className="prog" style={{ marginBottom: 8 }}>
                <i style={{ width: Math.min(100, (p.support / ORG.threshold) * 100) + "%" }} />
              </div>
            )}
            <SentimentBar sentiment={p.sentiment} />

            {!bystander && (
              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.stage === "endorsement" && (
                  <button className="btn-primary" onClick={() => { dispatch({ type: "NOOP" }); setScreen("endorsement"); }}>
                    Open endorsement →
                  </button>
                )}
                {p.stage === "temp_check" && (
                  <button className="btn-primary" onClick={() => setScreen("temp")}>
                    Open temp-check →
                  </button>
                )}
                {p.stage === "formal_vote" && (
                  <button className="btn-oxblood" onClick={() => setScreen("vote")}>
                    Cast a formal vote →
                  </button>
                )}
                {p.stage === "decided" && p.result && (
                  <span className="mono" style={{ color: "var(--ink-mute)", fontSize: 12 }}>
                    Decided {p.decidedAt} · {p.result.decision} (
                    approve {p.result.approve} · reject {p.result.reject} · abstain {p.result.abstain})
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
