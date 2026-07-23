---
category: Metrics
keywords: [wakatime, coding time, stat card, tile]
---

Coding-time stat card — `GetTime` inside the card treatment used elsewhere on the site (surface background, border, radius).

This is the one to place on a page; use `GetTime` alone only inside a container you are styling yourself.

```jsx
<GetTimeWrapper />
```

It sizes to its container, so it sits naturally in a stat row beside other tiles.

It takes no props. The figure comes from `/api/wakatime`, so a static render shows the pre-fetch state.
