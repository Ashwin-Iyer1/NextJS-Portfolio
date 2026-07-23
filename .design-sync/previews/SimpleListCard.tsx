import React from "react";
import { SimpleListCard } from "newportfolio";

// The generic card the other Oura info cards are built on. You supply the item
// markup, so use the oura-info-* classes and the system tokens to match them.

const TAGS = [
  { name: "Caffeine after 4pm", day: "2026-07-21" },
  { name: "Late workout", day: "2026-07-20" },
  { name: "Travel", day: "2026-07-18" },
];

export const Default = () => (
  <div style={{ maxWidth: 380 }}>
    <SimpleListCard
      title="TAGS"
      data={TAGS}
      renderItem={(tag: any) => (
        <>
          <div className="oura-info-label">{tag.day}</div>
          <div className="oura-info-value" style={{ textAlign: "left" }}>{tag.name}</div>
        </>
      )}
    />
  </div>
);

export const EmptyState = () => (
  <div style={{ maxWidth: 380 }}>
    <SimpleListCard title="TAGS" data={[]} renderItem={() => null} />
  </div>
);
