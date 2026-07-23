---
category: Metrics
keywords: [oura, sleep, contributors, grouped bar chart, visx]
---

Sleep contributors as a grouped bar chart — seven scores per day (deep, REM, efficiency, latency, restfulness, timing, total), each 1–100, with a legend above the plot.

```jsx
<div style={{ height: 320 }}>
  <SleepChart
    data={[
      {
        day: "2026-07-18",
        contributors: {
          deep_sleep: 82, rem_sleep: 74, efficiency: 91, latency: 66,
          restfulness: 58, timing: 88, total_sleep: 79,
        },
      },
    ]}
  />
</div>
```

Series are distinguished by a fixed seven-step categorical palette, `.oura-seq-1` … `.oura-seq-7`, defined in `OuraCharts.css` with a separate set of values under `[data-theme="light"]`. Reuse those class names for any chart legend or swatch you add, rather than inventing colors — they are the system's only categorical scale.

(A source comment in `OuraCharts.js` describes this as a monochrome lightness ramp. That comment is stale: the palette is multi-hue, and `.oura-seq-2` and `.oura-seq-4` are both greens, so position within the group — not color alone — is what separates those two series.)

Seven bars per day gets dense fast: keep it to about a week of days, and give it more height than the other two charts (the legend takes a row). With no `data` it renders a labelled empty state.
