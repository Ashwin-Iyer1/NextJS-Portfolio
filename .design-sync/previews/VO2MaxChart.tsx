import React from "react";
import { VO2MaxChart } from "newportfolio";

// VO2 max is measured infrequently, so entries are weeks apart by nature.
const READINGS = [
  { day: "2026-05-20", vo2_max: 45.6 },
  { day: "2026-06-10", vo2_max: 46.4 },
  { day: "2026-06-30", vo2_max: 47.2 },
  { day: "2026-07-21", vo2_max: 48.1 },
];

export const Default = () => (
  <div style={{ height: 280 }}>
    <VO2MaxChart data={READINGS} />
  </div>
);

export const InAGlassCard = () => (
  <div className="glass-card" style={{ height: 280 }}>
    <VO2MaxChart data={READINGS} />
  </div>
);

export const EmptyState = () => (
  <div style={{ height: 280 }}>
    <VO2MaxChart data={[]} />
  </div>
);
