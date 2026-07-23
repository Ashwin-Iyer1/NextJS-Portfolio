---
category: Metrics
keywords: [oura, heart rate, bpm, time series, visx]
---

Heart rate over time — the one chart in the set plotted on individual readings rather than daily aggregates.

```jsx
<div style={{ height: 280 }}>
  <HeartRateChart
    data={[
      { timestamp: "2026-07-22T08:00:00Z", bpm: 62 },
      { timestamp: "2026-07-22T08:05:00Z", bpm: 74 },
    ]}
  />
</div>
```

Each entry is `{ timestamp, bpm }`, so a day of readings is hundreds of points. `OuraDashboard` filters to the last 24 hours before passing them in; do the same rather than handing it a month.

`xDomain` pins the time axis to an explicit `[start, end]` — useful for holding the axis steady across a live-updating window. Omit it and the domain follows the data.
