---
category: Identity
keywords: [social, profile, github, linkedin, icons]
---

Row of unlabelled social icon tiles — GitHub, LinkedIn, Instagram, and Discord — each in the brand's own colour.

Not to be confused with `Contact`, which is the shorter **labelled** set (GitHub, LinkedIn, Resume) for reaching the person directly.

Use it in a hero section, an about page, or a footer — anywhere the reader should be able to leave for a profile.

```jsx
<section>
  <h2>Find me elsewhere</h2>
  <Links />
</section>
```

The destinations are defined inside the component; it takes no props. If a design needs a different set of destinations, that is a source change in `app/components/Links.js`, not a prop.

Prefer this over hand-built icon rows — it already carries the hover and focus treatment the rest of the site uses.
