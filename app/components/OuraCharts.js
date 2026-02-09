import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleTime, scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
// ... (keep lines 7-683 same or rely on smart replace)
// Actually I'll just do separate replacements for safety.

import { LinearGradient } from '@visx/gradient';
import { AreaClosed, LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { ParentSize } from '@visx/responsive';
import { format, parseISO } from 'date-fns';
import './OuraCharts.css';

const getTheme = (darkMode) => ({
  background: darkMode ? '#050505' : '#ffffff',
  text: darkMode ? '#e0e0e0' : '#000000',
  grid: darkMode ? '#222222' : '#e0e0e0',
  tooltipBg: darkMode ? '#111111' : '#ffffff',
  tooltipBg: darkMode ? '#111111' : '#ffffff',
  tooltipColor: darkMode ? '#c596ee' : '#000000',
  tooltipBorder: darkMode ? '#333333' : '#cccccc',
  bar: darkMode ? '#c596ee' : '#000000',
  line: darkMode ? '#c596ee' : '#000000',
  areaGradientFrom: darkMode ? '#8a2ce2' : '#000000',
  areaGradientTo: darkMode ? '#c596ee' : '#ffffff',
  accent: darkMode ? '#ff0844' : '#ff0000', // For critical alerts or high stress
  recovery: darkMode ? '#00f260' : '#00aa44', // Green for recovery
});

// Helper to check if data is valid for charting
const hasValidData = (data) => Array.isArray(data) && data.length > 0;

// Empty State Component
const EmptyState = ({ title, darkMode }) => {
  const theme = getTheme(darkMode);
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '150px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
      color: theme.text,
      fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif',
    }}>
      <div style={{ 
        textTransform: 'uppercase', 
        fontSize: '12px', 
        letterSpacing: '2px', 
        fontWeight: 'bold',
        opacity: 0.8,
        marginBottom: '12px'
      }}>
        {title}
      </div>
      <div style={{ 
        fontSize: '11px', 
        opacity: 0.5,
        textAlign: 'center',
        padding: '0 20px'
      }}>
        No data available
      </div>
    </div>
  );
};

// Helper for dates
const getX = (d) => new Date(d.day);

// --- Base Chart Component ---
const BaseChart = ({ width, height, darkMode, title, children }) => {
  const theme = getTheme(darkMode);
  
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
      <div style={{ 
        position: 'absolute',
        top: 4,
        left: 8,
        color: theme.text,
        fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif',
        textTransform: 'uppercase',
        fontSize: '12px',
        letterSpacing: '2px',
        fontWeight: 'bold',
        opacity: 0.8,
        textShadow: darkMode ? '0 0 5px rgba(197, 150, 238, 0.5)' : 'none',
        zIndex: 10
      }}>
        {title}
      </div>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <rect width="100%" height="100%" fill={theme.background} />
        {children}
      </svg>
    </div>
  );
};

// --- Activity Chart ---
export const ActivityChart = ({ data, darkMode = false }) => {
  const theme = getTheme(darkMode);
  
  if (!hasValidData(data)) return <EmptyState title="STEPS" darkMode={darkMode} />;
  
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;
          
          const margin = { top: 20, right: 10, bottom: 20, left: 30 };
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
            <BaseChart width={width} height={height} darkMode={darkMode} title="STEPS">
              <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  tickFormat={(d) => format(parseISO(d), 'dd')}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'middle',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />
                
                <AxisLeft
                  scale={yScale}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  numTicks={4}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'end',
                    dy: '0.33em',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
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
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill={theme.bar}
                      fillOpacity={1}
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
export const ReadinessChart = ({ data, darkMode = false }) => {
  const theme = getTheme(darkMode);

  if (!hasValidData(data)) return <EmptyState title="READINESS" darkMode={darkMode} />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;
          
          const margin = { top: 20, right: 10, bottom: 20, left: 30 };
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
            <BaseChart width={width} height={height} darkMode={darkMode} title="READINESS">
              <Group left={margin.left} top={margin.top}>
                <LinearGradient id="readiness-gradient" from={theme.areaGradientFrom} to={theme.areaGradientTo} toOpacity={0} fromOpacity={0.5} />
                
                <GridRows scale={yScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={5}
                  tickFormat={(d) => format(d, 'dd')}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'middle',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />
                
                <AxisLeft
                  scale={yScale}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  numTicks={4}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'end',
                    dy: '0.33em',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
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
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getScore(d) || 0) ?? 0}
                  stroke={theme.line}
                  strokeWidth={2} 
                  curve={curveMonotoneX}
                />
                
                {data.map((d, i) => (
                  <circle
                    key={i}
                    cx={xScale(getX(d))}
                    cy={yScale(getScore(d) || 0)}
                    r={1.5}
                    fill={theme.background}
                    stroke={theme.line}
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
export const SleepChart = ({ data, darkMode = false }) => {
  const theme = getTheme(darkMode);
  
  if (!hasValidData(data)) return <EmptyState title="SLEEP CONTRIBUTORS" darkMode={darkMode} />;
  
  // Define colors for each contributor - each is an independent score [1-100]
  const contributors = [
    { key: 'deep_sleep', label: 'Deep', color: '#4facfe' },      // Blue
    { key: 'rem_sleep', label: 'REM', color: '#c596ee' },        // Purple
    { key: 'efficiency', label: 'Eff', color: '#00f260' },       // Green
    { key: 'latency', label: 'Lat', color: '#fdbb2d' },          // Orange
    { key: 'restfulness', label: 'Rest', color: '#ff0844' },     // Red
    { key: 'timing', label: 'Time', color: '#16d9e3' },          // Cyan
    { key: 'total_sleep', label: 'Total', color: '#b21f1f' }     // Dark Red
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
       {/* Legend */}
       <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '8px', 
          padding: '4px 8px 0',
          fontSize: '9px',
          fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
        }}>
          {contributors.map(c => (
            <div key={c.key} style={{ display: 'flex', alignItems: 'center', color: theme.text }}>
              <div style={{ width: 6, height: 6, borderRadius: '2px', backgroundColor: c.color, marginRight: 3 }} />
              <span style={{ opacity: 0.8 }}>{c.label}</span>
            </div>
          ))}
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <ParentSize>
          {({ width, height }) => {
            if (width < 10 || height < 10) return null;
            
            const margin = { top: 10, right: 10, bottom: 20, left: 30 };
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
              <BaseChart width={width} height={height} darkMode={darkMode} title="SLEEP CONTRIBUTORS">
                <Group left={margin.left} top={margin.top}>
                  <GridRows scale={yScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                  
                  <AxisBottom
                    top={yMax}
                    scale={xScale}
                    tickFormat={(d) => format(parseISO(d), 'dd')}
                    stroke={theme.text}
                    tickStroke={theme.text}
                    tickLabelProps={() => ({
                      fill: theme.text,
                      fontSize: 8,
                      textAnchor: 'middle',
                      fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                    })}
                  />
                  
                  <AxisLeft
                    scale={yScale}
                    stroke={theme.text}
                    tickStroke={theme.text}
                    numTicks={4}
                    tickLabelProps={() => ({
                      fill: theme.text,
                      fontSize: 8,
                      textAnchor: 'end',
                      dy: '0.33em',
                      fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                    })}
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
                              x={barX}
                              y={barY}
                              width={barWidth}
                              height={barHeight}
                              fill={c.color}
                              fillOpacity={0.85}
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

// --- Stress Chart (Grouped: Stress vs Recovery) ---
export const StressChart = ({ data, darkMode = false }) => {
  const theme = getTheme(darkMode);
  
  if (!hasValidData(data)) return <EmptyState title="STRESS & RECOVERY" darkMode={darkMode} />;
  
  // Define the two metrics to show
  const metrics = [
    { key: 'stress_high', label: 'Stress', color: theme.accent },
    { key: 'recovery_high', label: 'Recovery', color: theme.recovery }
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Legend */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '16px', 
        padding: '4px 8px 0',
        fontSize: '9px',
        fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
      }}>
        {metrics.map(m => (
          <div key={m.key} style={{ display: 'flex', alignItems: 'center', color: theme.text }}>
            <div style={{ width: 8, height: 8, borderRadius: '2px', backgroundColor: m.color, marginRight: 4 }} />
            <span style={{ opacity: 0.8 }}>{m.label}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <ParentSize>
          {({ width, height }) => {
            if (width < 10 || height < 10) return null;
            
            const margin = { top: 10, right: 10, bottom: 20, left: 35 };
            const xMax = width - margin.left - margin.right;
            const yMax = height - margin.top - margin.bottom;

            const getVal = (d, key) => d[key] || 0;
            
            // Outer scale for days
            const xScale = scaleBand({
              range: [0, xMax],
              round: true,
              domain: data.map(d => d.day),
              padding: 0.15,
            });
            
            // Inner scale for the two metrics
            const xInnerScale = scaleBand({
              range: [0, xScale.bandwidth()],
              domain: metrics.map(m => m.key),
              padding: 0.1,
            });
            
            // Find max across both metrics
            const maxVal = Math.max(
              ...data.map(d => Math.max(getVal(d, 'stress_high'), getVal(d, 'recovery_high'))),
              60
            );
            
            const yScale = scaleLinear({
              range: [yMax, 0],
              round: true,
              domain: [0, maxVal],
            });

            return (
              <BaseChart width={width} height={height} darkMode={darkMode} title="STRESS & RECOVERY">
                <Group left={margin.left} top={margin.top}>
                  <GridRows scale={yScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                  <AxisBottom
                    top={yMax}
                    scale={xScale}
                    tickFormat={(d) => format(parseISO(d), 'dd')}
                    stroke={theme.text}
                    tickStroke={theme.text}
                    tickLabelProps={() => ({
                      fill: theme.text,
                      fontSize: 8,
                      textAnchor: 'middle',
                      fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                    })}
                  />
                  <AxisLeft
                    scale={yScale}
                    stroke={theme.text}
                    tickStroke={theme.text}
                    numTicks={4}
                    tickFormat={(v) => `${Math.round(v / 60)}m`}
                    tickLabelProps={() => ({
                      fill: theme.text,
                      fontSize: 8,
                      textAnchor: 'end',
                      dy: '0.33em',
                      fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                    })}
                  />
                  
                  {/* Grouped bars for each day */}
                  {data.map((d) => {
                    const day = d.day;
                    const groupX = xScale(day);
                    
                    return (
                      <Group key={`group-${day}`} left={groupX}>
                        {metrics.map((m) => {
                          const value = getVal(d, m.key);
                          const barWidth = xInnerScale.bandwidth();
                          const barHeight = yMax - yScale(value);
                          const barX = xInnerScale(m.key);
                          const barY = yMax - barHeight;
                          
                          return (
                            <Bar
                              key={`bar-${day}-${m.key}`}
                              x={barX}
                              y={barY}
                              width={barWidth}
                              height={barHeight}
                              fill={m.color}
                              fillOpacity={0.85}
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

// --- SpO2 Chart ---
export const SpO2Chart = ({ data, darkMode = false }) => {
  const theme = getTheme(darkMode);

  if (!hasValidData(data)) return <EmptyState title="SpO2 %" darkMode={darkMode} />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;
          
          const margin = { top: 20, right: 10, bottom: 20, left: 30 };
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
            <BaseChart width={width} height={height} darkMode={darkMode} title="SpO2 %">
              <Group left={margin.left} top={margin.top}>
                <LinearGradient id="spo2-gradient" from={theme.areaGradientFrom} to={theme.areaGradientTo} toOpacity={0} fromOpacity={0.5} />
                <GridRows scale={yScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={5}
                  tickFormat={(d) => format(d, 'dd')}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'middle',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />
                
                <AxisLeft
                  scale={yScale}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  numTicks={4}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'end',
                    dy: '0.33em',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
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
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getValue(d)) ?? 0}
                  stroke={theme.line}
                  strokeWidth={1} 
                  curve={curveMonotoneX}
                />
                
                {data.map((d, i) => (
                  <circle
                    key={i}
                    cx={xScale(getX(d))}
                    cy={yScale(getValue(d))}
                    r={1.5}
                    fill={theme.background}
                    stroke={theme.line}
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
export const HeartRateChart = ({ data, darkMode = false, xDomain }) => {
  const theme = getTheme(darkMode);

  if (!hasValidData(data)) return <EmptyState title="HEART RATE" darkMode={darkMode} />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;
          
          const margin = { top: 20, right: 10, bottom: 20, left: 30 };
          const xMax = width - margin.left - margin.right;
          const yMax = height - margin.top - margin.bottom;

          const getBpm = (d) => d.bpm;
          const getDate = (d) => parseISO(d.timestamp);

          const xScale = scaleTime({
            range: [0, xMax],
            domain: xDomain || [Math.min(...data.map(d => getDate(d).getTime() - 1 * 3600000)) || 0, Math.max(...data.map(d => getDate(d).getTime() - 1 * 3600000)) || 0],
          });

          const getX = (d) => getDate(d).getTime() - 1 * 3600000;

          // Ensure domain is safe
          const minBpm = Math.min(...data.map(getBpm));
          const maxBpm = Math.max(...data.map(getBpm));
          
          const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [minBpm * 0.9 || 0, maxBpm * 1.1 || 100],
          });

          return (
            <BaseChart width={width} height={height} darkMode={darkMode} title="HEART RATE">
              <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                <GridColumns scale={xScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={8}
                  tickFormat={(d) => format(d, 'HH:mm')}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'middle',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />
                
                <AxisLeft
                  scale={yScale}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  numTicks={4}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'end',
                    dy: '0.33em',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />

                <LinePath
                  data={data}
                  x={d => xScale(getDate(d)) ?? 0}
                  y={d => yScale(getBpm(d)) ?? 0}
                  stroke={theme.line}
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
export const WorkoutChart = ({ data, darkMode = false }) => {
  const theme = getTheme(darkMode);
  
  if (!hasValidData(data)) return <EmptyState title="WORKOUT CALS" darkMode={darkMode} />;
  
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;
          
          const margin = { top: 20, right: 10, bottom: 20, left: 30 };
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
            <BaseChart width={width} height={height} darkMode={darkMode} title="WORKOUT CALS">
              <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  tickFormat={(d) => format(parseISO(d), 'dd')}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'middle',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />
                
                <AxisLeft
                  scale={yScale}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  numTicks={4}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'end',
                    dy: '0.33em',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
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
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill={theme.bar}
                      fillOpacity={1}
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
export const ResilienceChart = ({ data, darkMode = false }) => {
  const theme = getTheme(darkMode);

  if (!hasValidData(data)) return <EmptyState title="RESILIENCE" darkMode={darkMode} />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;
          
          const margin = { top: 20, right: 10, bottom: 20, left: 30 };
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
            <BaseChart width={width} height={height} darkMode={darkMode} title="RESILIENCE">
              <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={5}
                  tickFormat={(d) => format(d, 'dd')}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'middle',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />
                
                <AxisLeft
                  scale={yScale}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  numTicks={4}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'end',
                    dy: '0.33em',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />

                <LinePath
                  data={data}
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getContributor(d, 'sleep_recovery')) ?? 0}
                  stroke="#4facfe" // Blue
                  strokeWidth={1} 
                  curve={curveMonotoneX}
                />
                  <LinePath
                  data={data}
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getContributor(d, 'stress')) ?? 0}
                  stroke="#ff0844" // Red
                  strokeWidth={2} 
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


// --- Cardiovascular Age Chart ---
export const CardioAgeChart = ({ data, darkMode = false }) => {
  const theme = getTheme(darkMode);

  if (!hasValidData(data)) return <EmptyState title="VASCULAR AGE" darkMode={darkMode} />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;
          
          const margin = { top: 20, right: 10, bottom: 20, left: 30 };
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
            <BaseChart width={width} height={height} darkMode={darkMode} title="VASCULAR AGE">
              <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={5}
                  tickFormat={(d) => format(d, 'dd')}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'middle',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />
                
                <AxisLeft
                  scale={yScale}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  numTicks={4}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'end',
                    dy: '0.33em',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />

                <LinePath
                  data={data}
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getAge(d)) ?? 0}
                  stroke={theme.line}
                  strokeWidth={1} 
                  curve={curveMonotoneX}
                />
                
                {data.map((d, i) => (
                  <circle
                    key={i}
                    cx={xScale(getX(d))}
                    cy={yScale(getAge(d))}
                    r={1.5}
                    fill={theme.background}
                    stroke={theme.line}
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
export const VO2MaxChart = ({ data, darkMode = false }) => {
  const theme = getTheme(darkMode);

  if (!hasValidData(data)) return <EmptyState title="VO2 MAX" darkMode={darkMode} />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;
          
          const margin = { top: 20, right: 10, bottom: 20, left: 30 };
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
            <BaseChart width={width} height={height} darkMode={darkMode} title="VO2 MAX">
              <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  numTicks={5}
                  tickFormat={(d) => format(d, 'dd')}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'middle',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />
                
                <AxisLeft
                  scale={yScale}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  numTicks={4}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'end',
                    dy: '0.33em',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />

                <LinePath
                  data={data}
                  x={d => xScale(getX(d)) ?? 0}
                  y={d => yScale(getValue(d)) ?? 0}
                  stroke="#ff1493"
                  strokeWidth={2} 
                  curve={curveMonotoneX}
                />
                
                {data.map((d, i) => (
                  <circle
                    key={i}
                    cx={xScale(getX(d))}
                    cy={yScale(getValue(d))}
                    r={2}
                    fill={theme.background}
                    stroke="#ff1493"
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
export const SleepDetailChart = ({ data, darkMode = false }) => {
  const theme = getTheme(darkMode);

  if (!hasValidData(data)) return <EmptyState title="SLEEP PHASES" darkMode={darkMode} />;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <ParentSize>
        {({ width, height }) => {
          if (width < 10 || height < 10) return null;
          
          const margin = { top: 20, right: 10, bottom: 20, left: 30 };
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
            <BaseChart width={width} height={height} darkMode={darkMode} title="SLEEP STAGES (HR)">
               <Group left={margin.left} top={margin.top}>
                <GridRows scale={yScale} width={xMax} height={yMax} stroke={theme.grid} strokeDasharray="1 3" strokeWidth={0.5} />
                
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  tickFormat={(d) => format(parseISO(d), 'dd')}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'middle',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
                />
                <AxisLeft
                  scale={yScale}
                  stroke={theme.text}
                  tickStroke={theme.text}
                  numTicks={4}
                  tickLabelProps={() => ({
                    fill: theme.text,
                    fontSize: 8,
                    textAnchor: 'end',
                    dy: '0.33em',
                    fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif'
                  })}
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
                    { h: deep, fill: '#4facfe' },  // Neon Blue (Deep)
                    { h: rem, fill: '#b721ff' },   // Neon Purple (REM)
                    { h: light, fill: '#21d4fd' }, // Bright Cyan (Light)
                    { h: awake, fill: '#ff0844' }  // Neon Red (Awake)
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
                           <rect key={idx} x={x} y={y} width={w} height={Math.max(0, h)} fill={item.fill} />
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
  );
};

// --- Info Cards ---

const InfoCardContainer = ({ title, darkMode, children }) => {
  const theme = getTheme(darkMode);
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: theme.background, 
      color: theme.text,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ 
        position: 'absolute',
        top: 4,
        left: 8,
        fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif',
        textTransform: 'uppercase',
        fontSize: '10px',
        fontWeight: 'bold',
        opacity: 0.8,
        zIndex: 10
      }}>
        {title}
      </div>
      <div style={{ marginTop: 20, padding: 10, overflowY: 'auto', flex: 1, fontSize: '11px', fontFamily: darkMode ? '"Courier New", Courier, monospace' : 'sans-serif' }}>
        {children}
      </div>
    </div>
  );
};

export const PersonalInfoCard = ({ data, darkMode = false }) => {
  // Data is a single object, not an array of days usually.
  // But our hook maps it: 'personal_info: mergedData.personal_info || null'
  // So data is the object directly.
  
  if (!data) return <div style={{opacity: 0.5, padding: 20}}>No Personal Info</div>;
  data = data[0];
  return (
  <InfoCardContainer title="PERSONAL INFO" darkMode={darkMode}>
      <div style={{ marginBottom: 8, borderBottom: '1px solid #333', paddingBottom: 4 }}>
        <div><strong>Age:</strong> {data.age}</div>
        <div><strong>Weight:</strong> {data.weight} kg</div>
        <div><strong>Height:</strong> {data.height} m</div>
        <div><strong>Sex:</strong> {data.biological_sex}</div>
        <div><strong>Email:</strong> {data.email}</div>
      </div>
  </InfoCardContainer>
  );
};

export const SleepTimeCard = ({ data, darkMode = false }) => (
  <InfoCardContainer title="SLEEP WINDOWS" darkMode={darkMode}>
    {data.map((d, i) => (
       <div key={i} style={{ marginBottom: 8, borderBottom: '1px solid #333', paddingBottom: 4 }}>
         <div style={{opacity: 0.7}}>{d.day}</div>
         <div><strong>Status:</strong> {d.status}</div>
         {d.optimal_bedtime && (
           <div>
             Offset: {Math.round(d.optimal_bedtime.start_offset / 3600)}h - {Math.round(d.optimal_bedtime.end_offset / 3600)}h
           </div>
         )}
         <div style={{fontSize: '9px', fontStyle: 'italic'}}>{d.recommendation}</div>
       </div>
    ))}
    {data.length === 0 && <div style={{ opacity: 0.5 }}>No Data</div>}
  </InfoCardContainer>
);

export const RestModeCard = ({ data, darkMode = false }) => (
  <InfoCardContainer title="REST MODE" darkMode={darkMode}>
     {data.map((d, i) => (
       <div key={i} style={{ marginBottom: 8, borderBottom: '1px solid #333', paddingBottom: 4 }}>
         <div>{d.start_day} -&gt; {d.end_day || 'Ongoing'}</div>
         {d.episodes.map((ep, k) => (
           <div key={k} style={{paddingLeft: 4, fontSize: '9px'}}>
             - {ep.tags.join(', ')}
           </div>
         ))}
       </div>
    ))}
    {data.length === 0 && <div style={{ opacity: 0.5 }}>No Rest Modes Active</div>}
  </InfoCardContainer>
);

export const SimpleListCard = ({ data, darkMode = false, title, renderItem }) => (
  <InfoCardContainer title={title} darkMode={darkMode}>
    {data.map((d, i) => (
      <div key={i} style={{ marginBottom: 6, borderBottom: '1px solid #333', paddingBottom: 2 }}>
        {renderItem(d)}
      </div>
    ))}
    {data.length === 0 && <div style={{ opacity: 0.5 }}>No Data</div>}
  </InfoCardContainer>
);
