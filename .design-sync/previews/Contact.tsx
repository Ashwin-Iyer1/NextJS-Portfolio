import React from "react";
import { Contact } from "newportfolio";

// Ported from the Contact section of app/page.js.

export const Default = () => (
  <section>
    <h2 className="section-title">Contact</h2>
    <Contact />
  </section>
);

export const WithoutHeading = () => <Contact />;
