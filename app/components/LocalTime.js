"use client";

import { useEffect, useState } from "react";
import styles from "./LocalTime.module.css";

export default function LocalTime() {
  const [now, setNow] = useState(null);
  const [hour12, setHour12] = useState(true);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const zone = "America/New_York";
  const time = now?.toLocaleTimeString("en-US", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    hour12,
  });
  const date = now?.toLocaleDateString("en-US", {
    timeZone: zone,
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <aside className={styles.clock} aria-label="Boston local time">
      <div className={styles.topline}>
        <span>Boston, Massachusetts</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v6l4 2" />
        </svg>
      </div>
      <time className={styles.time} dateTime={now?.toISOString()}>
        {time || "—:—"}
      </time>
      <div className={styles.bottomline}>
        <span>{date || "Local time in Boston"}</span>
        <button
          type="button"
          onClick={() => setHour12(!hour12)}
          aria-label={`Switch to ${hour12 ? "24" : "12"}-hour time`}
          title="Change time format"
        >
          {hour12 ? "24h" : "12h"}
        </button>
      </div>
      <p className={styles.note}>
        A little context from my corner of the world.
      </p>
    </aside>
  );
}
