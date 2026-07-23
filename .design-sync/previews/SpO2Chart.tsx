import React from "react";
import { SpO2Chart } from "newportfolio";

// The plotted value is nested at spo2_percentage.average — a flat number reads
// as 0 and flattens the chart.
const WEEK = [
  { day: "2026-07-16", spo2_percentage: { average: 96.1 } },
  { day: "2026-07-17", spo2_percentage: { average: 97.3 } },
  { day: "2026-07-18", spo2_percentage: { average: 95.4 } },
  { day: "2026-07-19", spo2_percentage: { average: 96.8 } },
  { day: "2026-07-20", spo2_percentage: { average: 97.0 } },
];

export const Default = () => (
  <div style={{ height: 280 }}>
    <SpO2Chart data={WEEK} />
  </div>
);

export const InAGlassCard = () => (
  <div className="glass-card" style={{ height: 280 }}>
    <SpO2Chart data={WEEK} />
  </div>
);

export const EmptyState = () => (
  <div style={{ height: 280 }}>
    <SpO2Chart data={[]} />
  </div>
);
