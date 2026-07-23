import React from "react";
import { WorkExperience } from "newportfolio";

// app/page.js puts WorkExperience inside a glass-card — that pairing is the
// canonical treatment.

export const InAGlassCard = () => (
  <section>
    <h2 className="section-title">Work Experience</h2>
    <div className="glass-card">
      <WorkExperience />
    </div>
  </section>
);

export const Bare = () => <WorkExperience />;
