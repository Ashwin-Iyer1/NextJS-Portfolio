import React from "react";
import { RestModeCard } from "newportfolio";

// An omitted end_day renders as "Ongoing". Both `data` and each entry's
// `episodes` are required — they are mapped with no guard.

export const Default = () => (
  <div style={{ maxWidth: 380 }}>
    <RestModeCard
      data={[
        { start_day: "2026-07-18", end_day: null, episodes: [{ tags: ["illness"] }] },
        {
          start_day: "2026-06-02",
          end_day: "2026-06-05",
          episodes: [{ tags: ["travel"] }, { tags: ["poor sleep", "stress"] }],
        },
      ]}
    />
  </div>
);

export const EmptyState = () => (
  <div style={{ maxWidth: 380 }}>
    <RestModeCard data={[]} />
  </div>
);
