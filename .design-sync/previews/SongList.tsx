import React from "react";
import { SongList } from "newportfolio";

// SongList fetches /api/songs and falls back to bundled app/data/songs.json,
// so unlike the other live-data components it shows real rows with artwork in a
// preview. What renders here is that fallback.

export const Default = () => (
  <section>
    <h2 className="section-title">On repeat</h2>
    <SongList />
  </section>
);

export const WithoutHeading = () => <SongList />;
