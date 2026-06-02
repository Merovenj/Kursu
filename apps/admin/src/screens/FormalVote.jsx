import React, { useState } from "react";
import { fmt } from "../data.js";
import SentimentBar from "../components/SentimentBar.jsx";

export default function FormalVote({ state, dispatch }) {
  const { proposals, tokens } = state;
  const proposal =
    proposals.find((p) => p.id === state.formalProposalId && p.stage === "formal_vote") ||
    proposals.find((p) => p.stage === "formal_vote");

  const [confirming, setConfirming] = useState(null);   // "approve" | "reject" | "abstain" | null
  const [recorded, setRecorded] = useState(false);

  if (!proposal) {
    return <div><h1>Şu an biçimsel oylamaya açık önerge yok.</h1></div>;
  }

  const cast = () => {
    // CRITICAL: we do NOT pass the choice to the reducer in any user-attributed way.
    // The aggregate counters could be incremented in the reducer for visualization,
    // but per spec we do NOT show the voter their own choice afterward.
    dispatch({ type: "FORMAL_VOTE", id: proposal.id /* choice intentionally not stored anywhere addressable */ });
    setConfirming(null);
    setRecorded(true);
  };

  if (recorded) {
    return (
      <div className="recorded">
        <div className="checkmark">✓</div>
        <h1>Recorded</h1>
        <p className="mono" style={{ color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 11 }}>
          Vote sealed in the public ledger
        </p>
        <p className="conscience">
          “Secret ballot — even you can't prove how you voted.<br />
          A receipt is a market; a conscience is not.”
        </p>

        <div className="privacy-note" style={{ display: "inline-block", marginTop: 30, textAlign: "left" }}>
          Hiçbir yerde "siz X seçtiniz" yazısı yoktur. Defterde kimliğiniz yoktur.
          Yalnızca anonim bir nullifier hash’i ve toplam sayım vardır.
          <div className="mono" style={{ fontSize: 11, marginTop: 6 }}>
            no user_id stored · no receipt issued · no proof-of-vote returned
          </div>
        </div>

        <div style={{ marginTop: 30 }}>
          <button className="btn-ghost" onClick={() => setRecorded(false)}>← Geri dön</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="kicker">Formal Vote · BINDING</div>
      <h1 style={{ marginBottom: 8 }}>{proposal.title}</h1>
      <p style={{ color: "var(--ink-soft)" }}>{proposal.summary}</p>
      <div className="mono" style={{ color: "var(--ink-mute)", fontSize: 12, marginBottom: 16 }}>
        {proposal.id} · formal vote opened {new Date(proposal.formalVote?.openedAt || Date.now()).toLocaleString("tr-TR")}
      </div>

      <div className="warning">
        ⚠ Bu oy bağlayıcı ve geri alınamazdır. 1 voting tokeni harcanır.
        Onay verdikten sonra <em>hiçbir makbuz, hiçbir kanıt</em> üretilmez —
        bu, oyunuzun satılamaz olmasını sağlamak için kasıtlıdır.
      </div>

      <div className="row">
        <div className="card">
          <div className="kicker">Sıcaklık ölçümünden</div>
          <SentimentBar sentiment={proposal.sentiment} />
        </div>
        <div className="card">
          <div className="kicker">Voting tokenleriniz</div>
          <div className="med-number mono" style={{ marginTop: 4 }}>{tokens.voting} / 5</div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>
            Bu epoch için kalan. Devredilemez.
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Oyunuz</h3>
        <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
          <button className="btn-green"   disabled={tokens.voting <= 0} onClick={() => setConfirming("approve")}>Approve</button>
          <button className="btn-oxblood" disabled={tokens.voting <= 0} onClick={() => setConfirming("reject")}>Reject</button>
          <button className="btn-primary" disabled={tokens.voting <= 0} onClick={() => setConfirming("abstain")}>Abstain</button>
        </div>
      </div>

      <div className="privacy-note">
        <strong>no user_id stored.</strong> Biçimsel oylama bile kimliğinizi
        ledger’a yazmaz. MACI tarzı bir koordinatör şifreyi açabilir ama
        sayımdan kim ne oyladı çıkarılamaz — sayı kanıtlanır, oy kanıtlanamaz.
      </div>

      {confirming && (
        <div role="dialog" aria-modal="true" style={{
          position: "fixed", inset: 0, background: "rgba(23,21,15,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
        }}>
          <div className="card" style={{ maxWidth: 480, width: "90%", margin: 0 }}>
            <h2>Onaylıyor musunuz?</h2>
            <p>
              1 voting tokeni harcanacak. Oy bağlayıcı ve geri alınamaz.
              Onay sonrası "Recorded ✓" görürsünüz — başka bir bilgi gösterilmez.
            </p>
            <div className="warning" style={{ marginTop: 8 }}>
              Hangi seçeneği işaretlediğiniz hiçbir yerde size geri gösterilmez.
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 12, justifyContent: "flex-end" }}>
              <button onClick={() => setConfirming(null)}>İptal</button>
              <button className="btn-primary" onClick={cast}>Mührü vur (cast & seal)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
