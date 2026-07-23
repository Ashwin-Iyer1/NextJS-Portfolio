import React from "react";
import { NameAnim } from "newportfolio";

// Exactly how app/page.js uses it: a full-viewport splash, held for ~2.2s and
// then faded out. There is deliberately only one cell —
//   · it owns its layout (.container is height:100vh), so anything placed after
//     it lands below the fold and simply is not seen;
//   · a colour variant would be a lie: .container pins colour to
//     var(--splash-stroke), so `color` on a wrapper has no effect.
// It paints SVG strokes and no text, which is why validate reports it as
// "thin" — expected for a signature mark, not a defect.

export const Splash = () => (
  <div className="fade-out">
    <NameAnim />
  </div>
);
