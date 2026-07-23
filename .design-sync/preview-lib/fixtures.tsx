import React from "react";

// Several components in this system fetch from the site's own /api/* routes on
// mount. Nothing serves those routes to a preview card or a rendered design, so
// left alone those components only ever show their error or loading branch —
// true to the code, but useless to a designer laying out the loaded state.
//
// withFixtures serves named routes from literal data. The component itself is
// untouched: it still does its own fetching, parsing, formatting and layout.
// Only the HTTP responses are supplied.
//
// Lives outside previews/ so the converter doesn't mistake it for a component's
// preview file.

type Routes = Record<string, unknown>;

export function withFixtures(routes: Routes, Story: React.ComponentType) {
  return function Fixtured() {
    // Installed during the first render — before the component's mount effect
    // runs — so the very first fetch is already served. Restored on unmount so
    // one cell can never leak into another.
    const real = React.useRef<typeof fetch | null>(null);
    if (!real.current) {
      real.current = window.fetch;
      const passthrough = real.current;
      window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(
          typeof input === "string" ? input : ((input as Request).url ?? input),
        );
        // Longest match first, so "/api/kalshi-profile" is not swallowed by
        // a "/api/kalshi" entry.
        const hit = Object.keys(routes)
          .sort((a, b) => b.length - a.length)
          .find((route) => url.includes(route));
        if (hit === undefined) return passthrough(input as RequestInfo, init);
        return Promise.resolve(
          new Response(JSON.stringify(routes[hit]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
        );
      }) as typeof fetch;
    }
    React.useEffect(
      () => () => {
        if (real.current) window.fetch = real.current;
      },
      [],
    );
    return <Story />;
  };
}
