import React from "react";
import { ProjectList } from "newportfolio";

// Repository data ships in app/data/repos.json, so the grid renders fully
// offline. It wants the full content column — the tag rows crowd in anything
// narrower.

export const Default = () => (
  <main>
    <h2 className="section-title">Projects</h2>
    <ProjectList />
  </main>
);

export const WithoutHeading = () => <ProjectList />;
