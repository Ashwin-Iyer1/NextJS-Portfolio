---
category: Identity
keywords: [logo, signature, wordmark, splash, animation]
---

The handwritten "Ashwin Iyer" signature, drawn as an SVG stroke animation that plays once on mount.

Use it as the hero element of a landing or splash screen. It scales to its container's width and inherits its color from `currentColor`, so set the color on a wrapper rather than on the component.

```jsx
<div style={{ color: "var(--logo-color)", maxWidth: "560px" }}>
  <NameAnim />
</div>
```

The paths animate in sequence over roughly a second. In a static screenshot the signature appears fully drawn.

This is a brand mark, not a text component — do not use it for arbitrary headings.
