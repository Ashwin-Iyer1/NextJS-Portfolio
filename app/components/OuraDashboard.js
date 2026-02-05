"use client";

import React, { useState, useEffect } from 'react';
import { usePortfolioOuraData } from '../../hooks/usePortfolioOuraData';
import { 
  ActivityChart, ReadinessChart, SleepChart, StressChart, SpO2Chart, 
  HeartRateChart, WorkoutChart, ResilienceChart, CardioAgeChart, VO2MaxChart,
  SleepDetailChart, RingConfigCard, SleepTimeCard, RestModeCard, SimpleListCard
} from './OuraCharts';
import { format, subDays } from 'date-fns';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';

export default function OuraDashboard({ subset = null }) {
  const [useSandbox, setUseSandbox] = useState(false); // Default to false for prod
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode for aesthetics
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd')); // Last 30 days

  const { data, loading, error } = usePortfolioOuraData(startDate, endDate);

  if (loading) return <div className="text-white p-4 font-mono">LOADING OURA DATA...</div>;
  if (error) return <div className="text-red-500 p-4 font-mono">ERROR: {error}</div>;
  if (!data) return null;

  const cardStyle = {
    backgroundColor: darkMode ? '#0a0a0a' : '#fff',
    border: '1px solid #222',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    minHeight: '200px'
  };
  
  const getCardStyle = (h = '280px') => ({
    background: darkMode 
      ? 'linear-gradient(135deg, rgba(138, 44, 226, 0.08), rgba(0, 0, 0, 0.3))' 
      : '#fff',
    border: darkMode ? '1px solid rgba(138, 44, 226, 0.2)' : '1px solid #ddd',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: darkMode ? '0 4px 16px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    height: h,
    position: 'relative'
  });

  // Unique class for hover effect
  const cardClassName = "oura-card-widget";
  
  const hoverStyles = `
    .oura-card-widget:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(138, 44, 226, 0.3) !important;
    }
  `;

  // Define all available widgets with unique keys and titles
  const allWidgets = [
    { key: 'activity', component: <div className={cardClassName} style={getCardStyle()}><ActivityChart data={data.activity} darkMode={darkMode} /></div> },
    { key: 'readiness', component: <div className={cardClassName} style={getCardStyle()}><ReadinessChart data={data.readiness} darkMode={darkMode} /></div> },
    { key: 'sleep', component: <div className={cardClassName} style={getCardStyle()}><SleepChart data={data.sleep} darkMode={darkMode} /></div> },
    { key: 'sleep_detail', component: <div className={cardClassName} style={getCardStyle()}><SleepDetailChart data={data.sleep} darkMode={darkMode} /></div> },
    { key: 'stress', component: <div className={cardClassName} style={getCardStyle()}><StressChart data={data.daily_stress} darkMode={darkMode} /></div> },
    { key: 'spo2', component: <div className={cardClassName} style={getCardStyle()}><SpO2Chart data={data.daily_spo2} darkMode={darkMode} /></div> },
    { key: 'resilience', component: <div className={cardClassName} style={getCardStyle()}><ResilienceChart data={data.daily_resilience} darkMode={darkMode} /></div> },
    { key: 'heart_rate', component: <div className={cardClassName} style={getCardStyle()}><HeartRateChart data={data.heart_rate} darkMode={darkMode} /></div> },
    { key: 'cardio_age', component: <div className={cardClassName} style={getCardStyle()}><CardioAgeChart data={data.daily_cardiovascular_age} darkMode={darkMode} /></div> },
    { key: 'vo2_max', component: <div className={cardClassName} style={getCardStyle()}><VO2MaxChart data={data.vo2_max} darkMode={darkMode} /></div> },
    { key: 'workout', component: <div className={cardClassName} style={getCardStyle()}><WorkoutChart data={data.workout} darkMode={darkMode} /></div> },
    { key: 'sleep_time', component: <div className={cardClassName} style={getCardStyle()}><SleepTimeCard data={data.sleep_time} darkMode={darkMode} /></div> },
    { key: 'ring_config', component: <div className={cardClassName} style={getCardStyle()}><RingConfigCard data={data.ring_configuration} darkMode={darkMode} /></div> },
    { key: 'rest_mode', component: <div className={cardClassName} style={getCardStyle()}><RestModeCard data={data.rest_mode_period} darkMode={darkMode} /></div> },
    { key: 'tags', component: <div className={cardClassName} style={getCardStyle('350px')}>
        <SimpleListCard 
            title="TAGS" 
            data={data.tag} 
            darkMode={darkMode}
            renderItem={(d) => (
                <div style={{fontSize: '10px'}}>
                    <span style={{color: '#aaa'}}>{d.day}</span>: {d.text || d.tags?.join(', ')}
                </div>
            )}
        />
    </div> },
    { key: 'sessions', component: <div className={cardClassName} style={getCardStyle('350px')}>
        <SimpleListCard 
            title="SESSIONS" 
            data={data.session} 
            darkMode={darkMode}
            renderItem={(d) => (
                <div style={{fontSize: '10px'}}>
                    <span style={{color: '#aaa'}}>{d.day}</span>: {d.type} ({Math.round(d.duration / 60)}m)
                </div>
            )}
        />
    </div> }
  ];

  // Filter widgets if subset is provided
  const visibleWidgets = subset 
    ? allWidgets.filter(w => subset.includes(w.key))
    : allWidgets;

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100%', paddingBottom: '40px' }}>
      <div className="p-6 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md" 
           style={{
             background: 'rgba(255, 255, 255, 0.03)',
             borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
           }}>
        <style>{hoverStyles}</style>
        <div>
            <h2 className="text-2xl font-bold font-sans" style={{ color: '#c596ee', margin: 0 }}>OURA STATS</h2>
        </div>
        <div className="text-sm font-sans px-3 py-1 rounded-full" 
             style={{ 
               color: '#e4e4e4',
               background: 'rgba(255, 255, 255, 0.1)',
               border: '1px solid rgba(255, 255, 255, 0.1)'
             }}>
            {startDate} <span className="mx-2 text-gray-400">to</span> {endDate}
        </div>
      </div>
      
      <Box sx={{ width: '100%', padding: 2 }}>
        <Masonry columns={{ xs: 1, sm: 2, lg: 3 }} spacing={3}>
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
