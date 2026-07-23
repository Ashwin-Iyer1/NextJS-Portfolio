import React from "react";
import { ThemeToggle } from "newportfolio";

// Bar already contains a ThemeToggle; place it directly only in a header that
// does not use Bar. It always starts on the dark (moon) state and only reads
// the stored preference after mount.

export const Default = () => <ThemeToggle />;

export const InACustomHeader = () => (
  <header
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--space-md) var(--space-lg)",
      border: "1px solid var(--border-color)",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-card)",
    }}
  >
    <span style={{ fontWeight: 600 }}>Ashwin Iyer</span>
    <ThemeToggle />
  </header>
);
