import React from "react";
import { BlogList } from "newportfolio";

// Ported from the site's Writing section in app/page.js, which is the whole
// canonical composition: a section title above the grid.

export const Default = () => (
  <section>
    <h2 className="section-title">Writing</h2>
    <BlogList />
  </section>
);

export const WithoutHeading = () => <BlogList />;
