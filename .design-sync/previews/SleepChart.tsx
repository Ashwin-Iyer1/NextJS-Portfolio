import React from "react";
import { SleepChart } from "newportfolio";

// Seven contributor bars per day, so a week is about the practical limit before
// the groups get too dense to read.
const day = (d: string, v: number[]) => ({
  day: d,
  contributors: {
    deep_sleep: v[0], rem_sleep: v[1], efficiency: v[2], latency: v[3],
    restfulness: v[4], timing: v[5], total_sleep: v[6],
  },
});

const WEEK = [
  day("2026-07-16", [72, 68, 90, 61, 55, 84, 76]),
  day("2026-07-17", [81, 74, 93, 70, 62, 88, 82]),
  day("2026-07-18", [64, 59, 86, 48, 51, 79, 67]),
  day("2026-07-19", [88, 80, 95, 77, 71, 91, 87]),
  day("2026-07-20", [70, 66, 89, 58, 60, 82, 74]),
];

export const Default = () => (
  <div style={{ height: 320 }}>
    <SleepChart data={WEEK} />
  </div>
);

export const InAGlassCard = () => (
  <div className="glass-card" style={{ height: 320 }}>
    <SleepChart data={WEEK} />
  </div>
);

export const SingleNight = () => (
  <div style={{ height: 300 }}>
    <SleepChart data={WEEK.slice(-1)} />
  </div>
);

export const EmptyState = () => (
  <div style={{ height: 300 }}>
    <SleepChart data={[]} />
  </div>
);
