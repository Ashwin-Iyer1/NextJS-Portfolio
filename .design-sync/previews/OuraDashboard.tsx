import React from "react";
import { OuraDashboard } from "newportfolio";
import { withFixtures } from "../preview-lib/fixtures";

// Exactly the call app/page.js makes in its "Now" section — note `subset` is an
// ARRAY (a bare string is silently ignored and every family is fetched) and
// `columns` is a plain number.
//
// The dashboard fetches every family from /api/oura?type=<type>&… on mount, so
// without fixtures it never leaves its error branch. Each subset key maps to an
// endpoint type: sleep -> sleep_daily, stress -> daily_stress.

const iso = (d: Date) => d.toISOString().slice(0, 10);
const daysAgo = (n: number) => iso(new Date(Date.now() - n * 86_400_000));

const ACTIVITY = Array.from({ length: 7 }, (_, i) => ({
  day: daysAgo(6 - i),
  steps: [7418, 11204, 6033, 14872, 9260, 3915, 12640][i],
}));

const SLEEP = Array.from({ length: 7 }, (_, i) => ({
  day: daysAgo(6 - i),
  contributors: {
    deep_sleep: 64 + i * 3, rem_sleep: 59 + i * 3, efficiency: 86 + (i % 4),
    latency: 48 + i * 4, restfulness: 51 + i * 3, timing: 79 + (i % 5),
    total_sleep: 67 + i * 3,
  },
}));

const STRESS = Array.from({ length: 7 }, (_, i) => ({
  day: daysAgo(6 - i),
  stress_high: [9000, 12600, 5400, 14400, 7200, 10800, 8100][i],
  recovery_high: [16200, 9000, 21600, 7200, 18000, 12600, 15300][i],
}));

// The dashboard keeps only the last 24h of heart rate, so these must be anchored
// to "now" rather than to a fixed date.
const HEART_RATE = Array.from({ length: 48 }, (_, i) => ({
  timestamp: new Date(Date.now() - (47 - i) * 30 * 60 * 1000).toISOString(),
  bpm: Math.round(64 + 18 * Math.sin(i / 4) + (i % 3)),
}));

const ROUTES = {
  "type=activity": { data: ACTIVITY },
  "type=sleep_daily": { data: SLEEP },
  "type=daily_stress": { data: STRESS },
  "type=heart_rate": { data: HEART_RATE },
};

export const AsUsedOnTheSite = withFixtures(ROUTES, () => (
  <div className="glass-card">
    <OuraDashboard
      subset={["activity", "heart_rate", "sleep", "stress"]}
      columns={1}
      chartHeight="180px"
      chartWidth="100%"
      showHeader
      compact
    />
  </div>
));

export const TwoColumns = withFixtures(ROUTES, () => (
  <OuraDashboard
    subset={["activity", "sleep"]}
    columns={{ xs: 1, sm: 2 }}
    chartHeight="220px"
  />
));

// What it genuinely does with no Oura API behind it.
export const ErrorState = () => (
  <OuraDashboard subset={["activity"]} columns={1} chartHeight="180px" />
);
