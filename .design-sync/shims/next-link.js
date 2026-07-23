// Stand-in for `next/link` outside a Next.js app.
// The real Link renders an <a> plus router prefetch behaviour; only the <a> is
// observable in a static preview, so this keeps the markup and drops the
// router-coupled props Next would otherwise strip itself.
import React from "react";

const ROUTER_ONLY = new Set([
  "prefetch",
  "replace",
  "scroll",
  "shallow",
  "passHref",
  "legacyBehavior",
  "locale",
]);

const Link = React.forwardRef(function Link({ href, children, ...rest }, ref) {
  const props = {};
  for (const key of Object.keys(rest)) {
    if (!ROUTER_ONLY.has(key)) props[key] = rest[key];
  }
  return React.createElement(
    "a",
    { href: typeof href === "string" ? href : (href?.pathname ?? "#"), ref, ...props },
    children,
  );
});

export default Link;
