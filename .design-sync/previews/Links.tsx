import React from "react";
import { Links } from "newportfolio";

// A compact icon row — the scannable counterpart to Contact's labelled list.

export const Default = () => <Links />;

export const InAHeroSection = () => (
  <section style={{ textAlign: "center" }}>
    <h2 className="section-title">Find me elsewhere</h2>
    <Links />
  </section>
);
