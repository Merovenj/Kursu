import React, { useEffect, useMemo, useReducer, useState } from "react";
import Banner from "./components/Banner.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import Proposals from "./screens/Proposals.jsx";
import Endorsement from "./screens/Endorsement.jsx";
import TempCheck from "./screens/TempCheck.jsx";
import FormalVote from "./screens/FormalVote.jsx";
import Ledger from "./screens/Ledger.jsx";
import { EPOCH, ORG, SEED_LEDGER, SEED_PROPOSALS, fakeNullifier } from "./data.js";

const initialState = {
  proposals: SEED_PROPOSALS,
  ledger:    SEED_LEDGER,
  tokens:    { faucet: ORG.faucetPerEpoch, voting: ORG.votingPerEpoch },
  selectedProposalId: "P-018",   // the threshold-edge one for endorsement screen
  formalProposalId:   "P-014",   // the open formal vote
  tempProposalId:     "P-015",   // the open temp check
};

function reducer(state, action) {
  switch (action.type) {
    case "ENDORSE": {
      // +1 support; if a sentiment was clicked, also distribute into bucket
      const { id, sentiment } = action;
      const proposals = state.proposals.map((p) => {
        if (p.id !== id) return p;
        const next = { ...p, support: p.support + 1, sentiment: { ...p.sentiment } };
        if (sentiment) next.sentiment[sentiment] = (next.sentiment[sentiment] || 0) + 1;
        return next;
      });
      return { ...state, proposals, tokens: { ...state.tokens, faucet: Math.max(0, state.tokens.faucet - 1) } };
    }
    case "ENDORSE_BATCH": {
      // demo-only: simulate ~60 endorsements at once to cross threshold
      const { id, amount = 62 } = action;
      const proposals = state.proposals.map((p) =>
        p.id === id ? { ...p, support: p.support + amount } : p
      );
      return { ...state, proposals };
    }
    case "PROMOTE_TO_TEMP": {
      const { id } = action;
      const now = new Date().toISOString();
      const closesAt = new Date(Date.now() + 72 * 3600 * 1000).toISOString();
      const proposals = state.proposals.map((p) =>
        p.id === id
          ? { ...p, stage: "temp_check",
              tempCheck: { openedAt: now, closesAt, totalVotes: 0 },
              comments: [] }
          : p
      );
      const ledger = [
        { block: state.ledger[0].block + 1, at: now, type: "l2-distribution",
          proposal: id, nullifier: ORG.members.toLocaleString("en-US"),
          note: "Recognition token minted to all enrolled" },
        { block: state.ledger[0].block + 2, at: now, type: "threshold",
          proposal: id, nullifier: "—", note: "Threshold reached (20,000+)" },
        { block: state.ledger[0].block + 3, at: now, type: "temp-open",
          proposal: id, nullifier: "—", note: "Temperature check opened (72h)" },
        ...state.ledger,
      ];
      return { ...state, proposals, ledger };
    }
    case "TEMP_VOTE": {
      const { id, sentiment } = action;
      const proposals = state.proposals.map((p) => {
        if (p.id !== id) return p;
        const sent = { ...p.sentiment };
        sent[sentiment] = (sent[sentiment] || 0) + 1;
        const tc = p.tempCheck ? { ...p.tempCheck, totalVotes: (p.tempCheck.totalVotes || 0) + 1 } : p.tempCheck;
        return { ...p, sentiment: sent, tempCheck: tc };
      });
      return { ...state, proposals, tokens: { ...state.tokens, faucet: Math.max(0, state.tokens.faucet - 1) } };
    }
    case "TEMP_COMMENT": {
      const { id, text, sentiment } = action;
      const proposals = state.proposals.map((p) => {
        if (p.id !== id) return p;
        const comments = [
          { id: `c-${Date.now()}`, sentiment, at: new Date().toISOString(), text },
          ...(p.comments || []),
        ];
        return { ...p, comments };
      });
      return { ...state, proposals };
    }
    case "FORMAL_VOTE": {
      // The receipt-free moment: we DO NOT store the choice anywhere user-attributed.
      // We update aggregate counts and append a nullifier-only ledger entry.
      const { id /* , choice */ } = action;
      const proposals = state.proposals.map((p) => p);   // no per-user-vote attribution stored
      const ledger = [
        { block: state.ledger[0].block + 1, at: new Date().toISOString(),
          type: "vote-cast", proposal: id, nullifier: fakeNullifier(),
          note: "Approve / Reject / Abstain — vote sealed" },
        ...state.ledger,
      ];
      return {
        ...state, proposals, ledger,
        tokens: { ...state.tokens, voting: Math.max(0, state.tokens.voting - 1) },
      };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function App() {
  const [screen, setScreen] = useState("dashboard");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [bystander, setBystander] = useState(false);

  // Epoch countdown
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const epochRemaining = useMemo(() => {
    const ms = new Date(EPOCH.endsAt).getTime() - now.getTime();
    return Math.max(0, ms);
  }, [now]);

  const props = {
    state, dispatch, screen, setScreen,
    bystander, setBystander,
    epochRemaining, now,
  };

  return (
    <div className="app">
      <Banner />
      <Sidebar screen={screen} onNav={setScreen} members={ORG.members} />
      <main className="main">
        <div className="wrap">
          {screen === "dashboard"   && <Dashboard {...props} />}
          {screen === "proposals"   && <Proposals {...props} />}
          {screen === "endorsement" && <Endorsement {...props} />}
          {screen === "temp"        && <TempCheck {...props} />}
          {screen === "vote"        && <FormalVote {...props} />}
          {screen === "ledger"      && <Ledger {...props} />}
          <div style={{ marginTop: 60, textAlign: "right" }}>
            <button className="btn-ghost" onClick={() => dispatch({ type: "RESET" })}>
              ↻ Reset demo state
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
