"use client";

import React, { useEffect, useRef, useState } from "react";
import songsData1 from "../data/songs.json"; // Adjust the path as necessary
import styles from "./SongList.module.css"; // Import your CSS module
import Box from "@mui/material/Box"; // Import Box from Material-UI
import Grid from "@mui/material/Grid"; // Import Grid from Material-UI

const SongList = () => {
  const songRefs = useRef([]);
  const [isClient, setIsClient] = useState(false); // To track if we are on the client
  const [windowWidth, setWindowWidth] = useState(0); // Track window width for conditional behavior
  const [songsData, setSongsData] = useState([]); // Store the song data
  const [loading, setLoading] = useState(true); // Track loading state
  const [animationsReady, setAnimationsReady] = useState(false); // Track if animations should be active

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Attempt to fetch the data from the external API
        const res = await fetch(`/api/songs`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json(); // Await the JSON response to get the projects array
        setSongsData(data);
      } catch (error) {
        console.error(
          "Failed to fetch from API, falling back to local data:",
          error
        );

        // If the fetch fails, use the local JSON file
        setSongsData(songsData1); // Use the local songs data
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchSongs(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts
    // Update window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Set initial window width
    handleResize();
    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Set animations ready after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setAnimationsReady(true);
    }, 100);

    return () => {
      // Cleanup the resize listener
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Apply the observer regardless of screen size to ensure animations work properly
    if (songRefs.current.length > 0 && animationsReady) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.show);
            } else {
              entry.target.classList.remove(styles.show);
            }
          });
        },
        {
          threshold: 0.1, // Trigger when 90% of the item is in view
          rootMargin: "0px 0px -10px 0px", // Delay animation trigger until items are closer to the viewport
        }
      );

      // Observe each song item Box
      songRefs.current.forEach((item) => {
        if (item) {
          observer.observe(item);
        }
      });

      return () => {
        songRefs.current.forEach((item) => {
          if (item) {
            observer.unobserve(item);
          }
        });
      };
    }
  }, [windowWidth, songsData, animationsReady]);

  if (loading) {
    return <p>Loading songs...</p>; // Display a loading message
  }

  return (
    <div className={styles["song-list"]}>
      {/* Replace Stack with Grid for better column control */}
      <Grid container spacing={{ xs: 2, md: 0 }} columns={{ xs: 4, sm: 16, md: 32 }} justifyContent={"center"} padding={"0"}>
        {songsData.length > 0 ? (
          songsData.map((song, index) => (
            <Grid
              size={{ xs: 2, sm: 4, md: 4 }}
              key={index}
            >
              <Box
                ref={(el) => (songRefs.current[index] = el)}
                className={`${styles["song-item"]}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  "&.show": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                }}
              >
                <img
                  src={song.songcoverlink}
                  alt={`${song.song_name} cover`}
                  className={styles["song-cover"]}
                />
                <div className={styles["song-info"]}>
                  <h3 className={styles["song-name"]}>{song.song_name}</h3>
                  <p className={styles["artist-name"]}>{song.artist}</p>
                </div>
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <p>No songs available</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default SongList;
