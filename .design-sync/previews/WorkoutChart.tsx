import React from "react";
import { WorkoutChart } from "newportfolio";

// Rest days are real data — 0 keeps the axis continuous.
const WEEK = [
  { day: "2026-07-16", calories: 420 },
  { day: "2026-07-17", calories: 0 },
  { day: "2026-07-18", calories: 610 },
  { day: "2026-07-19", calories: 285 },
  { day: "2026-07-20", calories: 0 },
  { day: "2026-07-21", calories: 540 },
];

export const Default = () => (
  <div style={{ height: 280 }}>
    <WorkoutChart data={WEEK} />
  </div>
);

export const InAGlassCard = () => (
  <div className="glass-card" style={{ height: 280 }}>
    <WorkoutChart data={WEEK} />
  </div>
);

export const EmptyState = () => (
  <div style={{ height: 280 }}>
    <WorkoutChart data={[]} />
  </div>
);
