import React from "react";
import { GetTime } from "newportfolio";
import { withFixtures } from "../preview-lib/fixtures";

// The raw readout, without GetTimeWrapper's card. Prefer GetTimeWrapper unless
// you are supplying your own container — these cells show what the bare
// component contributes.

const WAKATIME = [{ total_seconds: 1_284_600, daily_average: 12_400 }];

export const Default = withFixtures({ "/api/wakatime": WAKATIME }, () => (
  <GetTime />
));

export const InAGlassCard = withFixtures({ "/api/wakatime": WAKATIME }, () => (
  <div className="glass-card" style={{ maxWidth: 320 }}>
    <GetTime />
  </div>
));
