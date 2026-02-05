import { useState, useEffect } from 'react';

export const usePortfolioOuraData = (startDate, endDate) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoints = [
          'activity', 'readiness', 'sleep_daily', 'daily_stress', 
          'daily_spo2', 'daily_resilience', 'cardio_age', 'heart_rate',
          'sleep_detailed', 'sleep_time', 'session', 'workout', 
          'tag', 'enhanced_tag', 'rest_mode_period', 'ring_configuration', 'vo2_max'
        ];

        const results = await Promise.all(
          endpoints.map(type => 
            fetch(`/api/oura?type=${type}&start_date=${startDate}&end_date=${endDate}`)
              .then(res => {
                  if (!res.ok) throw new Error(`Failed to fetch ${type}`);
                  return res.json();
              })
              .then(json => ({ [type]: json.data }))
          )
        );

        // Merge all results into a single object
        const mergedData = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        
        // Map keys to match the visualizer's expected prop names if necessary
        // The visualizer expects: activity, readiness, sleep, daily_stress, etc.
        // My endpoints use keys like 'sleep_daily'.
        
        const mappedData = {
            activity: mergedData.activity || [],
            readiness: mergedData.readiness || [],
            sleep: mergedData.sleep_daily || [], // "sleep" in visualizer matches daily_sleep
            daily_stress: mergedData.daily_stress || [],
            daily_spo2: mergedData.daily_spo2 || [],
            daily_resilience: mergedData.daily_resilience || [],
            daily_cardiovascular_age: mergedData.cardio_age || [],
            heart_rate: mergedData.heart_rate || [], // Flattened or processed by API? API returns flat list if 'heart_rate'.
            workout: mergedData.workout || [],
            sleep_documents: mergedData.sleep_detailed || [],
            sleep_time: mergedData.sleep_time || [],
            session: mergedData.session || [],
            tag: mergedData.tag || [],
            enhanced_tag: mergedData.enhanced_tag || [],
            rest_mode_period: mergedData.rest_mode_period || [],
            ring_configuration: mergedData.ring_configuration || [],
            vo2_max: mergedData.vo2_max || []
        };

        setData(mappedData);
      } catch (err) {
        console.error("Error fetching Oura data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  return { data, loading, error };
};
