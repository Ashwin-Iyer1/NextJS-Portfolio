---
category: Metrics
keywords: [oura, sleep window, bedtime, card]
---

Recommended sleep windows — one block per day with a status, an offset range and a recommendation.

```jsx
<SleepTimeCard
  data={[
    {
      day: "2026-07-21",
      status: "optimal",
      optimal_bedtime: { start_offset: -3600, end_offset: 3600 },
      recommendation: "Aim for a bedtime an hour either side of your usual.",
    },
  ]}
/>
```

`data` is **required** — the component maps over it with no guard and throws if it is omitted. Pass `[]` to get the "No data" state.

Offsets are in seconds and rendered as whole hours.
