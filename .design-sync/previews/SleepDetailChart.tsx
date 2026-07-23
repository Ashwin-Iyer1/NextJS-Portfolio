import React from "react";
import { SleepDetailChart } from "newportfolio";

// Every duration is SECONDS. 27000 = 7h30m.
const h = (hours: number) => Math.round(hours * 3600);

const WEEK = [
  { day: "2026-07-17", total_sleep_duration: h(7.5), deep_sleep_duration: h(1.5), light_sleep_duration: h(4.0), rem_sleep_duration: h(2.0), awake_time: h(0.5) },
  { day: "2026-07-18", total_sleep_duration: h(6.2), deep_sleep_duration: h(1.1), light_sleep_duration: h(3.5), rem_sleep_duration: h(1.6), awake_time: h(0.8) },
  { day: "2026-07-19", total_sleep_duration: h(8.1), deep_sleep_duration: h(1.9), light_sleep_duration: h(4.3), rem_sleep_duration: h(1.9), awake_time: h(0.4) },
  { day: "2026-07-20", total_sleep_duration: h(7.0), deep_sleep_duration: h(1.4), light_sleep_duration: h(3.8), rem_sleep_duration: h(1.8), awake_time: h(0.6) },
];

export const Default = () => (
  <div style={{ height: 320 }}>
    <SleepDetailChart data={WEEK} />
  </div>
);

export const InAGlassCard = () => (
  <div className="glass-card" style={{ height: 320 }}>
    <SleepDetailChart data={WEEK} />
  </div>
);

export const EmptyState = () => (
  <div style={{ height: 320 }}>
    <SleepDetailChart data={[]} />
  </div>
);
