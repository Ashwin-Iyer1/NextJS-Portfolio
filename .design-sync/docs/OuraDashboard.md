---
category: Metrics
keywords: [oura, dashboard, masonry, health, tiles]
---

Full Oura health dashboard — a masonry of chart tiles built from the last ten days of ring data.

This is how the site's own "Now" section uses it — a single dense column of four families:

```jsx
<OuraDashboard
  subset={["activity", "heart_rate", "sleep", "stress"]}
  columns={1}
  chartHeight="180px"
  compact
/>
```

`subset` **must be an array** — a bare string like `subset="sleep"` is silently ignored and every family is fetched instead. Leave it `null` to render everything deliberately. `columns` takes either a fixed count or a per-breakpoint object (`{ xs: 1, sm: 2, lg: 3 }`, the default).

It fetches its own data from the site's Oura API on mount and passes through loading, error, and empty states before any tile appears. **Without those endpoints it never reaches the loaded state** — for a design that needs to show the charts themselves, compose `ActivityChart` / `ReadinessChart` / `SleepChart` with literal data instead, and reach for `OuraDashboard` only when building the real page.
