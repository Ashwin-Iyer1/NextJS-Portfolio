---
category: Projects
keywords: [projects, repositories, github, cards, tags]
---

Card grid of GitHub repositories, each with a name, description, technology tags, and stats. Repository data ships with the bundle (`app/data/repos.json`), so it renders fully without a network call.

Use it as the body of a projects page.

```jsx
<main>
  <h1>Projects</h1>
  <ProjectList />
</main>
```

Give it the full content column — the cards carry tag rows that crowd badly in a narrow container.

The repository list and its tag mapping are defined in the data file; the component takes no props.
