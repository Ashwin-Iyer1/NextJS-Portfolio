---
category: Metrics
keywords: [oura, rest mode, recovery, card]
---

Rest-mode periods — a start/end range per entry with its tagged episodes listed underneath. An open period renders as "Ongoing".

```jsx
<RestModeCard
  data={[
    { start_day: "2026-07-18", end_day: null, episodes: [{ tags: ["illness"] }] },
  ]}
/>
```

`data` is **required** and so is `episodes` on every entry — both are mapped with no guard. Pass `[]` for the "No rest modes active" state, and `episodes: []` for a period with no tagged episodes.
