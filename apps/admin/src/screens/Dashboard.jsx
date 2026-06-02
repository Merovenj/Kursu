import React from "react";
import { ORG, EPOCH, fmt } from "../data.js";
import TokenBadge from "../components/TokenBadge.jsx";

function fmtRemaining(ms) {
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${d}d ${h.toString().padStart(2, "0")}h ${m.toString().padStart(2, "0")}m ${ss.toString().padStart(2, "0")}s`;
}

export default function Dashboard({ state, setScreen, epochRemaining }) {
  const { tokens, proposals } = state;
  const active = proposals.filter((p) => p.stage !== "decided");
  return (
    <div>
      <div className="kicker">Maintainer Council · Hoş geldiniz</div>
      <h1>Şu an oluşmakta olan bir konsensüse bakıyorsunuz.</h1>
      <p style={{ maxWidth: 640, color: "var(--ink-soft)" }}>
        Bu panel, KÜRSÜ’nün öneri yaşam döngüsünü bir bütün hâlinde gösterir:
        destek toplama, sıcaklık ölçümü, biçimsel oylama, ve sayım. Hiçbir
        ekranda kim ne dedi yazmaz — yalnızca tabanın sesi yazılır.
      </p>

      <div className="row" style={{ marginTop: 20 }}>
        <div className="card">
          <div className="kicker">Bu epoch için tokenleriniz</div>
          <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
            <TokenBadge kind="faucet" n={tokens.faucet} max={ORG.faucetPerEpoch} label="faucet" />
            <TokenBadge kind="voting" n={tokens.voting} max={ORG.votingPerEpoch} label="voting" />
          </div>
          <div className="privacy-note" style={{ marginTop: 14 }}>
            Faucet ve voting tokenleri devredilemez (soulbound). Para değildir,
            bir tanıma işaretidir. Epoch bitince yenilenir.
          </div>
        </div>

        <div className="card">
          <div className="kicker">Epoch {EPOCH.id} sona ermesine</div>
          <div className="epoch-clock" style={{ marginTop: 8 }}>
            {fmtRemaining(epochRemaining)}
          </div>
          <div className="epoch-clock mute" style={{ fontSize: 12, marginTop: 4 }}>
            Bitiş: {new Date(EPOCH.endsAt).toLocaleString("tr-TR")}
          </div>
        </div>

        <div className="card">
          <div className="kicker">Üye sayısı (kayıtlı)</div>
          <div className="big-number" style={{ marginTop: 6 }}>{fmt(ORG.members)}</div>
          <div className="epoch-clock mute" style={{ fontSize: 12, marginTop: 4 }}>
            Eşik: {fmt(ORG.threshold)} destek ({((ORG.threshold / ORG.members) * 100).toFixed(2)}%)
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <div className="kicker">Şu an etkin {active.length} öneri</div>
        <ul className="list-clean" style={{ marginTop: 6 }}>
          {active.slice(0, 5).map((p) => (
            <li key={p.id} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
              <span><span className="mono" style={{ color: "var(--ink-mute)", marginRight: 8 }}>{p.id}</span>{p.title}</span>
              <span className="mono" style={{ color: "var(--ink-mute)" }}>{p.stage}</span>
            </li>
          ))}
        </ul>
        <button className="btn-primary" style={{ marginTop: 14 }} onClick={() => setScreen("proposals")}>
          Önerilerin tamamını gör →
        </button>
      </div>

      <div className="privacy-note oxblood">
        <strong>DEMO uyarısı.</strong> Bu panel bir sunum prototipidir.
        Veriler bellekte tutulur, gerçek bir defter veya kriptografi yoktur.
        Tasarım, KÜRSÜ’nün üç ayırt edici özelliğini göstermeyi amaçlar:
        (1) biçimsel oylama gizlidir, makbuz üretilmez,
        (2) anonimlik yapısaldır — kullanıcı kimliği hiçbir yerde saklanmaz,
        (3) 20.000 eşik tokeni satılabilir bir varlık değil, bir tanıma işaretidir.
      </div>
    </div>
  );
}
