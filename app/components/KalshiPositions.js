"use client";

import React, { useEffect, useState } from "react";
import styles from "./KalshiPositions.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "next/link";

const KalshiPositions = ({ id }) => {
  const [positions, setPositions] = useState([]);
  const [profileMetrics, setProfileMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch positions
        const positionsRes = await fetch("/api/kalshi");
        if (!positionsRes.ok) {
          throw new Error("Failed to fetch Kalshi positions");
        }
        const positionsData = await positionsRes.json();
        setPositions(positionsData);

        // Fetch profile metrics
        const profileRes = await fetch("/api/kalshi-profile");
        if (!profileRes.ok) {
          throw new Error("Failed to fetch Kalshi profile");
        }
        const profileData = await profileRes.json();
        setProfileMetrics(profileData.metrics);
      } catch (error) {
        console.error("Error fetching Kalshi data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <div className={styles["loading-container"]} id={id}>
        <p>Loading positions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["error-container"]} id={id}>
        <p>Error: {error}</p>
      </div>
    );
  }

  // Get overall P&L from profile metrics
  let overallPnL = profileMetrics?.pnl / 100 || 0;
  let secondAcctPnl = 700 * 100;
  overallPnL = overallPnL + secondAcctPnl;
  return (
    <div
      className={styles["positions-container"]}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      id={id}
    >
      <h2 className={styles["positions-title"]}>Kalshi Positions</h2>

      {/* Overall Profile P&L Display */}
      <div className={styles["total-pnl-container"]}>
        <h3 className={styles["total-pnl-title"]}>Overall P&L</h3>
        <p
          className={`${styles["total-pnl-value"]} ${
            overallPnL > 0
              ? styles["positive"]
              : overallPnL < 0
              ? styles["negative"]
              : styles["neutral"]
          }`}
        >
          {formatPnL(overallPnL)}
        </p>
        {profileMetrics && (
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: "#94a3b8",
              fontSize: "0.9rem",
            }}
          >
            <div>Markets Traded: {profileMetrics.num_markets_traded}</div>
            <div>Volume: {profileMetrics.volume.toLocaleString()}</div>
            <div>Open Interest: ${profileMetrics.open_interest}</div>
          </div>
        )}
      </div>

      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3} className={styles["positions-grid"]}>
          {positions.length === 0 ? <p>No open positions.</p> : null}
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
                      {position.position_side === "NO"
                        ? 100 - position.current_price
                        : position.current_price}
                      ¢
                    </span>
                  </div>
                  <div className={styles["detail-row"]}>
                    <span className={styles["detail-label"]}>
                      Purchase Price:
                    </span>
                    <span className={styles["detail-value"]}>
                      {position.position_side === "NO"
                        ? 100 - position.purchase_price
                        : position.purchase_price}
                      ¢
                    </span>
                  </div>

                  <div className={styles["detail-row"]}>
                    <span className={styles["detail-label"]}>P&L:</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
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
                      <div>
                        <span className={styles["detail-label"]}>Fees: </span>
                        <span className={styles["detail-label"]}>
                          ${position.fees_paid / 100}
                        </span>
                      </div>
                    </div>
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
      <p style={{
        textAlign: "center"
      }}>Discrepancies between Kalshi PNL and PNL above are due to group portfolios.</p>

      <Link
        href="https://kalshi.com/ideas/profiles/Turtlecap"
        target="_blank"
        className={styles.resumeLink}
      >
        <div className={styles.resumeCard}>
          <h3>View My Profile</h3>
        </div>
      </Link>
    </div>
  );
};

export default KalshiPositions;
