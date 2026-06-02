import React, { useEffect, useState } from "react";
import { COMMENT_SEEDS, fmt } from "../data.js";
import SentimentBar from "../components/SentimentBar.jsx";

const SENTIMENTS = [
  { key: "s1", label: "Disagree strongly" },
  { key: "s2", label: "Disagree" },
  { key: "s3", label: "Neutral" },
  { key: "s4", label: "Agree" },
  { key: "s5", label: "Agree strongly" },
];

function fmtCountdown(ms) {
  if (ms <= 0) return "Closed";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${h.toString().padStart(2, "0")}h ${m.toString().padStart(2, "0")}m ${ss.toString().padStart(2, "0")}s`;
}

export default function TempCheck({ state, dispatch, now }) {
  const { proposals, tokens } = state;
  // Take the first temp_check proposal (newly-promoted ones land at the top of the array via reducer? no; we keep order — search)
  const proposal =
    proposals.find((p) => p.id === state.tempProposalId && p.stage === "temp_check") ||
    proposals.find((p) => p.stage === "temp_check");

  const [chosen, setChosen] = useState(null);
  const [draft, setDraft] = useState("");

  if (!proposal) {
    return <div><h1>No proposal currently in Temperature Check.</h1></div>;
  }

  const remaining = proposal.tempCheck
    ? new Date(proposal.tempCheck.closesAt).getTime() - now.getTime()
    : 0;

  const totalVotes = proposal.tempCheck?.totalVotes || 0;

  return (
    <div>
      <div className="kicker">Temperature Check · 72 saat</div>
      <h1 style={{ marginBottom: 8 }}>{proposal.title}</h1>
      <p style={{ color: "var(--ink-soft)" }}>{proposal.summary}</p>
      <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 12, marginBottom: 16 }}>
        {proposal.id} · opens {new Date(proposal.tempCheck?.openedAt || Date.now()).toLocaleString("tr-TR")}
      </div>

      <div className="row">
        <div className="card">
          <div className="kicker">Kapanışa kalan süre</div>
          <div className="epoch-clock" style={{ marginTop: 6 }}>{fmtCountdown(remaining)}</div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 4 }}>
            Bittiğinde Formal Vote evresine otomatik geçer.
          </div>
        </div>
        <div className="card">
          <div className="kicker">Toplam katılım</div>
          <div className="med-number mono" style={{ marginTop: 4 }}>{fmt(totalVotes)}</div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 4 }}>
            Anonim — kim ne dedi yazılmaz.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="kicker">Anlık duyarlılık dağılımı</div>
        <div style={{ marginTop: 8 }}>
          <SentimentBar sentiment={proposal.sentiment} />
        </div>
      </div>

      <div className="card">
        <h3>Duyarlılığınızı belirtin</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
          Görüşünüzü 5 noktalı ölçek üzerinde işaretleyin. Bir faucet tokeni
          harcanır. Fikriniz değişirse tekrar oylayabilirsiniz; her seferinde
          1 token daha gider. <strong>Hiçbir kayıt sizi bu seçime bağlamaz.</strong>
        </p>
        <div className="sentiment-picker">
          {SENTIMENTS.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                setChosen(s.key);
                dispatch({ type: "TEMP_VOTE", id: proposal.id, sentiment: s.key });
              }}
              disabled={tokens.faucet <= 0}
              style={chosen === s.key ? { borderColor: "var(--ink)", background: "var(--paper-soft)" } : {}}
              title={s.label}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="mono" style={{ fontSize: 12, color: "var(--ink-mute)" }}>
          Cost: 1 faucet token · You have {tokens.faucet}
        </div>
      </div>

      <div className="privacy-note">
        Yapısal anonimlik. <span className="mono">temperatureCheckVotes</span> tablosunda
        <span className="mono"> user_id</span> alanı <em>yoktur</em>. Yorumlarda da
        kimlik yazılmaz. Bu sayfa sadece duyarlılık dağılımını ve sayıyı günceller.
      </div>

      <h2 style={{ marginTop: 30 }}>Anonim yorumlar</h2>
      <div className="card tight">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder={COMMENT_SEEDS[Math.floor(Math.random() * COMMENT_SEEDS.length)]}
          style={{
            width: "100%", boxSizing: "border-box", border: "1px solid var(--paper-shade)",
            borderRadius: "var(--r-md)", padding: 10, fontFamily: "var(--font-body)", fontSize: 14,
            background: "var(--paper)", color: "var(--ink)", resize: "vertical",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>
            Anonymous — your handle is not attached.
          </span>
          <button
            className="btn-primary"
            disabled={!draft.trim()}
            onClick={() => {
              dispatch({ type: "TEMP_COMMENT", id: proposal.id, text: draft.trim(), sentiment: chosen || "s3" });
              setDraft("");
            }}
          >
            Post comment
          </button>
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        {(proposal.comments || []).map((c) => (
          <div key={c.id} className={`comment ${c.sentiment}`}>
            <div className="meta">{new Date(c.at).toLocaleString("tr-TR")} · anonymous</div>
            <div>{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
