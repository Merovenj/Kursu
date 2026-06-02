import React from "react";

const ITEMS = [
  { key: "dashboard",   label: "Dashboard" },
  { key: "proposals",   label: "Proposals" },
  { key: "endorsement", label: "Endorse a Proposal" },
  { key: "temp",        label: "Temperature Check" },
  { key: "vote",        label: "Formal Vote" },
  { key: "ledger",      label: "Public Ledger" },
];

export default function Sidebar({ screen, onNav, members }) {
  return (
    <aside className="side">
      <div className="brand">KÜRSÜ</div>
      <div className="brand-sub">Admin · Maintainer Council</div>
      <nav>
        {ITEMS.map((it) => (
          <button
            key={it.key}
            className={screen === it.key ? "active" : ""}
            onClick={() => onNav(it.key)}
          >
            {it.label}
          </button>
        ))}
      </nav>
      <div className="foot">
        <div>Enrolled: <span className="mono">{members.toLocaleString("en-US")}</span></div>
        <div style={{ marginTop: 4, opacity: 0.7 }}>v0.0.1 · mock</div>
      </div>
    </aside>
  );
}
