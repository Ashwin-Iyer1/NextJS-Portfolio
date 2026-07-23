---
category: Metrics
keywords: [oura, list, card, generic]
---

The generic card the other Oura info cards are built on: a titled container that renders one block per item using your own render function. Reach for it when you need a card in this family that no specific component covers.

```jsx
<SimpleListCard
  title="TAGS"
  data={tags}
  renderItem={(tag) => <span>{tag.name}</span>}
/>
```

Both `data` and `renderItem` are **required** — `data` is mapped with no guard. Pass `[]` for the "No data" state.

Because you supply the item markup, this is the one component here where you are writing the content: use the system's tokens and the `oura-info-*` classes so it matches its neighbours.
