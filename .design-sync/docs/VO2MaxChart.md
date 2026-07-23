---
category: Metrics
keywords: [oura, vo2 max, fitness, chart, visx]
---

Estimated VO2 max over time, in ml/kg/min.

```jsx
<div style={{ height: 280 }}>
  <VO2MaxChart
    data={[
      { day: "2026-07-14", vo2_max: 47.2 },
      { day: "2026-07-21", vo2_max: 48.1 },
    ]}
  />
</div>
```

VO2 max is measured infrequently, so entries are typically weeks apart rather than daily — that is expected, not missing data.

`OuraDashboard` does not currently render this chart (its tile is commented out in the source), but the component is fully usable on its own.
