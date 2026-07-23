import React from "react";
import { PersonalInfoCard } from "newportfolio";

// weight is kilograms and height is metres — the units are appended by the
// component. Every row renders whether or not it has a value, so omitting a
// field leaves a labelled blank rather than dropping the row — hence the
// placeholder address here rather than a missing one.

export const Default = () => (
  <div style={{ maxWidth: 360 }}>
    <PersonalInfoCard data={{ age: 21, weight: 72, height: 1.8, biological_sex: "male", email: "you@example.com" }} />
  </div>
);

// The API returns this payload as a singleton array; both forms are accepted.
export const FromSingletonArray = () => (
  <div style={{ maxWidth: 360 }}>
    <PersonalInfoCard data={[{ age: 21, weight: 72, height: 1.8, biological_sex: "male", email: "you@example.com" }]} />
  </div>
);

export const EmptyState = () => (
  <div style={{ maxWidth: 360 }}>
    <PersonalInfoCard data={null} />
  </div>
);
