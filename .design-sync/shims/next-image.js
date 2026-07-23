// Stand-in for `next/image` outside a Next.js app.
// Static image imports resolve to data-URI strings through esbuild's `dataurl`
// loader, so `src` arrives as a string here rather than the {src,width,height}
// object next/image receives from the Next loader — both forms are handled.
import React from "react";

const NEXT_ONLY = new Set([
  "loader",
  "quality",
  "priority",
  "placeholder",
  "blurDataURL",
  "unoptimized",
  "onLoadingComplete",
  "loading",
  "overrideSrc",
]);

const Image = React.forwardRef(function Image({ src, alt, fill, style, ...rest }, ref) {
  const resolved = typeof src === "string" ? src : (src?.src ?? "");
  const props = {};
  for (const key of Object.keys(rest)) {
    if (!NEXT_ONLY.has(key)) props[key] = rest[key];
  }
  // `fill` positions the image absolutely to cover its nearest positioned
  // ancestor — the same layout contract the real component provides.
  const fillStyle = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
    : null;
  return React.createElement("img", {
    src: resolved,
    alt: alt ?? "",
    ref,
    style: fillStyle ? { ...fillStyle, ...style } : style,
    ...props,
  });
});

export default Image;
