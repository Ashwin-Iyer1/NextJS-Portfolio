import React from "react";
import { ActivityChart } from "newportfolio";

// ParentSize means the chart is exactly as tall as whatever wraps it — every
// cell here supplies a real height, which is also the mistake worth showing
// callers how to avoid.
const TEN_DAYS = [
  { day: "2026-07-13", steps: 7418 },
  { day: "2026-07-14", steps: 11204 },
  { day: "2026-07-15", steps: 6033 },
  { day: "2026-07-16", steps: 14872 },
  { day: "2026-07-17", steps: 9260 },
  { day: "2026-07-18", steps: 3915 },
  { day: "2026-07-19", steps: 12640 },
  { day: "2026-07-20", steps: 8421 },
  { day: "2026-07-21", steps: 10087 },
  { day: "2026-07-22", steps: 5744 },
];

export const Default = () => (
  <div style={{ height: 280 }}>
    <ActivityChart data={TEN_DAYS} />
  </div>
);

export const InAGlassCard = () => (
  <div className="glass-card" style={{ height: 280 }}>
    <ActivityChart data={TEN_DAYS} />
  </div>
);

export const Compact = () => (
  <div style={{ height: 180 }}>
    <ActivityChart data={TEN_DAYS.slice(-5)} />
  </div>
);

export const EmptyState = () => (
  <div style={{ height: 280 }}>
    <ActivityChart data={[]} />
  </div>
);
