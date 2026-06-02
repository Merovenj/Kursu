import React from "react";

export default function TokenBadge({ kind, n, max, label }) {
  const cls = kind === "voting" ? "voting" : "faucet";
  return (
    <span className={`token-badge ${cls}`}>
      <span className="n">{n}</span>
      {max !== undefined && <span>/ {max}</span>}
      <span style={{ color: "var(--ink-mute)", marginLeft: 4 }}>{label}</span>
    </span>
  );
}
