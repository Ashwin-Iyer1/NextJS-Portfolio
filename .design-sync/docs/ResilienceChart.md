---
category: Metrics
keywords: [oura, resilience, recovery, line chart, visx]
---

Two lines over time — sleep recovery and stress — with a legend above the plot.

```jsx
<div style={{ height: 280 }}>
  <ResilienceChart
    data={[
      { day: "2026-07-20", contributors: { sleep_recovery: 72, stress: 41 } },
      { day: "2026-07-21", contributors: { sleep_recovery: 80, stress: 35 } },
    ]}
  />
</div>
```

Both values are nested under `contributors`, and both are 0–100. The series are separated by `.oura-swatch-ink` and `.oura-swatch-danger` rather than by the categorical `.oura-seq-*` scale.

Fills its parent through `ParentSize`, so the parent needs a real height.
