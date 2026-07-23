---
category: Metrics
keywords: [oura, readiness, score, chart, line chart, visx]
---

Daily readiness score as a gradient area with a line on top.

```jsx
<div style={{ height: 280 }}>
  <ReadinessChart
    data={[
      { day: "2026-07-17", score: 78 },
      { day: "2026-07-18", score: 84 },
      { day: "2026-07-19", score: 71 },
    ]}
  />
</div>
```

The y-axis is **fixed to 40–100**, not fitted to the data — scores outside that band clip. That is deliberate: it keeps day-to-day comparisons honest.

Like the other Oura charts it fills its parent through `ParentSize`, so the parent needs a real height. With no `data` it renders a labelled empty state.
