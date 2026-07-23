import React from "react";
import { CensoredImage } from "newportfolio";
import townHall from "../../app/Images/COC/Town_Hall16.webp";

// The site's own use of CensoredImage is a run of gym progress photos in
// content/working-out.mdx. Those are personal, so these cells use in-repo
// artwork instead; the composition (a dated caption under a blurred image the
// reader opts into) is the same.
//
// The component renders its own "Click to Reveal" overlay, so `caption` is for
// saying what the image IS — repeating the call to action just duplicates it.

export const Default = () => (
  <div style={{ maxWidth: 360 }}>
    <CensoredImage
      src={townHall}
      alt="Town Hall 16 base layout, fully upgraded"
      caption="Town Hall 16 — March 2026"
    />
  </div>
);

export const WithoutCaption = () => (
  <div style={{ maxWidth: 360 }}>
    <CensoredImage src={townHall} alt="Town Hall 16 base layout, fully upgraded" />
  </div>
);

export const InAGallery = () => (
  <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap" }}>
    <div style={{ width: 240 }}>
      <CensoredImage src={townHall} alt="Base layout, December" caption="December 2025" />
    </div>
    <div style={{ width: 240 }}>
      <CensoredImage src={townHall} alt="Base layout, March" caption="March 2026" />
    </div>
  </div>
);
