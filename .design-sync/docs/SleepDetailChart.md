---
category: Metrics
keywords: [oura, sleep stages, phases, stacked chart, visx]
---

Sleep broken into its stages — deep, light, REM and awake — per night.

```jsx
<div style={{ height: 320 }}>
  <SleepDetailChart
    data={[
      {
        day: "2026-07-21",
        total_sleep_duration: 27000,
        deep_sleep_duration: 5400,
        light_sleep_duration: 14400,
        rem_sleep_duration: 7200,
        awake_time: 1800,
      },
    ]}
  />
</div>
```

Every duration is in **seconds** (27000 = 7.5 h). Passing minutes silently produces a chart two orders of magnitude too short.

Distinct from `SleepChart`, which plots contributor *scores* (1–100); this one plots actual time. Give it a little more height than the others — the stages legend takes a row.
