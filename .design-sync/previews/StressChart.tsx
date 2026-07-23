import React from "react";
import { StressChart } from "newportfolio";

// stress_high / recovery_high are SECONDS spent in each state, not percentages.
const WEEK = [
  { day: "2026-07-16", stress_high: 9000, recovery_high: 16200 },
  { day: "2026-07-17", stress_high: 12600, recovery_high: 9000 },
  { day: "2026-07-18", stress_high: 5400, recovery_high: 21600 },
  { day: "2026-07-19", stress_high: 14400, recovery_high: 7200 },
  { day: "2026-07-20", stress_high: 7200, recovery_high: 18000 },
];

export const Default = () => (
  <div style={{ height: 280 }}>
    <StressChart data={WEEK} />
  </div>
);

export const InAGlassCard = () => (
  <div className="glass-card" style={{ height: 280 }}>
    <StressChart data={WEEK} />
  </div>
);

export const EmptyState = () => (
  <div style={{ height: 280 }}>
    <StressChart data={[]} />
  </div>
);
