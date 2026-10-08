"use client";

import { useEffect, useState } from "react";
import styles from "./SectionNav.module.css";

const sections = [
  ["WorkingOn", "Experience"],
  ["selected-projects", "Projects"],
  ["writing", "Writing"],
  ["now-title", "Now"],
  ["contact", "Contact"],
];

export default function SectionNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActive(visible.target.id === "top" ? "" : visible.target.id);
        }
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    ["top", ...sections.map(([id]) => id)].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.nav} aria-label="On this page">
      <span className={styles.label}>Take a look around</span>
      <div className={styles.links}>
        {sections.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setActive(id)}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
