import React from "react";
import { MiscProj } from "newportfolio";

// A single-video carousel with next/previous controls and a numbered caption.
// Needs the page's content column to be legible.

export const Default = () => (
  <section>
    <h2 className="section-title">Miscellaneous Projects</h2>
    <MiscProj />
  </section>
);

export const WithoutHeading = () => <MiscProj />;
