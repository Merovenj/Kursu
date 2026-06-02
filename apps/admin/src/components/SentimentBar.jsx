import React from "react";
import { sentimentPcts } from "../data.js";

/** 5-segment horizontal bar */
export default function SentimentBar({ sentiment, showAgree = true }) {
  const p = sentimentPcts(sentiment);
  return (
    <div>
      <div className="sent" aria-label="Sentiment distribution">
        <span className="s1" style={{ width: p.s1 + "%" }} />
        <span className="s2" style={{ width: p.s2 + "%" }} />
        <span className="s3" style={{ width: p.s3 + "%" }} />
        <span className="s4" style={{ width: p.s4 + "%" }} />
        <span className="s5" style={{ width: p.s5 + "%" }} />
      </div>
      {showAgree && (
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 4 }}>
          {p.agreePct.toFixed(1)}% agree · {p.disagreePct.toFixed(1)}% disagree · {p.s3.toFixed(1)}% neutral
        </div>
      )}
    </div>
  );
}
