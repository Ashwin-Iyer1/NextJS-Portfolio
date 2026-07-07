"use client";
import React, { useEffect, useState } from "react";
import styles from "./GetTime.module.css";

const WAKATIME_PROFILE =
  "https://wakatime.com/@bc413433-56e4-4dee-b14c-d8c669a8be79";

// Coerce first: the API may return numeric columns as strings
const formatHours = (seconds) => {
  const n = Number(seconds);
  return seconds != null && Number.isFinite(n)
    ? `${(n / 3600).toFixed(1)} hrs`
    : "N/A";
};

export default function GetTime() {
  const [wakatime, setWakatime] = useState([]); // State for Wakatime data
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchWakatime = async () => {
      try {
        // Attempt to fetch the data from the external API
        const res = await fetch(`/api/wakatime`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        // Await the JSON response to get the Wakatime data
        const data = await res.json();
        setWakatime(data); // Set the fetched data
      } catch (error) {
        console.error(
          "Failed to fetch from API, falling back to local data:",
          error
        );

        // If the fetch fails, just set fallback data
        setWakatime("Too long!");
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchWakatime(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  const stats = Array.isArray(wakatime) ? wakatime[0] : undefined;

  return (
    <div className={`${styles.stats} ${loading ? styles.loadingStats : ""}`}>
      <p className={styles.statRow}>
        <span className={styles.statLabel}>Total</span>
        <span className={styles.statValue}>
          {loading ? "—" : formatHours(stats?.total_seconds)}
        </span>
      </p>
      <p className={styles.statRow}>
        <span className={styles.statLabel}>Daily average</span>
        <span className={styles.statValue}>
          {loading ? "—" : formatHours(stats?.daily_average)}
        </span>
      </p>
      <p className={styles.meta}>
        Tracked with{" "}
        <a href={WAKATIME_PROFILE} target="_blank" rel="noopener noreferrer">
          Wakatime
        </a>
      </p>
    </div>
  );
}
