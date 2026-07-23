---
category: Metrics
keywords: [oura, spo2, blood oxygen, chart, visx]
---

Nightly average blood-oxygen percentage.

```jsx
<div style={{ height: 280 }}>
  <SpO2Chart
    data={[
      { day: "2026-07-20", spo2_percentage: { average: 96.4 } },
      { day: "2026-07-21", spo2_percentage: { average: 97.1 } },
    ]}
  />
</div>
```

Note the nesting: the value lives at `spo2_percentage.average`, not on the entry itself. A flat `spo2_percentage: 96` reads as `0` and flattens the chart.

Fills its parent through `ParentSize`, so the parent needs a real height.
