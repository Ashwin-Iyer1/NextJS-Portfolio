import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleTime, scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { LinearGradient } from '@visx/gradient';
import { AreaClosed, LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { ParentSize } from '@visx/responsive';
import { format, parseISO } from 'date-fns';
import './OuraCharts.css';

// All chart ink is themed in OuraCharts.css via the global design tokens
// (--text-primary, --text-secondary, --border-color, --accent-brand, ...),
// so the charts follow [data-theme] automatically.

// Shared chart geometry
const CHART_MARGIN = { top: 20, right: 10, bottom: 20, left: 36 };
const TICK_FONT_SIZE = 10;

const bottomTickLabelProps = () => ({
  fontSize: TICK_FONT_SIZE,
  textAnchor: 'middle',
});

const leftTickLabelProps = () => ({
  fontSize: TICK_FONT_SIZE,
  textAnchor: 'end',
  dy: '0.33em',
});

// Compact tick format for large magnitudes (steps, calories)
const compactTick = (v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`);

// Day-of-month tick formats (ISO string domains vs Date domains)
const dayTickISO = (d) => format(parseISO(d), 'dd');
const dayTick = (d) => format(d, 'dd');

// Helper to check if data is valid for charting
const hasValidData = (data) => Array.isArray(data) && data.length > 0;

// Empty State Component
const EmptyState = ({ title }) => (
  <div className="oura-empty">
    <div className="oura-empty-title">{title}</div>
    <div className="oura-empty-note">No data available</div>
  </div>
);

// Shared legend; items: [{ label, seriesClass }]
const Legend = ({ items }) => (
  <div className="oura-legend">
    {items.map((item) => (
      <span key={item.label} className="oura-legend-item">
        <span className={`oura-legend-swatch ${item.seriesClass}`} />
        <span>{item.label}</span>
      </span>
    ))}
  </div>
);

// Helper for dates
const getX = (d) => new Date(d.day);

// --- Base Chart Component ---
const BaseChart = ({ width, height, title, children }) => (
  <div className="oura-chart">
    <div className="oura-chart-title">{title}</div>
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      {children}
    </svg>
  </div>
);

// --- Activity Chart ---
export const ActivityChart = ({ data }) => {
  if (!hasValidData(data)) return <EmptyState title="STEPS" />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;

          const margin = CHART_MARGIN;
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          const getSteps = (d) => d.steps;

          const xScale = scaleBand({
            range: [0, xMax],
            round: true,
            domain: data.map(d => d.day),
            padding: 0.2,
          });

          const yScale = scaleLinear({
            range: [yMax, 0],
            round: true,
            domain: [0, Math.max(...data.map(getSteps), 1000)], // default fallback
          });

          return (
            <BaseChart width={width} height={height} title="STEPS">
              <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />

                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  tickFormat={dayTickISO}
                  tickLabelProps={bottomTickLabelProps}
                />

                <AxisLeft
                  scale={yScale}
                  numTicks={4}
                  tickFormat={compactTick}
                  tickLabelProps={leftTickLabelProps}
                />

                {data.map((d) => {
                  const day = d.day;
                  const barWidth = xScale.bandwidth();
                  const barHeight = yMax - (yScale(getSteps(d)) ?? 0);
                  const barX = xScale(day);
                  const barY = yMax - barHeight;
                  return (
                    <Bar
                      key={`bar-${day}`}
                      className="oura-bar"
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                    />
                  );
                })}
              </Group>
            </BaseChart>
          );
        }}
      </ParentSize>
    </div>
  );
};

// --- Readiness Chart ---
export const ReadinessChart = ({ data }) => {
  if (!hasValidData(data)) return <EmptyState title="READINESS" />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;

          const margin = CHART_MARGIN;
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          const getScore = (d) => d.score;

          const xScale = scaleTime({
            range: [0, xMax],
            domain: [Math.min(...data.map(d => getX(d).getTime())), Math.max(...data.map(d => getX(d).getTime()))],
          });

          const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [40, 100],
          });

          return (
            <BaseChart width={width} height={height} title="READINESS">
              <Group left={margin.left} top={margin.top}>
                <LinearGradient id="readiness-gradient" from="#888888" to="#888888" toOpacity={0} fromOpacity={0.35} />

                <GridRows scale={yScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />

                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={5}
                  tickFormat={dayTick}
                  tickLabelProps={bottomTickLabelProps}
                />

                <AxisLeft
                  scale={yScale}
                  numTicks={4}
                  tickLabelProps={leftTickLabelProps}
                />

                <AreaClosed
                  data={data}
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getScore(d) || 0) ?? 0}
                  yScale={yScale}
                  strokeWidth={0}
                  fill="url(#readiness-gradient)"
                  curve={curveMonotoneX}
                />

                <LinePath
                  data={data}
                  className="oura-line"
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getScore(d) || 0) ?? 0}
                  strokeWidth={2}
                  curve={curveMonotoneX}
                />

                {data.map((d, i) => (
                  <circle
                    key={i}
                    className="oura-dot"
                    cx={xScale(getX(d))}
                    cy={yScale(getScore(d) || 0)}
                    r={1.5}
                    strokeWidth={1}
                  />
                ))}
              </Group>
            </BaseChart>
          );
        }}
      </ParentSize>
    </div>
  );
};

// --- Sleep Chart (Grouped Bar) ---
export const SleepChart = ({ data }) => {
  if (!hasValidData(data)) return <EmptyState title="SLEEP CONTRIBUTORS" />;

  // Each contributor is an independent score [1-100]; identity is carried by a
  // fixed-order monochrome lightness ramp plus position within each group.
  const contributors = [
    { key: 'deep_sleep', label: 'Deep', seriesClass: 'oura-seq-1' },
    { key: 'rem_sleep', label: 'REM', seriesClass: 'oura-seq-2' },
    { key: 'efficiency', label: 'Eff', seriesClass: 'oura-seq-3' },
    { key: 'latency', label: 'Lat', seriesClass: 'oura-seq-4' },
    { key: 'restfulness', label: 'Rest', seriesClass: 'oura-seq-5' },
    { key: 'timing', label: 'Time', seriesClass: 'oura-seq-6' },
    { key: 'total_sleep', label: 'Total', seriesClass: 'oura-seq-7' }
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Legend items={contributors} />

      <div style={{ flex: 1, minHeight: 0 }}>
        <ParentSize>
          {({ width, height }) => {
            if (width < 10 || height < 10) return null;

            const margin = { ...CHART_MARGIN, top: 10 };
            const xMax = width - margin.left - margin.right;
            const yMax = height - margin.top - margin.bottom;

            const getVal = (d, key) => d.contributors ? (d.contributors[key] || 0) : 0;

            // Outer scale for days
            const xScale = scaleBand({
              range: [0, xMax],
              round: true,
              domain: data.map(d => d.day),
              padding: 0.1,
            });

            // Inner scale for contributors within each day
            const xInnerScale = scaleBand({
              range: [0, xScale.bandwidth()],
              domain: contributors.map(c => c.key),
              padding: 0.05,
            });

            // Y scale: each contributor is 0-100
            const yScale = scaleLinear({
              range: [yMax, 0],
              domain: [0, 100],
            });

            return (
              <BaseChart width={width} height={height} title="SLEEP CONTRIBUTORS">
                <Group left={margin.left} top={margin.top}>
                  <GridRows scale={yScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />

                  <AxisBottom
                    top={yMax}
                    scale={xScale}
                    tickFormat={dayTickISO}
                    tickLabelProps={bottomTickLabelProps}
                  />

                  <AxisLeft
                    scale={yScale}
                    numTicks={4}
                    tickLabelProps={leftTickLabelProps}
                  />

                  {/* Grouped bars for each day */}
                  {data.map((d) => {
                    const day = d.day;
                    const groupX = xScale(day);

                    return (
                      <Group key={`group-${day}`} left={groupX}>
                        {contributors.map((c) => {
                          const value = getVal(d, c.key);
                          const barWidth = xInnerScale.bandwidth();
                          const barHeight = yMax - yScale(value);
                          const barX = xInnerScale(c.key);
                          const barY = yMax - barHeight;

                          return (
                            <Bar
                              key={`bar-${day}-${c.key}`}
                              className={c.seriesClass}
                              x={barX}
                              y={barY}
                              width={barWidth}
                              height={barHeight}
                            />
                          );
                        })}
                      </Group>
                    );
                  })}

                </Group>
              </BaseChart>
            );
          }}
        </ParentSize>
      </div>
    </div>
  );
};

// --- Stress Chart (Stacked: Recovery bottom, Stress top) ---
export const StressChart = ({ data }) => {
  if (!hasValidData(data)) return <EmptyState title="STRESS & RECOVERY" />;

  // Stack order: recovery on bottom (quiet gray), stress on top (semantic danger)
  const stackItems = [
    { key: 'recovery_high', label: 'Recovery', seriesClass: 'oura-bar' },
    { key: 'stress_high', label: 'Stress', seriesClass: 'oura-fill-danger' }
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Legend items={stackItems} />

      <div style={{ flex: 1, minHeight: 0 }}>
        <ParentSize>
          {({ width, height }) => {
            if (width < 10 || height < 10) return null;

            const margin = { ...CHART_MARGIN, top: 10 };
            const xMax = width - margin.left - margin.right;
            const yMax = height - margin.top - margin.bottom;

            const getVal = (d, key) => d[key] || 0;

            const xScale = scaleBand({
              range: [0, xMax],
              round: true,
              domain: data.map(d => d.day),
              padding: 0.2,
            });

            // Max is the sum of both metrics for any single day
            const maxVal = Math.max(
              ...data.map(d => getVal(d, 'stress_high') + getVal(d, 'recovery_high')),
              60
            );

            const yScale = scaleLinear({
              range: [yMax, 0],
              round: true,
              domain: [0, maxVal],
            });

            return (
              <BaseChart width={width} height={height} title="STRESS & RECOVERY">
                <Group left={margin.left} top={margin.top}>
                  <GridRows scale={yScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />
                  <AxisBottom
                    top={yMax}
                    scale={xScale}
                    tickFormat={dayTickISO}
                    tickLabelProps={bottomTickLabelProps}
                  />
                  <AxisLeft
                    scale={yScale}
                    numTicks={4}
                    tickFormat={(v) => `${Math.round(v / 60)}m`}
                    tickLabelProps={leftTickLabelProps}
                  />

                  {/* Stacked bars: recovery on bottom, stress on top */}
                  {data.map((d) => {
                    const day = d.day;
                    const barX = xScale(day);
                    const barWidth = xScale.bandwidth();

                    const recoveryVal = getVal(d, 'recovery_high');
                    const stressVal = getVal(d, 'stress_high');

                    // Recovery bar (bottom segment)
                    const recoveryBarHeight = yMax - yScale(recoveryVal);
                    const recoveryBarY = yMax - recoveryBarHeight;

                    // Stress bar (top segment, stacked above recovery)
                    const stressBarHeight = yMax - yScale(stressVal);
                    const stressBarY = recoveryBarY - stressBarHeight;

                    return (
                      <Group key={`stack-${day}`}>
                        {/* Recovery (bottom) */}
                        <Bar
                          className="oura-bar"
                          x={barX}
                          y={recoveryBarY}
                          width={barWidth}
                          height={recoveryBarHeight}
                        />
                        {/* Stress (top) */}
                        <Bar
                          className="oura-fill-danger"
                          x={barX}
                          y={stressBarY}
                          width={barWidth}
                          height={stressBarHeight}
                        />
                      </Group>
                    );
                  })}
                </Group>
              </BaseChart>
            );
          }}
        </ParentSize>
      </div>
    </div>
  );
};

// --- SpO2 Chart ---
export const SpO2Chart = ({ data }) => {
  if (!hasValidData(data)) return <EmptyState title="SpO2 %" />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;

          const margin = CHART_MARGIN;
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          const getValue = (d) => d.spo2_percentage?.average || 0;

          const xScale = scaleTime({
            range: [0, xMax],
            domain: [Math.min(...data.map(d => getX(d).getTime())), Math.max(...data.map(d => getX(d).getTime()))],
          });

          const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [90, 100],
          });

          return (
            <BaseChart width={width} height={height} title="SpO2 %">
              <Group left={margin.left} top={margin.top}>
                <LinearGradient id="spo2-gradient" from="#888888" to="#888888" toOpacity={0} fromOpacity={0.35} />
                <GridRows scale={yScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />

                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={5}
                  tickFormat={dayTick}
                  tickLabelProps={bottomTickLabelProps}
                />

                <AxisLeft
                  scale={yScale}
                  numTicks={4}
                  tickLabelProps={leftTickLabelProps}
                />

                <AreaClosed
                  data={data}
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getValue(d)) ?? 0}
                  yScale={yScale}
                  strokeWidth={0}
                  fill="url(#spo2-gradient)"
                  curve={curveMonotoneX}
                />

                <LinePath
                  data={data}
                  className="oura-line"
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getValue(d)) ?? 0}
                  strokeWidth={1}
                  curve={curveMonotoneX}
                />

                {data.map((d, i) => (
                  <circle
                    key={i}
                    className="oura-dot"
                    cx={xScale(getX(d))}
                    cy={yScale(getValue(d))}
                    r={1.5}
                    strokeWidth={1}
                  />
                ))}
              </Group>
            </BaseChart>
          );
        }}
      </ParentSize>
    </div>
  );
};

// --- Heart Rate Chart ---
export const HeartRateChart = ({ data, xDomain }) => {
  if (!hasValidData(data)) return <EmptyState title="HEART RATE" />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;

          const margin = CHART_MARGIN;
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          const getBpm = (d) => d.bpm;
          const getDate = (d) => parseISO(d.timestamp);

          const xScale = scaleTime({
            range: [0, xMax],
            domain: xDomain || [Math.min(...data.map(d => getDate(d).getTime())) || 0, Math.max(...data.map(d => getDate(d).getTime())) || 0],
          });

          // Ensure domain is safe
          const minBpm = Math.min(...data.map(getBpm));
          const maxBpm = Math.max(...data.map(getBpm));

          const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [minBpm * 0.9 || 0, maxBpm * 1.1 || 100],
          });

          return (
            <BaseChart width={width} height={height} title="HEART RATE">
              <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />
                <GridColumns scale={xScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />

                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={8}
                  tickFormat={(d) => format(d, 'HH:mm')}
                  tickLabelProps={bottomTickLabelProps}
                />

                <AxisLeft
                  scale={yScale}
                  numTicks={4}
                  tickLabelProps={leftTickLabelProps}
                />

                {/* The widget's single brass accent: the live heart-rate trace */}
                <LinePath
                  data={data}
                  className="oura-line oura-line--accent"
                  x={d => xScale(getDate(d)) ?? 0}
                  y={d => yScale(getBpm(d)) ?? 0}
                  strokeWidth={1}
                  curve={curveMonotoneX}
                />
              </Group>
            </BaseChart>
          );
        }}
      </ParentSize>
    </div>
  );
};

// --- Workout Chart ---
export const WorkoutChart = ({ data }) => {
  if (!hasValidData(data)) return <EmptyState title="WORKOUT CALS" />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;

          const margin = CHART_MARGIN;
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          const getCalories = (d) => d.calories;

          const xScale = scaleBand({
            range: [0, xMax],
            round: true,
            domain: data.map(d => d.day),
            padding: 0.2,
          });

          const yScale = scaleLinear({
            range: [yMax, 0],
            round: true,
            domain: [0, Math.max(...data.map(getCalories), 100)],
          });

          return (
            <BaseChart width={width} height={height} title="WORKOUT CALS">
              <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />

                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  tickFormat={dayTickISO}
                  tickLabelProps={bottomTickLabelProps}
                />

                <AxisLeft
                  scale={yScale}
                  numTicks={4}
                  tickFormat={compactTick}
                  tickLabelProps={leftTickLabelProps}
                />

                {data.map((d) => {
                  const day = d.day;
                  const barWidth = xScale.bandwidth();
                  const barHeight = yMax - (yScale(getCalories(d)) ?? 0);
                  const barX = xScale(day);
                  const barY = yMax - barHeight;
                  return (
                    <Bar
                      key={`bar-${day}`}
                      className="oura-bar"
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                    />
                  );
                })}
              </Group>
            </BaseChart>
          );
        }}
      </ParentSize>
    </div>
  );
};

// --- Resilience Chart ---
export const ResilienceChart = ({ data }) => {
  if (!hasValidData(data)) return <EmptyState title="RESILIENCE" />;

  const lineSeries = [
    { label: 'Sleep recovery', seriesClass: 'oura-swatch-ink' },
    { label: 'Stress', seriesClass: 'oura-swatch-danger' }
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Legend items={lineSeries} />

      <div style={{ flex: 1, minHeight: 0 }}>
        <ParentSize>
          {({ width, height }) => {
            if (width < 10 || height < 10) return null;

            const margin = { ...CHART_MARGIN, top: 10 };
            const xMax = width - margin.left - margin.right;
            const yMax = height - margin.top - margin.bottom;

            const getContributor = (d, key) => d.contributors ? d.contributors[key] : 0;

            const xScale = scaleTime({
              range: [0, xMax],
              domain: [Math.min(...data.map(d => getX(d).getTime())), Math.max(...data.map(d => getX(d).getTime()))],
            });

            const yScale = scaleLinear({
              range: [yMax, 0],
              domain: [0, 100],
            });

            return (
              <BaseChart width={width} height={height} title="RESILIENCE">
                <Group left={margin.left} top={margin.top}>
                  <GridRows scale={yScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />

                  <AxisBottom
                    top={yMax}
                    scale={xScale}
                    numTicks={5}
                    tickFormat={dayTick}
                    tickLabelProps={bottomTickLabelProps}
                  />

                  <AxisLeft
                    scale={yScale}
                    numTicks={4}
                    tickLabelProps={leftTickLabelProps}
                  />

                  <LinePath
                    data={data}
                    className="oura-line"
                    x={d => xScale(getX(d)) ?? 0}
                    y={d => yScale(getContributor(d, 'sleep_recovery')) ?? 0}
                    strokeWidth={1}
                    curve={curveMonotoneX}
                  />
                  <LinePath
                    data={data}
                    className="oura-line oura-line--danger"
                    x={d => xScale(getX(d)) ?? 0}
                    y={d => yScale(getContributor(d, 'stress')) ?? 0}
                    strokeWidth={2}
                    curve={curveMonotoneX}
                  />
                </Group>
              </BaseChart>
            );
          }}
        </ParentSize>
      </div>
    </div>
  );
};


// --- Cardiovascular Age Chart ---
export const CardioAgeChart = ({ data }) => {
  if (!hasValidData(data)) return <EmptyState title="VASCULAR AGE" />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;

          const margin = CHART_MARGIN;
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          const getAge = (d) => d.vascular_age || 0;

          const xScale = scaleTime({
            range: [0, xMax],
            domain: [Math.min(...data.map(d => getX(d).getTime())), Math.max(...data.map(d => getX(d).getTime()))],
          });

          // Dynamic domain for age. Filter > 0 because sometimes it returns 0 or null.
          const ages = data.map(getAge).filter(a => a > 0);
          const minAge = ages.length ? Math.min(...ages) : 20;
          const maxAge = ages.length ? Math.max(...ages) : 50;

          const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [minAge - 5, maxAge + 5],
          });

          return (
            <BaseChart width={width} height={height} title="VASCULAR AGE">
              <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />

                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={5}
                  tickFormat={dayTick}
                  tickLabelProps={bottomTickLabelProps}
                />

                <AxisLeft
                  scale={yScale}
                  numTicks={4}
                  tickLabelProps={leftTickLabelProps}
                />

                <LinePath
                  data={data}
                  className="oura-line"
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getAge(d)) ?? 0}
                  strokeWidth={1}
                  curve={curveMonotoneX}
                />

                {data.map((d, i) => (
                  <circle
                    key={i}
                    className="oura-dot"
                    cx={xScale(getX(d))}
                    cy={yScale(getAge(d))}
                    r={1.5}
                    strokeWidth={1}
                  />
                ))}
              </Group>
            </BaseChart>
          );
        }}
      </ParentSize>
    </div>
  );
};

// --- VO2 Max Chart ---
export const VO2MaxChart = ({ data }) => {
  if (!hasValidData(data)) return <EmptyState title="VO2 MAX" />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;

          const margin = CHART_MARGIN;
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          const getValue = (d) => d.vo2_max;

          const xScale = scaleTime({
            range: [0, xMax],
            domain: [Math.min(...data.map(d => getX(d).getTime())), Math.max(...data.map(d => getX(d).getTime()))],
          });

          const values = data.map(getValue);
          const minVal = values.length ? Math.min(...values) : 30;
          const maxVal = values.length ? Math.max(...values) : 50;

          const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [minVal - 5, maxVal + 5],
          });

          return (
            <BaseChart width={width} height={height} title="VO2 MAX">
              <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />

                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={5}
                  tickFormat={dayTick}
                  tickLabelProps={bottomTickLabelProps}
                />

                <AxisLeft
                  scale={yScale}
                  numTicks={4}
                  tickLabelProps={leftTickLabelProps}
                />

                <LinePath
                  data={data}
                  className="oura-line"
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getValue(d)) ?? 0}
                  strokeWidth={2}
                  curve={curveMonotoneX}
                />

                {data.map((d, i) => (
                  <circle
                    key={i}
                    className="oura-dot"
                    cx={xScale(getX(d))}
                    cy={yScale(getValue(d))}
                    r={2}
                    strokeWidth={1}
                  />
                ))}
              </Group>
            </BaseChart>
          );
        }}
      </ParentSize>
    </div>
  );
};

// --- Sleep Detail Chart (Stacked Durations) ---
export const SleepDetailChart = ({ data }) => {
  if (!hasValidData(data)) return <EmptyState title="SLEEP PHASES" />;

  // Sleep stages read as a lightness ramp; awake time is the semantic alert.
  const sleepStages = [
    { key: 'deep', label: 'Deep', seriesClass: 'oura-seq-1' },
    { key: 'rem', label: 'REM', seriesClass: 'oura-seq-3' },
    { key: 'light', label: 'Light', seriesClass: 'oura-seq-5' },
    { key: 'awake', label: 'Awake', seriesClass: 'oura-fill-danger' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Legend items={sleepStages} />

      <div style={{ flex: 1, minHeight: 0 }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;

          const margin = CHART_MARGIN;
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          const xScale = scaleBand({
            range: [0, xMax],
            round: true,
            domain: data.map(d => d.day),
            padding: 0.2,
          });

          // Convert seconds to hours for better readability
          // Stack order: Deep, REM, Light, Awake
          const mm = (v) => v / 3600;

          const yScale = scaleLinear({
            range: [yMax, 0],
            round: true,
            domain: [0, Math.max(...data.map(d => mm(d.total_sleep_duration + d.awake_time))) || 28800], // Default 8h if 0
          });

          return (
            <BaseChart width={width} height={height} title="SLEEP STAGES (HR)">
               <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} strokeDasharray="1 3" strokeWidth={0.5} />

                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  tickFormat={dayTickISO}
                  tickLabelProps={bottomTickLabelProps}
                />
                <AxisLeft
                  scale={yScale}
                  numTicks={4}
                  tickLabelProps={leftTickLabelProps}
                />

                {data.map((d) => {
                  const day = d.day;
                  const x = xScale(day) ?? 0;
                  const w = xScale.bandwidth();

                  // Calculate heights
                  const deep = mm(d.deep_sleep_duration);
                  const rem = mm(d.rem_sleep_duration);
                  const light = mm(d.light_sleep_duration);
                  const awake = mm(d.awake_time);

                  // Stack bottoms
                  const yLines = [
                    { h: deep, seriesClass: 'oura-seq-1' },
                    { h: rem, seriesClass: 'oura-seq-3' },
                    { h: light, seriesClass: 'oura-seq-5' },
                    { h: awake, seriesClass: 'oura-fill-danger' }
                  ];

                  let currentY = yMax;
                  const domainRange = yScale.domain()[1] - yScale.domain()[0];

                  return (
                    <g key={`stack-${day}`}>
                       {yLines.map((item, idx) => {
                         // Safely calculate height percent
                         const ratio = domainRange > 0 ? (item.h / domainRange) : 0;
                         const h = ratio * yMax;

                         // Check for NaN or Infinity
                         if (!Number.isFinite(h) || !Number.isFinite(currentY)) return null;

                         const y = currentY - h;
                         currentY = y;

                         return (
                           <rect key={idx} className={item.seriesClass} x={x} y={y} width={w} height={Math.max(0, h)} />
                         );
                       })}
                    </g>
                  );
                })}

              </Group>
            </BaseChart>
          );
        }}
      </ParentSize>
      </div>
    </div>
  );
};

// --- Info Cards ---

const InfoCardContainer = ({ title, children }) => (
  <div className="oura-info">
    <div className="oura-info-title">{title}</div>
    <div className="oura-info-body">
      {children}
    </div>
  </div>
);

export const PersonalInfoCard = ({ data }) => {
  // The hook returns personal_info as a singleton payload (array or null).
  const info = Array.isArray(data) ? data[0] : data;

  if (!info) return <EmptyState title="PERSONAL INFO" />;

  const rows = [
    { label: 'Age', value: info.age },
    { label: 'Weight', value: info.weight != null ? `${info.weight} kg` : null },
    { label: 'Height', value: info.height != null ? `${info.height} m` : null },
    { label: 'Sex', value: info.biological_sex },
    { label: 'Email', value: info.email },
  ];

  return (
    <InfoCardContainer title="PERSONAL INFO">
      {rows.map((row) => (
        <div key={row.label} className="oura-info-row">
          <span className="oura-info-label">{row.label}</span>
          <span className="oura-info-value">{row.value}</span>
        </div>
      ))}
    </InfoCardContainer>
  );
};

export const SleepTimeCard = ({ data }) => (
  <InfoCardContainer title="SLEEP WINDOWS">
    {data.map((d, i) => (
       <div key={i} className="oura-info-block">
         <div className="oura-info-label">{d.day}</div>
         <div className="oura-info-value" style={{ textAlign: 'left' }}>Status: {d.status}</div>
         {d.optimal_bedtime && (
           <div>
             Offset: {Math.round(d.optimal_bedtime.start_offset / 3600)}h - {Math.round(d.optimal_bedtime.end_offset / 3600)}h
           </div>
         )}
         <div style={{ fontStyle: 'italic' }}>{d.recommendation}</div>
       </div>
    ))}
    {data.length === 0 && <div className="oura-empty-note">No data</div>}
  </InfoCardContainer>
);

export const RestModeCard = ({ data }) => (
  <InfoCardContainer title="REST MODE">
     {data.map((d, i) => (
       <div key={i} className="oura-info-block">
         <div>{d.start_day} -&gt; {d.end_day || 'Ongoing'}</div>
         {d.episodes.map((ep, k) => (
           <div key={k} style={{ paddingLeft: 4 }}>
             - {ep.tags.join(', ')}
           </div>
         ))}
       </div>
    ))}
    {data.length === 0 && <div className="oura-empty-note">No rest modes active</div>}
  </InfoCardContainer>
);

export const SimpleListCard = ({ data, title, renderItem }) => (
  <InfoCardContainer title={title}>
    {data.map((d, i) => (
      <div key={i} className="oura-info-block">
        {renderItem(d)}
      </div>
    ))}
    {data.length === 0 && <div className="oura-empty-note">No data</div>}
  </InfoCardContainer>
);
