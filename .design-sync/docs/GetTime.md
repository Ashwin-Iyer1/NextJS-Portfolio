---
category: Metrics
keywords: [wakatime, coding time, stat, hours]
---

Raw coding-time readout, sourced from WakaTime.

Prefer `GetTimeWrapper` — it is this component plus the card treatment the site uses. Reach for `GetTime` directly only when placing the figure inside a container you are styling yourself.

```jsx
<GetTime />
```

It fetches `/api/wakatime` on mount and shows a loading state until that resolves, so a static render shows the pre-fetch state.

It takes no props.
