---
category: Content
keywords: [image, blur, spoiler, reveal, redaction]
---

An image that starts blurred and reveals itself on click, tap, or Enter/Space. Use it for anything a reader should opt into seeing — a spoiler, a result, a personal screenshot.

This is the one component in the system with a real prop-driven API.

```jsx
<CensoredImage
  src="/screenshots/portfolio-pnl.png"
  alt="Year-to-date portfolio performance"
  caption="Click to reveal"
/>
```

`alt` is announced whether or not the image is revealed, so write it for someone who will never click. `caption` is the visible hint under the image and is optional.

Once revealed it stays revealed — there is no re-censor control, so do not rely on it as a privacy boundary. It is a courtesy, not a redaction.
