"use client";

import React, { useEffect, useRef, useState } from "react";
import songsData1 from "../data/songs.json"; // Adjust the path as necessary
import styles from "./SongList.module.css"; // Import your CSS module
import Stack from "@mui/material/Stack"; // Import Stack from Material-UI
import Box from "@mui/material/Box"; // Import Box from Material-UI
const SongList = () => {
  const songRefs = useRef([]);
  const [isClient, setIsClient] = useState(false); // To track if we are on the client
  const [windowWidth, setWindowWidth] = useState(0); // Track window width for conditional behavior
  const [songsData, setSongsData] = useState([]); // Store the song data
  const [loading, setLoading] = useState(true); // Track loading state

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
    return () => {
      // Cleanup the resize listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // Only apply the observer if the window width is less than 767px (mobile)
    if (windowWidth < 767 && songRefs.current.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.show); // Add the show class when visible
            }
          });
        },
        {
          threshold: 0.7, // 10% of the image is in view
        }
      );
      // Observe each image
      songRefs.current.forEach((img) => {
        if (img) {
          observer.observe(img);
        }
      });
      return () => {
        songRefs.current.forEach((img) => {
          if (img) {
            observer.unobserve(img);
          }
        });
      };
    }
  }, [windowWidth, songsData]);

  if (loading) {
    return <p>Loading songs...</p>; // Display a loading message
  }

  return (
    <div className={styles["song-list"]}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        justifyContent="center"
        alignItems="center"
        flexWrap={"wrap"}
      >
        {songsData.length > 0 ? (
          songsData.map((song, index) => (
            <Box
              key={index}
              className={`${styles["song-item"]} ${styles["fade-in"]}`}
              sx={{}}
              textOverflow={"ellipsis"}
            >
              <img
                ref={(el) => (songRefs.current[index] = el)}
                src={song.songcoverlink}
                alt={`${song.song_name} cover`}
                className={styles["song-cover"]}
              />
              <div className={styles["song-info"]}>
                <h3 className={styles["song-name"]}>{song.song_name}</h3>
                <p className={styles["artist-name"]}>{song.artist}</p>
              </div>
            </Box>
          ))
        ) : (
          <p>No songs available</p>
        )}
      </Stack>
    </div>
  );
};

export default SongList;
