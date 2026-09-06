"use client";
import { useEffect, useState } from "react";
import styles from "./GetTime.module.css";

const WAKATIME_PROFILE =
  "https://wakatime.com/@bc413433-56e4-4dee-b14c-d8c669a8be79";
const formatHours = (seconds) =>
  seconds != null && Number.isFinite(Number(seconds))
    ? `${(Number(seconds) / 3600).toFixed(1)} hrs`
    : "—";

export default function GetTime() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 10000);
    async function load() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch("/api/wakatime", { signal: controller.signal });
        if (!res.ok) throw new Error("Unavailable");
        const data = await res.json();
        if (active) setStats(Array.isArray(data) ? data[0] || null : null);
      } catch {
        if (active) setError(true);
      } finally {
        clearTimeout(timeout);
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  return (
    <div
      className={`${styles.stats} ${loading ? styles.loadingStats : ""}`}
      aria-busy={loading}
    >
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
      {!loading && (error || !stats) && (
        <p className={styles.notice} role="status">
          {error
            ? "Coding stats are temporarily unavailable."
            : "No coding activity available yet."}
        </p>
      )}
      <div className={styles.meta}>
        Tracked with{" "}
        <a href={WAKATIME_PROFILE} target="_blank" rel="noopener noreferrer">
          WakaTime
        </a>
        <button
          type="button"
          onClick={() => setAttempt((n) => n + 1)}
          disabled={loading}
          aria-label="Refresh coding stats"
        >
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>
    </div>
  );
}
