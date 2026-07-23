---
category: Metrics
keywords: [oura, vascular age, cardio, chart, visx]
---

Estimated vascular age over time, in years.

```jsx
<div style={{ height: 280 }}>
  <CardioAgeChart
    data={[
      { day: "2026-07-20", vascular_age: 24 },
      { day: "2026-07-21", vascular_age: 23 },
    ]}
  />
</div>
```

Values are years, so the y-range is narrow and small changes read as large moves — give it the same height as the other charts rather than squashing it.

Fills its parent through `ParentSize`, so the parent needs a real height.
