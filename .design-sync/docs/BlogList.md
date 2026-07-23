---
category: Content
keywords: [blog, posts, cards, grid, index]
---

Card grid of blog posts. Each card is a title, a rule, a description, and a "Read post" affordance. External destinations get a ↗ glyph and an "Opens in a new tab" label instead.

Use it as the body of a blog index page.

```jsx
<main>
  <h1>Writing</h1>
  <BlogList />
</main>
```

The cards are full-height and equal-width, so give it a width-constrained parent and let it wrap; do not put it in a fixed-height box.

The post list is defined inside the component; it takes no props.
