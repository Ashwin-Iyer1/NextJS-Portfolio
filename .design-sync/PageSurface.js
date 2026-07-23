// The page surface these components are designed to sit on.
//
// In the real site that surface is <html data-theme> + <body>, styled by
// app/globals.css: background --bg-primary, color --text-primary, centred
// content, Inter. This component is the portable equivalent — it exists because
// a preview card and a generated design both render components outside
// app/layout.js, where nothing applies those rules (the preview card even
// hard-codes a white body background).
//
// It reimplements no component: it is the layout shell, and it is exported so
// the design agent can put the same surface under anything it builds.
import React from "react";

export default function PageSurface({ children, theme = "dark" }) {
  const ref = React.useRef(null);

  // globals.css makes <body> a centering flex container, so the mount node
  // between <body> and this component shrink-wraps its content. A percentage
  // width then resolves against a box that is itself sized by its content and
  // collapses toward zero — which silently blanks anything that measures its
  // own container (every visx ParentSize chart renders nothing below 10px).
  // Give that node a real width so measurement has something to measure.
  React.useLayoutEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const prev = parent.style.width;
    parent.style.width = "100%";
    return () => { parent.style.width = prev; };
  }, []);

  // Written to the real document, not just to a wrapper div, for two reasons:
  // the host page's own background would otherwise show through around the
  // content, and several components key off [data-theme] on <html> — most
  // visibly ThemeToggle, whose sun/moon icons are shown and hidden by
  // [data-theme] selectors in Bar.css.
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const prevTheme = root.getAttribute("data-theme");
    const prevBg = body.style.background;
    const prevColor = body.style.color;

    root.setAttribute("data-theme", theme);
    body.style.background = "var(--bg-primary)";
    body.style.color = "var(--text-primary)";

    return () => {
      if (prevTheme === null) root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", prevTheme);
      body.style.background = prevBg;
      body.style.color = prevColor;
    };
  }, [theme]);

  return React.createElement(
    "div",
    { ref, style: { color: "var(--text-primary)", width: "100%" } },
    children,
  );
}
