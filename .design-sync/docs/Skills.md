---
category: Content
keywords: [skills, technologies, icons, grid, about]
---

Grid of technologies with a Simple Icons glyph, the technology name, and the number of years of experience — computed from a start year, so the figures stay current without editing.

Use it on an about or resume page, under a heading.

```jsx
<section>
  <h2>Skills</h2>
  <Skills />
</section>
```

It renders a `<ul>` and wraps to fill its container's width, so it needs a width-constrained parent (the site uses `--max-width`) rather than a fixed height.

The technology list is defined inside the component; it takes no props.
