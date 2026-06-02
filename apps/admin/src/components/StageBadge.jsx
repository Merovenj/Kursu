import React from "react";
import { STAGE_META } from "../data.js";

export default function StageBadge({ stage }) {
  const m = STAGE_META[stage] || { label: stage, cls: "decided" };
  return <span className={`badge ${m.cls}`}>{m.label}</span>;
}
