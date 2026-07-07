"use client";

import React, { useState } from 'react';
import { usePortfolioOuraData } from '../../hooks/usePortfolioOuraData';
import {
  ActivityChart, ReadinessChart, SleepChart, StressChart, SpO2Chart,
  HeartRateChart, WorkoutChart, ResilienceChart, CardioAgeChart,
  SleepDetailChart, PersonalInfoCard
} from './OuraCharts';
import { format, subDays, parseISO, addDays, subHours } from 'date-fns';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';

// Theming: the dashboard consumes the global design tokens (via classes in
// OuraCharts.css), so it follows the site-wide [data-theme] automatically.

export default function OuraDashboard({
  subset = null,
  columns = { xs: 1, sm: 2, lg: 3 },
  chartHeight = '280px',
  chartWidth = '100%',
  showHeader = true,
  compact = false
}) {
  const [endDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [startDate] = useState(format(subDays(new Date(), 10), 'yyyy-MM-dd'));

  const { data, loading, error } = usePortfolioOuraData(startDate, endDate, subset);

  if (loading) return <div className="oura-status">Loading Oura data&hellip;</div>;
  if (error) return <div className="oura-status oura-status--error">Error: {error}</div>;
  if (!data) return null;

  // Canonical stat-tile treatment lives in OuraCharts.css (.oura-tile);
  // only the per-instance dimensions stay inline.
  const tileStyle = (h = chartHeight, w = chartWidth) => ({
    height: h,
    width: w
  });

  // Filter heart rate for last 24 hours only
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Process data: Strip 'Z' to treat as local time, and filter
  const heartRateProcessed = data.heart_rate
    .map(d => {
      // Parse timestamp, strip Z if needed (but date-fns handles ISO usually)
      // We manually shift by -4 hours here
      const raw = d.timestamp.endsWith('Z') ? d.timestamp.slice(0, -1) : d.timestamp;
      const t = parseISO(raw);
      const shifted = subHours(t, 4);
      return { ...d, timestamp: shifted.toISOString() };
    })
    .filter(d => {
      const t = parseISO(d.timestamp);
      return t >= oneDayAgo;
    });

  // Determine domain end (max of currently "now" or the latest data point)
  // This handles cases where Oura data might be slightly ahead or clock skew
  const maxDate = heartRateProcessed.length > 0
    ? new Date(Math.max(now.getTime(), parseISO(heartRateProcessed[heartRateProcessed.length - 1].timestamp).getTime()))
    : now;

  const hrDomain = [oneDayAgo, maxDate];

  // Define all available widgets with unique keys
  const allWidgets = [
    { key: 'activity', component: <div className="oura-tile" style={tileStyle()}><ActivityChart data={data.activity} /></div> },
    { key: 'heart_rate', component: <div className="oura-tile" style={tileStyle()}><HeartRateChart data={heartRateProcessed} xDomain={hrDomain} /></div> },
    { key: 'sleep', component: <div className="oura-tile" style={tileStyle()}><SleepChart data={data.sleep} /></div> },
    { key: 'sleep_detail', component: <div className="oura-tile" style={tileStyle()}><SleepDetailChart data={data.sleep_documents} /></div> },
    { key: 'readiness', component: <div className="oura-tile" style={tileStyle()}><ReadinessChart data={data.readiness} /></div> },
    { key: 'stress', component: <div className="oura-tile" style={tileStyle()}><StressChart data={data.daily_stress} /></div> },
    { key: 'spo2', component: <div className="oura-tile" style={tileStyle()}><SpO2Chart data={data.daily_spo2} /></div> },
    { key: 'resilience', component: <div className="oura-tile" style={tileStyle()}><ResilienceChart data={data.daily_resilience} /></div> },
    { key: 'cardio_age', component: <div className="oura-tile" style={tileStyle()}><CardioAgeChart data={data.daily_cardiovascular_age} /></div> },
    // { key: 'vo2_max', component: <div className="oura-tile" style={tileStyle()}><VO2MaxChart data={data.vo2_max} /></div> },
    { key: 'workout', component: <div className="oura-tile" style={tileStyle()}><WorkoutChart data={data.workout} /></div> },
    // { key: 'sleep_time', component: <div className="oura-tile" style={tileStyle()}><SleepTimeCard data={data.sleep_time} /></div> },
    { key: 'personal_info', component: <div className="oura-tile" style={tileStyle(null, compact ? '100%' : '350px')}><PersonalInfoCard data={data.personal_info} /></div> },
    // { key: 'rest_mode', component: <div className="oura-tile" style={tileStyle()}><RestModeCard data={data.rest_mode_period} /></div> },
  ];

  // Filter widgets if subset is provided
  const visibleWidgets = subset
    ? allWidgets.filter(w => subset.includes(w.key))
    : allWidgets;

  return (
    <div className={`oura-dashboard${compact ? ' oura-dashboard--compact' : ''}`}>
      {showHeader && (
        <div className="oura-header">
          <h2 className="oura-header-title">Oura Stats</h2>
          <div className="oura-header-range">
            {startDate} <span>to</span> {endDate}
          </div>
        </div>
      )}

      <Box sx={{ width: '100%' }}>
        <Masonry columns={columns} spacing={3}>
          {visibleWidgets.map((widget) => (
            <div key={widget.key}>
              {widget.component}
            </div>
          ))}
        </Masonry>
      </Box>
    </div>
  );
}
