import React from "react";
import { CardioAgeChart } from "newportfolio";

const WEEKS = [
  { day: "2026-06-24", vascular_age: 26 },
  { day: "2026-07-01", vascular_age: 25 },
  { day: "2026-07-08", vascular_age: 25 },
  { day: "2026-07-15", vascular_age: 24 },
  { day: "2026-07-22", vascular_age: 23 },
];

export const Default = () => (
  <div style={{ height: 280 }}>
    <CardioAgeChart data={WEEKS} />
  </div>
);

export const InAGlassCard = () => (
  <div className="glass-card" style={{ height: 280 }}>
    <CardioAgeChart data={WEEKS} />
  </div>
);

export const EmptyState = () => (
  <div style={{ height: 280 }}>
    <CardioAgeChart data={[]} />
  </div>
);
