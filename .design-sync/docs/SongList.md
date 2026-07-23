---
category: Metrics
keywords: [music, spotify, songs, listening, list]
---

Recently-played songs — title, artist, and artwork per row.

```jsx
<section>
  <h2>On repeat</h2>
  <SongList />
</section>
```

It fetches `/api/songs` on mount and falls back to the bundled `app/data/songs.json` when that call fails, so it renders real rows in a design even with no backend. That fallback is what you are seeing in a static preview.

It takes no props.
