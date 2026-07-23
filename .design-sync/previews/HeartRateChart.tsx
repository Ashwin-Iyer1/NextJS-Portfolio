import React from "react";
import { HeartRateChart } from "newportfolio";

// Individual readings rather than daily aggregates: a realistic window is a few
// hours at a five-minute cadence, which is what OuraDashboard passes in.
const START = Date.UTC(2026, 6, 22, 6, 0, 0);
const CURVE = [58, 57, 61, 66, 74, 88, 96, 91, 79, 70, 65, 62, 60, 63, 71, 82,
  90, 84, 73, 66, 61, 59, 58, 60];

const READINGS = CURVE.map((bpm, i) => ({
  timestamp: new Date(START + i * 5 * 60 * 1000).toISOString(),
  bpm,
}));

export const Default = () => (
  <div style={{ height: 280 }}>
    <HeartRateChart data={READINGS} />
  </div>
);

export const InAGlassCard = () => (
  <div className="glass-card" style={{ height: 280 }}>
    <HeartRateChart data={READINGS} />
  </div>
);

// A pinned window keeps the axis steady even when the readings do not span it.
export const WithExplicitDomain = () => (
  <div style={{ height: 280 }}>
    <HeartRateChart
      data={READINGS.slice(0, 8)}
      xDomain={[new Date(START), new Date(START + 2 * 60 * 60 * 1000)]}
    />
  </div>
);

export const EmptyState = () => (
  <div style={{ height: 280 }}>
    <HeartRateChart data={[]} />
  </div>
);
