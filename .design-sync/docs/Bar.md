---
category: Navigation
keywords: [nav, navbar, header, primary navigation]
---

Primary site navigation. Renders the wordmark on the left and the Home / Projects / About links plus `ThemeToggle` on the right.

Place it once, at the top of a page, outside the main content container — it supplies its own `<nav aria-label="Primary">` landmark.

```jsx
<>
  <Bar />
  <main>{/* page content */}</main>
</>
```

The active link is derived from the current route and marked with `aria-current="page"` and the `nav-link-active` class, which tints it with `--accent-brand`. Outside a Next.js router the path resolves to `/`, so **Home** renders as the active item — that is the expected appearance in a design, not a bug.

The wordmark uses the `Caveat` display family; body links inherit Inter from the page.
