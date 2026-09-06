"use client";

import React, { useState } from "react";
import { usePortfolioOuraData } from "../../hooks/usePortfolioOuraData";
import {
  ActivityChart,
  ReadinessChart,
  SleepChart,
  StressChart,
  SpO2Chart,
  HeartRateChart,
  WorkoutChart,
  ResilienceChart,
  CardioAgeChart,
  SleepDetailChart,
  PersonalInfoCard,
} from "./OuraCharts";
import { format, subDays, parseISO, addDays } from "date-fns";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/material";

// Theming: the dashboard consumes the global design tokens (via classes in
// OuraCharts.css), so it follows the site-wide [data-theme] automatically.

export default function OuraDashboard({
  subset = null,
  columns = { xs: 1, sm: 2, lg: 3 },
  chartHeight = "280px",
  chartWidth = "100%",
  showHeader = true,
  compact = false,
}) {
  const [days, setDays] = useState(14);
  const [refreshKey, setRefreshKey] = useState(0);
  const endDate = format(addDays(new Date(), 1), "yyyy-MM-dd");
  const startDate = format(subDays(new Date(), days - 1), "yyyy-MM-dd");
  const result = usePortfolioOuraData(startDate, endDate, subset, refreshKey);
  const { loading, error } = result;
  const data = result.data || {
    activity: [],
    heart_rate: [],
    sleep: [],
    sleep_documents: [],
    readiness: [],
    daily_stress: [],
    daily_spo2: [],
    daily_resilience: [],
    daily_cardiovascular_age: [],
    workout: [],
    personal_info: null,
  };

  // Canonical stat-tile treatment lives in OuraCharts.css (.oura-tile);
  // only the per-instance dimensions stay inline.
  const tileStyle = (h = chartHeight, w = chartWidth) => ({
    height: h,
    width: w,
  });

  // Filter heart rate for last 24 hours only
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Preserve the timestamp's UTC offset; a fixed shift breaks daylight saving time.
  const heartRateProcessed = data.heart_rate.filter((d) => {
    const timestamp = parseISO(d.timestamp);
    return timestamp >= oneDayAgo && timestamp <= now;
  });

  const hrDomain = [oneDayAgo, now];

  // Define all available widgets with unique keys
  const allWidgets = [
    {
      key: "activity",
      component: (
        <div className="oura-tile" style={tileStyle()}>
          <ActivityChart data={data.activity} />
        </div>
      ),
    },
    {
      key: "heart_rate",
      component: (
        <div className="oura-tile" style={tileStyle()}>
          <HeartRateChart data={heartRateProcessed} xDomain={hrDomain} />
        </div>
      ),
    },
    {
      key: "sleep",
      component: (
        <div className="oura-tile" style={tileStyle()}>
          <SleepChart data={data.sleep} />
        </div>
      ),
    },
    {
      key: "sleep_detail",
      component: (
        <div className="oura-tile" style={tileStyle()}>
          <SleepDetailChart data={data.sleep_documents} />
        </div>
      ),
    },
    {
      key: "readiness",
      component: (
        <div className="oura-tile" style={tileStyle()}>
          <ReadinessChart data={data.readiness} />
        </div>
      ),
    },
    {
      key: "stress",
      component: (
        <div className="oura-tile" style={tileStyle()}>
          <StressChart data={data.daily_stress} />
        </div>
      ),
    },
    {
      key: "spo2",
      component: (
        <div className="oura-tile" style={tileStyle()}>
          <SpO2Chart data={data.daily_spo2} />
        </div>
      ),
    },
    {
      key: "resilience",
      component: (
        <div className="oura-tile" style={tileStyle()}>
          <ResilienceChart data={data.daily_resilience} />
        </div>
      ),
    },
    {
      key: "cardio_age",
      component: (
        <div className="oura-tile" style={tileStyle()}>
          <CardioAgeChart data={data.daily_cardiovascular_age} />
        </div>
      ),
    },
    // { key: 'vo2_max', component: <div className="oura-tile" style={tileStyle()}><VO2MaxChart data={data.vo2_max} /></div> },
    {
      key: "workout",
      component: (
        <div className="oura-tile" style={tileStyle()}>
          <WorkoutChart data={data.workout} />
        </div>
      ),
    },
    // { key: 'sleep_time', component: <div className="oura-tile" style={tileStyle()}><SleepTimeCard data={data.sleep_time} /></div> },
    {
      key: "personal_info",
      component: (
        <div
          className="oura-tile"
          style={tileStyle(null, compact ? "100%" : "350px")}
        >
          <PersonalInfoCard data={data.personal_info} />
        </div>
      ),
    },
    // { key: 'rest_mode', component: <div className="oura-tile" style={tileStyle()}><RestModeCard data={data.rest_mode_period} /></div> },
  ];

  const widgetData = {
    activity: data.activity,
    heart_rate: heartRateProcessed,
    sleep: data.sleep,
    sleep_detail: data.sleep_documents,
    readiness: data.readiness,
    stress: data.daily_stress,
    spo2: data.daily_spo2,
    resilience: data.daily_resilience,
    cardio_age: data.daily_cardiovascular_age,
    workout: data.workout,
    personal_info: data.personal_info,
  };
  const visibleWidgets = (
    subset ? allWidgets.filter((w) => subset.includes(w.key)) : allWidgets
  ).map((widget) => {
    const values = widgetData[widget.key];
    const hasData = Array.isArray(values) ? values.length > 0 : Boolean(values);
    return hasData
      ? widget
      : {
          ...widget,
          component: (
            <div className="oura-tile oura-empty" style={tileStyle()}>
              <h3>
                {{
                  activity: "Activity",
                  heart_rate: "Heart rate",
                  sleep_detail: "Sleep details",
                  stress: "Stress & recovery",
                  spo2: "Blood oxygen",
                  cardio_age: "Cardio age",
                  personal_info: "Profile",
                }[widget.key] || widget.key.replaceAll("_", " ")}
              </h3>
              <p>
                {widget.key === "heart_rate"
                  ? "No readings in the last 24 hours."
                  : "No readings in this date range."}
              </p>
            </div>
          ),
        };
  });

  return (
    <div
      className={`oura-dashboard${compact ? " oura-dashboard--compact" : ""}`}
    >
      {showHeader && (
        <div className="oura-header">
          <h2 className="oura-header-title">Oura Stats</h2>
          <div className="oura-header-range">
            {loading
              ? "Loading date range…"
              : `${format(parseISO(startDate), "MMM d")} – ${format(subDays(parseISO(endDate), 1), "MMM d, yyyy")}`}
          </div>
        </div>
      )}

      <div className="oura-controls">
        <div role="group" aria-label="Oura date range">
          {[7, 14, 30].map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={days === value}
              onClick={() => setDays(value)}
            >
              {value} days
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setRefreshKey((key) => key + 1)}
          disabled={loading}
          aria-label="Refresh Oura data"
        >
          Refresh
        </button>
      </div>
      <p className="oura-data-note">
        Heart rate shows the last 24 hours. Other charts follow the selected
        range.
      </p>
      {loading ? (
        <div className="oura-status" role="status">
          Loading Oura data…
        </div>
      ) : error ? (
        <div className="oura-status oura-status--error" role="status">
          <p>{error}</p>
          <button
            type="button"
            className="button-secondary"
            onClick={() => setRefreshKey((key) => key + 1)}
          >
            Try again
          </button>
        </div>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Masonry columns={columns} spacing={3}>
            {visibleWidgets.map((widget) => (
              <div key={widget.key}>{widget.component}</div>
            ))}
          </Masonry>
        </Box>
      )}
    </div>
  );
}
