import React from "react";
import { Skills } from "newportfolio";

// Ported from the Skills section of app/page.js. Years of experience are
// derived from a start year, so the figures move on their own.

export const Default = () => (
  <section>
    <h2 className="section-title">Skills</h2>
    <Skills />
  </section>
);

export const WithoutHeading = () => <Skills />;
