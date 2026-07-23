---
category: Content
keywords: [work, experience, resume, timeline, employment]
---

Vertical list of roles. Each entry is a company logo, the company name, the role, and the dates.

Use it on a resume or about page. It is the employment counterpart to `Skills`.

```jsx
<section>
  <h2>Experience</h2>
  <WorkExperience />
</section>
```

Styled with MUI `Box` and `sx` rather than a stylesheet, but the values come from the same CSS variables as the rest of the system (`--accent-brand`, `--text-secondary`), so it follows the theme toggle like everything else.

The roles are defined inside the component; it takes no props.
