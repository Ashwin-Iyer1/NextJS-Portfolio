---
category: Navigation
keywords: [theme, dark mode, light mode, toggle]
---

Sun/moon button that switches the page between the dark and light token sets. It writes `data-theme` on `<html>` and persists the choice to `localStorage`.

`Bar` already includes it — only place it directly when building a header that does not use `Bar`.

```jsx
<ThemeToggle />
```

Every color token in this system is defined twice, under `:root, [data-theme="dark"]` and under `[data-theme="light"]`. Because this component drives that attribute, anything styled with the tokens follows the toggle automatically; anything styled with hard-coded colors will not.

It starts in dark and only reads the stored value after mount, so its first paint is always the dark (moon-to-sun) state.
