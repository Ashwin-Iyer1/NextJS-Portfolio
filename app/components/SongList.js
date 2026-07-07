"use client";

import React, { useEffect, useRef, useState } from "react";
import localSongsData from "../data/songs.json"; // Fallback when the API is unavailable
import styles from "./SongList.module.css";

const SongList = () => {
  const songRefs = useRef([]);
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
        const data = await res.json();
        setSongsData(Array.isArray(data) ? data : localSongsData);
      } catch (error) {
        console.error(
          "Failed to fetch from API, falling back to local data:",
          error
        );

        // If the fetch fails, use the local JSON file
        setSongsData(localSongsData);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const items = songRefs.current.filter(Boolean);
    if (items.length === 0) {
      return;
    }

    // Without IntersectionObserver support, show everything immediately.
    if (typeof IntersectionObserver === "undefined") {
      items.forEach((item) => item.classList.add(styles.show));
      return;
    }

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
        threshold: 0.1,
        rootMargin: "0px 0px -10px 0px",
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, [songsData]);

  if (loading) {
    return <p className="loading">Loading songs…</p>;
  }

  if (songsData.length === 0) {
    return <p className="loading">No songs available right now.</p>;
  }

  return (
    <ul className={styles.songList}>
      {songsData.map((song, index) => (
        <li
          key={`${song.song_name}-${index}`}
          ref={(el) => {
            songRefs.current[index] = el;
          }}
          className={styles.songItem}
        >
          <img
            src={song.songcoverlink}
            alt={`${song.song_name} cover`}
            className={styles.songCover}
            loading="lazy"
          />
          <div className={styles.songInfo}>
            <h3 className={styles.songName} title={song.song_name}>
              {song.song_name}
            </h3>
            <p className={styles.artistName} title={song.artist}>
              {song.artist}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SongList;
