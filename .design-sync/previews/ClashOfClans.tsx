import React from "react";
import { ClashOfClans } from "newportfolio";

// Source is app/components/COC.js; stats come from bundled app/data/COC.json,
// so this renders complete with no network call.
//
// The component renders its OWN "Clash of Clans" section title — adding another
// heading above it produces a visible duplicate.

export const Default = () => <ClashOfClans />;

export const InANarrowColumn = () => (
  <div style={{ maxWidth: 460, margin: "0 auto" }}>
    <ClashOfClans />
  </div>
);
