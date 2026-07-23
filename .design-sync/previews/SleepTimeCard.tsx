import React from "react";
import { SleepTimeCard } from "newportfolio";

// Offsets are seconds, rendered as whole hours. `data` is required — the
// component maps over it with no guard.

export const Default = () => (
  <div style={{ maxWidth: 380 }}>
    <SleepTimeCard
      data={[
        {
          day: "2026-07-21",
          status: "optimal",
          optimal_bedtime: { start_offset: -3600, end_offset: 3600 },
          recommendation: "Aim for a bedtime within an hour either side of your usual.",
        },
        {
          day: "2026-07-20",
          status: "late",
          optimal_bedtime: { start_offset: -7200, end_offset: 0 },
          recommendation: "Try to turn in earlier tonight to recover the deficit.",
        },
      ]}
    />
  </div>
);

export const EmptyState = () => (
  <div style={{ maxWidth: 380 }}>
    <SleepTimeCard data={[]} />
  </div>
);
