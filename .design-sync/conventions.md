# Building with this design system

This is the component library behind a personal portfolio site (Next.js). It is
**dark-first**, styled entirely with CSS custom properties, and its components are
whole page sections rather than small primitives — a `Skills` grid, a `BlogList`,
a `KalshiPositions` panel. Compose pages out of them; write only the layout glue
between them.

## Wrap the page in `PageSurface`

Every color in this system is a token defined twice: once under
`:root, [data-theme="dark"]` and once under `[data-theme="light"]`. Nothing
resolves until something sets that attribute and paints the page background.
`PageSurface` does both — it is the exported equivalent of the site's `<body>`.

```jsx
<PageSurface>
  <Bar />
  <section>
    <h2 className="section-title">Writing</h2>
    <BlogList />
  </section>
</PageSurface>
```

Without it the page keeps the host's white background while text stays
`--text-primary` (near-white) — the layout is intact but effectively unreadable.
`ThemeToggle` also depends on `[data-theme]` being present on `<html>`: its sun
and moon icons are shown and hidden by attribute selectors, not by React state.
Pass `theme="light"` to `PageSurface` to preview the light token set.

## Style with tokens and two utility classes — never hard-coded values

There is no utility framework here. The vocabulary is CSS custom properties plus
a very small set of global classes, all defined in `_ds/<folder>/styles.css` and
its imports. Read that file before styling anything; these are the real names:

| Group | Tokens |
|---|---|
| Surface | `--bg-primary` `--bg-secondary` `--bg-card` `--bg-card-hover` |
| Text | `--text-primary` `--text-secondary` `--text-muted` |
| Accent | `--accent-brand` (gold, the one brand colour) `--accent-primary` `--accent-secondary` |
| Semantic | `--success` `--danger` |
| Border | `--border-color` `--border-hover` |
| Radius | `--radius-sm` `--radius-md` `--radius-lg` `--radius-xl` |
| Spacing | `--space-xs` `--space-sm` `--space-md` `--space-lg` `--space-xl` `--space-2xl` `--space-3xl` `--space-4xl` |
| Shadow | `--shadow-sm` `--shadow-md` `--shadow-lg` `--shadow-glow` |
| Motion | `--transition-fast` `--transition-base` `--transition-slow` |
| Layout | `--max-width` (the content column) `--font-inter` |

Two global classes carry most of the look, and you should reuse them rather than
restyling:

- **`glass-card`** — the canonical card: `--bg-card`, a `--border-color` hairline,
  `--radius-lg`, `--space-lg` padding, blur, and a hover lift. Wrap anything that
  should read as a panel.
- **`section-title`** — the centred section heading, with a short
  `--accent-brand` rule underneath via `::after`. Use it on the `<h2>` above each
  section.

Also available: `loading`, and `fade` / `fade-in` / `fade-out` for the site's
transitions. Inside the Oura chart family there is a second, narrower vocabulary:
`oura-tile` (chart tile), `oura-seq-1` … `oura-seq-7` (the only categorical
colour scale in the system, with its own light-theme values), and
`oura-info-row` / `oura-info-label` / `oura-info-value` / `oura-info-block` /
`oura-empty-note` for the info cards. Reuse those for any chart legend or list
row so it matches its neighbours.

Two typefaces: **Inter** for everything (via `--font-inter`) and **Caveat** for
the handwritten wordmark only. Both load remotely.

## Charts need a parent with a real height

Every `*Chart` component fills its container through visx `ParentSize` and
**renders nothing at all** below 10px. Always give the wrapper an explicit
height — the site uses `280px` (`320px` where there is a legend):

```jsx
<div className="glass-card" style={{ height: 280 }}>
  <ActivityChart data={[{ day: "2026-07-21", steps: 10087 }]} />
</div>
```

Units are easy to get wrong and fail silently, so check the component's
`.prompt.md` before inventing data: sleep durations and stress/recovery are in
**seconds**, prices in **cents**, and `SpO2Chart` reads `spo2_percentage.average`,
not a flat number. Charts render a labelled empty state for `[]` or omitted data.

## Where the truth is

`<Name>.prompt.md` next to each component is the usage reference and
`<Name>.d.ts` is the API contract — read both before composing, especially for
the components whose props are load-bearing (`CensoredImage`, `OuraDashboard`,
every `*Chart`, `SimpleListCard`). Most other components take **no props at all**:
their content is defined in their own source, so a design changes them by
changing layout around them, not by passing data.

Several components (`KalshiPositions`, `OuraDashboard`, `GetTime`,
`GetTimeWrapper`, `SongList`) fetch from the site's own `/api/*` routes on mount.
Outside that site they show their loading or error branch — real, designed states,
but not the loaded one. To show loaded data in a design, compose the individual
chart components with literal `data` instead of reaching for `OuraDashboard`.
