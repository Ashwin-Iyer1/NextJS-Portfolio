import React from "react";
import { ResilienceChart } from "newportfolio";

// Both series live under `contributors` and are scored 0-100.
const WEEK = [
  { day: "2026-07-16", contributors: { sleep_recovery: 68, stress: 44 } },
  { day: "2026-07-17", contributors: { sleep_recovery: 75, stress: 38 } },
  { day: "2026-07-18", contributors: { sleep_recovery: 61, stress: 52 } },
  { day: "2026-07-19", contributors: { sleep_recovery: 82, stress: 31 } },
  { day: "2026-07-20", contributors: { sleep_recovery: 79, stress: 35 } },
];

export const Default = () => (
  <div style={{ height: 280 }}>
    <ResilienceChart data={WEEK} />
  </div>
);

export const InAGlassCard = () => (
  <div className="glass-card" style={{ height: 280 }}>
    <ResilienceChart data={WEEK} />
  </div>
);

export const EmptyState = () => (
  <div style={{ height: 280 }}>
    <ResilienceChart data={[]} />
  </div>
);
