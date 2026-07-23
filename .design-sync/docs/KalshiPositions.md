---
category: Metrics
keywords: [kalshi, trading, positions, prediction market, portfolio]
---

Live Kalshi trading panel: open positions plus profile metrics (balance, realized P&L, win rate). Numbers use a monospace face and the shared `--success` / `--danger` tokens for direction.

```jsx
<KalshiPositions id="kalshi" />
```

`id` is applied to the root element so a page nav can deep-link to the section.

It fetches `/api/kalshi` and `/api/kalshi-profile` on mount and passes through three states — loading, error, and loaded. Without those endpoints it settles into its error state, which is the honest appearance outside the running site; design around the loaded state and treat the others as real states worth laying out.
