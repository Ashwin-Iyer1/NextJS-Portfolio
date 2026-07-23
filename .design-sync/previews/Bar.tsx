import React from "react";
import { Bar } from "newportfolio";

// Bar supplies its own <nav> landmark and sits above page content.
// Outside a Next router the path resolves to "/", so Home renders as the
// active item (tinted with --accent-brand) — correct, not a preview artefact.

export const Default = () => <Bar />;

export const AbovePageContent = () => (
  <>
    <Bar />
    <section style={{ padding: "var(--space-2xl) var(--space-md)" }}>
      <h2 className="section-title">Projects</h2>
      <p style={{ textAlign: "center" }}>
        Page content sits below the bar and inherits the page surface.
      </p>
    </section>
  </>
);
