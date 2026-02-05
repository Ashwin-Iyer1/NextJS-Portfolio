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
  
  // Dynamic height for specific cards if needed, otherwise default 280px
  const getCardStyle = (h = '280px') => ({
      ...cardStyle,
      height: h
  });

  // Define all available widgets with unique keys and titles
  const allWidgets = [
    { key: 'activity', component: <div style={getCardStyle()}><ActivityChart data={data.activity} darkMode={darkMode} /></div> },
    { key: 'readiness', component: <div style={getCardStyle()}><ReadinessChart data={data.readiness} darkMode={darkMode} /></div> },
    { key: 'sleep', component: <div style={getCardStyle()}><SleepChart data={data.sleep} darkMode={darkMode} /></div> },
    { key: 'sleep_detail', component: <div style={getCardStyle()}><SleepDetailChart data={data.sleep} darkMode={darkMode} /></div> },
    { key: 'stress', component: <div style={getCardStyle()}><StressChart data={data.daily_stress} darkMode={darkMode} /></div> },
    { key: 'spo2', component: <div style={getCardStyle()}><SpO2Chart data={data.daily_spo2} darkMode={darkMode} /></div> },
    { key: 'resilience', component: <div style={getCardStyle()}><ResilienceChart data={data.daily_resilience} darkMode={darkMode} /></div> },
    { key: 'heart_rate', component: <div style={getCardStyle()}><HeartRateChart data={data.heart_rate} darkMode={darkMode} /></div> },
    { key: 'cardio_age', component: <div style={getCardStyle()}><CardioAgeChart data={data.daily_cardiovascular_age} darkMode={darkMode} /></div> },
    { key: 'vo2_max', component: <div style={getCardStyle()}><VO2MaxChart data={data.vo2_max} darkMode={darkMode} /></div> },
    { key: 'workout', component: <div style={getCardStyle()}><WorkoutChart data={data.workout} darkMode={darkMode} /></div> },
    { key: 'sleep_time', component: <div style={getCardStyle()}><SleepTimeCard data={data.sleep_time} darkMode={darkMode} /></div> },
    { key: 'ring_config', component: <div style={getCardStyle()}><RingConfigCard data={data.ring_configuration} darkMode={darkMode} /></div> },
    { key: 'rest_mode', component: <div style={getCardStyle()}><RestModeCard data={data.rest_mode_period} darkMode={darkMode} /></div> },
    { key: 'tags', component: <div style={getCardStyle('350px')}>
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
    { key: 'sessions', component: <div style={getCardStyle('350px')}>
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
    <div style={{ backgroundColor: darkMode ? '#000' : '#fff', minHeight: '100%', paddingBottom: '40px' }}>
      <div className="p-6 flex justify-between items-center bg-black border-b border-gray-900 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div>
            <h1 className="text-2xl font-bold text-white tracking-[0.2em] font-mono">OURA <span style={{color: '#00f2fe'}}>STATS</span></h1>
            <div className="text-[10px] text-gray-500 font-mono mt-1 tracking-widest">SYSTEM ONLINE // MONITORING ACTIVE</div>
        </div>
        <div className="text-xs text-[#00f2fe] font-mono border border-[#00f2fe] px-3 py-1 rounded-full bg-[#00f2fe10]">
            {startDate} <span className="mx-2 text-gray-600">to</span> {endDate}
        </div>
      </div>
      
      <Box sx={{ width: '100%', minHeight: 800, padding: 2 }}>
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
