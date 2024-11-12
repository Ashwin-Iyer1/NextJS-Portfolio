"use client";

import "./getTime.module.css";
import React, { useEffect, useState } from 'react'; // Import useEffect and useState

export default function getTime() {
    const [wakatime, setWakatime] = useState([]); // State for Wakatime data
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const fetchWakatime = async () => {
            try {
                // Attempt to fetch the data from the external API
                const res = await fetch(`/api/wakatime`);
                
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(res);
                // Await the JSON response to get the Wakatime data
                const data = await res.json(); // Make sure to await this
                setWakatime(data); // Set the fetched data
            } catch (error) {
                console.error('Failed to fetch from API, falling back to local data:', error);
                
                // If the fetch fails, just set fallback data
                setWakatime("Too long!");
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchWakatime(); // Call the fetch function
    }, []); // Empty dependency array to run once on mount

    // Loading skeleton placeholder
    if (loading) {
        return (
            <div className="wakatime skeleton">
                <p>Loading...</p>
            </div>
        ); // Return loading skeleton
    }
    return (
        <div className="wakatime">
            <p style={{fontSize: '1em'}}>Total: {((wakatime[0]?.total_seconds / 60) / 60).toFixed(1)} Hours</p>
            <p style={{fontSize: '1em'}}>Daily Average: {(((wakatime[0]?.daily_average) / 60) / 60).toFixed(1)} Hours</p>
            <p style={{fontSize: '.8em'}}>Tracked with <a href="https://wakatime.com/@bc413433-56e4-4dee-b14c-d8c669a8be79" target='_blank'>Wakatime</a></p>
        </div>
    );
}
