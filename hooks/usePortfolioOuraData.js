import { useState, useEffect } from 'react';

export const usePortfolioOuraData = (startDate, endDate, subset = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Mapping from OuraDashboard subset keys to API endpoint types
        const subsetToEndpointMap = {
          'activity': 'activity',
          'readiness': 'readiness',
          'sleep': 'sleep_daily',
          'sleep_detail': 'sleep_detailed',
          'stress': 'daily_stress',
          'spo2': 'daily_spo2',
          'resilience': 'daily_resilience',
          'heart_rate': 'heart_rate',
          'sleep_time': 'sleep_time',
          'sessions': 'session',
          'workout': 'workout',
          // 'tags': 'tag',
          // 'enhanced_tags': 'enhanced_tag', // Explicit support
          'personal_info': 'personal_info',
          // 'ring_config': 'ring_configuration', // REMOVED
          // 'rest_mode': 'rest_mode_period',
          'vo2_max': 'vo2_max',
          'cardio_age': 'cardio_age'
        };

        let endpoints = [
          'activity', 'readiness', 'sleep_daily', 'daily_stress', 
          'daily_spo2', 'daily_resilience', 'cardio_age', 'heart_rate',
          'sleep_detailed', 'sleep_time', 'workout', 
          'vo2_max',
          'personal_info' // Added
          // 'session', 'tag', 'enhanced_tag', 'rest_mode_period', 'ring_configuration' // Removed
        ];

        // If a subset is provided, filter endpoints to only those requested
        if (subset && Array.isArray(subset)) {
          endpoints = subset
            .map(key => subsetToEndpointMap[key])
            .filter(endpoint => endpoint !== undefined);
            
          // If tags are requested, always include enhanced_tag as well for fallback/completeness
          if (subset.includes('tags')) {
            endpoints.push('enhanced_tag');
          }
        }

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
        
        const mappedData = {
            activity: mergedData.activity || [],
            readiness: mergedData.readiness || [],
            sleep: mergedData.sleep_daily || [],
            daily_stress: mergedData.daily_stress || [],
            daily_spo2: mergedData.daily_spo2 || [],
            daily_resilience: mergedData.daily_resilience || [],
            daily_cardiovascular_age: mergedData.cardio_age || [],
            heart_rate: mergedData.heart_rate || [],
            workout: mergedData.workout || [],
            sleep_documents: mergedData.sleep_detailed || [],
            sleep_time: mergedData.sleep_time || [],
            session: mergedData.session || [],
            tag: mergedData.tag || [],
            enhanced_tag: mergedData.enhanced_tag || [],
            rest_mode_period: mergedData.rest_mode_period || [],
            // ring_configuration: mergedData.ring_configuration || [],
            personal_info: mergedData.personal_info || null, // Singleton
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
  }, [startDate, endDate, JSON.stringify(subset)]);

  return { data, loading, error };
};
