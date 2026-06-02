import React from "react";

const TYPE_TO_CLS = {
  "vote-cast":       "type-vote",
  "formal-open":     "type-vote",
  "l2-distribution": "type-l2",
  "tally":           "type-tally",
  "temp-open":       "type-temp",
  "threshold":       "type-thresh",
};

export default function Ledger({ state }) {
  const { ledger } = state;
  return (
    <div>
      <div className="kicker">Public Ledger · append-only · hash-chained</div>
      <h1>Kamuya açık defter</h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: 640 }}>
        Hiçbir kimliğin yazılmadığı, sadece nullifier hash’leri ve toplam sayıların
        yazıldığı bir günlük. Herkes kendi doğrulayıcı düğümünü çalıştırabilir.
      </p>

      <div className="privacy-note" style={{ marginBottom: 16 }}>
        <strong>no user_id stored.</strong> Bu defterde tek bir üyenin bile kim
        olduğu, ne oyladığı yazmaz — yalnızca anonim hash ve toplam.
      </div>

      <div className="ledger">
        <div className="row-l head">
          <span>Block</span>
          <span>Type</span>
          <span>Proposal</span>
          <span>Nullifier / aggregate</span>
          <span>Time</span>
        </div>
        {ledger.map((r) => (
          <div className="row-l" key={r.block}>
            <span className="mono">#{r.block}</span>
            <span className={`mono ${TYPE_TO_CLS[r.type] || ""}`}>{r.type}</span>
            <span className="mono">{r.proposal || "—"}</span>
            <span className="mono hash" title={r.note}>
              {r.nullifier}{r.note ? <span style={{ color: "var(--ink-mute)" }}> · {r.note}</span> : null}
            </span>
            <span className="mono hash">{new Date(r.at).toLocaleString("tr-TR")}</span>
          </div>
        ))}
      </div>

      <div className="privacy-note">
        Bu defterin bütünlüğü hash zinciri ile korunur. Herhangi bir blokta
        oynama, bir sonraki blokun hash’ini bozar; herkesin doğrulayıcısı bunu
        anında fark eder.
      </div>
    </div>
  );
}
