"use client";

import React, { useEffect, useState } from "react";
import styles from "./KalshiPositions.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const KalshiPositions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await fetch("/api/kalshi");
        if (!res.ok) {
          throw new Error("Failed to fetch Kalshi positions");
        }
        const data = await res.json();
        setPositions(data);
      } catch (error) {
        console.error("Error fetching Kalshi positions:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const getSubtitle = (position) => {
    return position.position_side === "YES"
      ? position.yes_sub_title
      : position.no_sub_title;
  };

  const formatPnL = (pnl) => {
    const sign = pnl > 0 ? "+" : "";
    const dollars = (pnl / 100).toFixed(2);
    return `${sign}$${dollars}`;
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <p>Loading positions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["error-container"]}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles["positions-container"]}>
      <h2 className={styles["positions-title"]}>Kalshi Positions</h2>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3} className={styles["positions-grid"]}>
          {positions.map((position) => (
            <Grid item key={position.id}>
              <div className={styles["position-card"]}>
                <div className={styles["card-header"]}>
                  <span className={styles["category-badge"]}>
                    {position.series_category}
                  </span>
                  <span
                    className={`${styles["position-badge"]} ${
                      styles[position.position_side.toLowerCase()]
                    }`}
                  >
                    {position.position_side}
                  </span>
                </div>

                <h3 className={styles["market-title"]}>
                  {position.market_title}
                </h3>

                <div className={styles["subtitle"]}>
                  <strong>Position:</strong> {getSubtitle(position)}
                </div>

                <div className={styles["position-details"]}>
                  <div className={styles["detail-row"]}>
                    <span className={styles["detail-label"]}>Contracts:</span>
                    <span className={styles["detail-value"]}>
                      {position.total_absolute_position}
                    </span>
                  </div>

                  <div className={styles["detail-row"]}>
                    <span className={styles["detail-label"]}>
                      Current Price:
                    </span>
                    <span className={styles["detail-value"]}>
                      {position.current_price}¢
                    </span>
                  </div>

                  <div className={styles["detail-row"]}>
                    <span className={styles["detail-label"]}>P&L:</span>
                    <span
                      className={`${styles["detail-value"]} ${
                        position.pnl > 0
                          ? styles["pnl-positive"]
                          : position.pnl < 0
                          ? styles["pnl-negative"]
                          : styles["pnl-neutral"]
                      }`}
                    >
                      {formatPnL(position.pnl)}
                    </span>
                  </div>
                </div>

                <div className={styles["card-footer"]}>
                  <span className={styles["ticker"]}>
                    {position.market_ticker}
                  </span>
                  <span className={styles["last-updated"]}>
                    Updated:{" "}
                    {new Date(position.last_updated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default KalshiPositions;
