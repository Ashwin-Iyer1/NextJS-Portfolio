---
category: Content
keywords: [video, carousel, youtube, embed, gallery]
---

Single-video carousel for embedded YouTube work, with next/previous controls and a numbered caption (`01 / 05`) under each clip. A shimmer skeleton holds the frame until the iframe loads.

Use it as a section on a projects page.

```jsx
<section>
  <h2>Video</h2>
  <MiscProj />
</section>
```

It needs real width to be legible — give it the page's content column, not a sidebar.

The video list is defined inside the component; it takes no props. The YouTube embeds load for real, so a preview shows an actual thumbnail with its play button — the shimmer skeleton only appears while an iframe is still loading.
