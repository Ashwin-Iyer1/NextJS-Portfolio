---
category: Metrics
keywords: [oura, steps, activity, chart, bar chart, visx]
---

Daily step count as a bar chart. One of the three Oura chart primitives, and the only one in the system that takes real chart data.

```jsx
<div style={{ height: 280 }}>
  <ActivityChart
    data={[
      { day: "2026-07-17", steps: 8421 },
      { day: "2026-07-18", steps: 11204 },
      { day: "2026-07-19", steps: 6033 },
    ]}
  />
</div>
```

It fills its parent through `ParentSize`, so **the parent must have a real height** — in a zero-height or `auto`-height box it renders nothing. The site uses `280px`.

With no `data`, or an empty array, it renders a labelled empty state rather than an empty frame. Axis labels are compacted (`11204` → `11k`) and the day axis shows day-of-month only.
