---
category: Projects
keywords: [clash of clans, game, stats, town hall, achievements]
---

Clash of Clans profile panel — town hall level and artwork, trophies, and formatted achievement counts. Stats ship with the bundle (`app/data/COC.json`), so it renders fully without a network call.

It renders its own "Clash of Clans" section title, so do **not** add a heading above it — you will get two.

```jsx
<ClashOfClans />
```

Exported as `ClashOfClans`; the source file is `app/components/COC.js`.

Town hall artwork is bundled for levels 14–16 and picked from the data. Large numbers are thousands-separated by the component, so pass nothing pre-formatted.

It takes no props.
