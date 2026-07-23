---
category: Metrics
keywords: [oura, stress, recovery, stacked bar chart, visx]
---

Daily stress and recovery as a stacked bar chart, with a legend above the plot. Recovery sits on the bottom in the quiet `.oura-bar` grey; stress stacks on top in `.oura-fill-danger`, the system's semantic danger fill.

```jsx
<div style={{ height: 280 }}>
  <StressChart
    data={[
      { day: "2026-07-20", stress_high: 7200, recovery_high: 18000 },
      { day: "2026-07-21", stress_high: 12600, recovery_high: 9000 },
    ]}
  />
</div>
```

Both values are **seconds**, not percentages — they are durations spent in each state that day.

Fills its parent through `ParentSize`, so the parent needs a real height. Renders a labelled empty state with no `data`.
