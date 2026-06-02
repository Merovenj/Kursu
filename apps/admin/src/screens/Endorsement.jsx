import React, { useEffect, useState } from "react";
import { ORG, fmt } from "../data.js";
import SentimentBar from "../components/SentimentBar.jsx";

const SENTIMENTS = [
  { key: "s1", ico: "—", label: "Disagree strongly" },
  { key: "s2", ico: "−", label: "Disagree" },
  { key: "s3", ico: "•", label: "Neutral" },
  { key: "s4", ico: "+", label: "Agree" },
  { key: "s5", ico: "++", label: "Agree strongly" },
];

export default function Endorsement({ state, dispatch, setScreen }) {
  const { proposals, tokens } = state;
  // Find the threshold-edge proposal first, fall back to first endorsement
  const proposal =
    proposals.find((p) => p.id === state.selectedProposalId && p.stage === "endorsement") ||
    proposals.find((p) => p.stage === "endorsement");

  const [flash, setFlash] = useState(false);

  // Watch for crossing the threshold
  useEffect(() => {
    if (!proposal) return;
    if (proposal.support >= ORG.threshold && proposal.stage === "endorsement") {
      setFlash(true);
    } else {
      setFlash(false);
    }
  }, [proposal?.support, proposal?.stage]);

  if (!proposal) {
    return (
      <div>
        <h1>Şu an destek toplama evresinde önerge yok.</h1>
        <button onClick={() => setScreen("proposals")}>← Önergeler</button>
      </div>
    );
  }

  const pct = Math.min(100, (proposal.support / ORG.threshold) * 100);
  const remaining = Math.max(0, ORG.threshold - proposal.support);
  const crossed = proposal.support >= ORG.threshold;

  const promote = () => {
    dispatch({ type: "PROMOTE_TO_TEMP", id: proposal.id });
    setTimeout(() => setScreen("temp"), 800);
  };

  return (
    <div>
      <div className="kicker">Endorsement</div>
      <h1 style={{ marginBottom: 8 }}>{proposal.title}</h1>
      <p style={{ color: "var(--ink-soft)" }}>{proposal.summary}</p>
      <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 12, marginBottom: 16 }}>
        {proposal.id} · opened {proposal.openedAt} · author {proposal.author}
      </div>

      <div className="card">
        <div className="kicker">Destek</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div className="med-number mono">{fmt(proposal.support)}</div>
          <div className="mono" style={{ color: "var(--ink-mute)" }}>eşik {fmt(ORG.threshold)}</div>
        </div>
        <div className={`prog ${crossed ? "over" : pct > 95 ? "near" : ""}`} style={{ marginTop: 10 }}>
          <i style={{ width: pct + "%" }} />
        </div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 6 }}>
          {crossed ? "Threshold reached" : `${fmt(remaining)} more to reach threshold`}
        </div>

        <div style={{ marginTop: 16 }}>
          <SentimentBar sentiment={proposal.sentiment} />
        </div>
      </div>

      {flash && (
        <div className="flash">
          🟢 Threshold reached — L2 recognition token minted to all enrolled.
          This proposal moves to Temperature Check.
          <div style={{ marginTop: 8 }}>
            <button className="btn-primary" onClick={promote}>
              Open Temperature Check →
            </button>
          </div>
        </div>
      )}

      {!crossed && (
        <div className="card">
          <h3>Cast a sentiment</h3>
          <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
            Spend 1 faucet token to signal where you stand. Each cast = 1 support count.
            (Your sentiment is aggregated; no per-member record is kept.)
          </p>
          <div className="sentiment-picker">
            {SENTIMENTS.map((s) => (
              <button
                key={s.key}
                onClick={() => dispatch({ type: "ENDORSE", id: proposal.id, sentiment: s.key })}
                disabled={tokens.faucet <= 0}
                title={s.label}
              >
                <span className="ico">{s.ico}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 12, color: "var(--ink-mute)", display: "flex", justifyContent: "space-between" }}>
            <span>Cost: 1 faucet token · You have {tokens.faucet}</span>
            <button
              className="btn-ghost"
              onClick={() => dispatch({ type: "ENDORSE_BATCH", id: proposal.id, amount: Math.max(62, ORG.threshold - proposal.support) })}
              title="Demo only: jump the support count to threshold"
            >
              ⤳ Simulate +{Math.max(62, ORG.threshold - proposal.support)} (demo)
            </button>
          </div>
        </div>
      )}

      <div className="privacy-note">
        Yapısal anonimlik: bu sayfa kimlik saklamaz. Hangi üyenin hangi
        duyarlılığı seçtiği veritabanında <em>tutulmaz</em>; sadece toplam
        sayım ve duyarlılık dağılımı güncellenir.
      </div>
    </div>
  );
}
