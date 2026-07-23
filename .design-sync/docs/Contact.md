---
category: Identity
keywords: [contact, resume, links, call to action]
---

Row of labelled contact tiles — an icon with its name underneath (GitHub, LinkedIn, Resume). Internal destinations render as router links; external ones open in a new tab with `rel="noopener noreferrer"`.

Use it as the closing block of a page, or as the body of a contact section.

```jsx
<section>
  <h2 className="section-title">Contact</h2>
  <Contact />
</section>
```

Distinct from `Links`, which is easy to confuse with it: `Contact` is the short, **labelled** set for reaching the person (including the résumé); `Links` is the unlabelled social row (GitHub, LinkedIn, Instagram, Discord). Pick one per section rather than stacking both.

The methods are defined inside the component; it takes no props.
