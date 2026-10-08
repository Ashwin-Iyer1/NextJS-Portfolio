"use client";

import { useSyncExternalStore } from "react";
import styles from "./AccentPicker.module.css";

const accents = [
  { id: "brass", label: "Brass" },
  { id: "glacier", label: "Glacier" },
  { id: "iris", label: "Iris" },
];

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-accent"],
  });
  return () => observer.disconnect();
}

function getAccent() {
  return document.documentElement.dataset.accent || "glacier";
}

export default function AccentPicker() {
  const accent = useSyncExternalStore(subscribe, getAccent, () => "glacier");

  function selectAccent(value) {
    document.documentElement.setAttribute("data-accent", value);
    try {
      localStorage.setItem("accent", value);
    } catch {
      // The controls remain usable when browser storage is unavailable.
    }
  }

  return (
    <fieldset className={styles.picker}>
      <legend>Choose an accent</legend>
      <div className={styles.options}>
        {accents.map(({ id, label }) => (
          <label key={id} className={styles.option} title={label}>
            <input
              type="radio"
              name="portfolio-accent"
              value={id}
              checked={accent === id}
              onChange={() => selectAccent(id)}
            />
            <span className={styles.swatch} data-swatch={id} />
            <span className={styles.label}>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
