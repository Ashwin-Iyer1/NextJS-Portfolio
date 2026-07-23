import React from "react";
import { ReadinessChart } from "newportfolio";

// The y-axis is pinned to 40–100 regardless of the data, so these scores stay
// inside that band — values outside it clip rather than rescale the chart.
const TEN_DAYS = [
  { day: "2026-07-13", score: 71 },
  { day: "2026-07-14", score: 78 },
  { day: "2026-07-15", score: 64 },
  { day: "2026-07-16", score: 83 },
  { day: "2026-07-17", score: 88 },
  { day: "2026-07-18", score: 59 },
  { day: "2026-07-19", score: 74 },
  { day: "2026-07-20", score: 81 },
  { day: "2026-07-21", score: 92 },
  { day: "2026-07-22", score: 77 },
];

export const Default = () => (
  <div style={{ height: 280 }}>
    <ReadinessChart data={TEN_DAYS} />
  </div>
);

export const InAGlassCard = () => (
  <div className="glass-card" style={{ height: 280 }}>
    <ReadinessChart data={TEN_DAYS} />
  </div>
);

export const Compact = () => (
  <div style={{ height: 180 }}>
    <ReadinessChart data={TEN_DAYS.slice(-5)} />
  </div>
);

export const EmptyState = () => (
  <div style={{ height: 280 }}>
    <ReadinessChart data={[]} />
  </div>
);
