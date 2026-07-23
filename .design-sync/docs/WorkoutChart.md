---
category: Metrics
keywords: [oura, workout, calories, bar chart, visx]
---

Calories burned per day in logged workouts, as bars.

```jsx
<div style={{ height: 280 }}>
  <WorkoutChart
    data={[
      { day: "2026-07-20", calories: 420 },
      { day: "2026-07-21", calories: 0 },
      { day: "2026-07-22", calories: 610 },
    ]}
  />
</div>
```

Rest days are real data — pass them as `calories: 0` rather than omitting the day, so the axis stays continuous.

Fills its parent through `ParentSize`, so the parent needs a real height.
