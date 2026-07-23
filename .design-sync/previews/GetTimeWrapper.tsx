import React from "react";
import { GetTimeWrapper } from "newportfolio";
import { withFixtures } from "../preview-lib/fixtures";

// app/page.js puts this in the aside beside WorkExperience — a stat tile in a
// column. /api/wakatime returns an array whose first entry carries the totals.

const WAKATIME = [{ total_seconds: 1_284_600, daily_average: 12_400 }];

export const Default = withFixtures({ "/api/wakatime": WAKATIME }, () => (
  <GetTimeWrapper />
));

export const InAStatColumn = withFixtures({ "/api/wakatime": WAKATIME }, () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-md)",
      maxWidth: 320,
    }}
  >
    <GetTimeWrapper />
  </div>
));

// No API behind it: the figures fall back to N/A while the card, its rule and
// its Wakatime attribution still render.
export const WithoutData = () => <GetTimeWrapper />;
