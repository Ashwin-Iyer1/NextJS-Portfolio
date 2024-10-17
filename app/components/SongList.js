"use client";

import React, { useEffect, useRef, useState } from 'react';
import songsData from '../data/songs.json'; // Adjust the path as necessary
import styles from './SongList.module.css'; // Import your CSS module

const SongList = () => {
    const songRefs = useRef([]);
    const [isClient, setIsClient] = useState(false); // To track if we are on the client
    const [windowWidth, setWindowWidth] = useState(0); // Track window width for conditional behavior

    useEffect(() => {
        setIsClient(true); // Set to true after the component mounts

        // Update window width
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Set initial window width
        handleResize();

        // Add resize listener
        window.addEventListener('resize', handleResize);

        return () => {
            // Cleanup the resize listener
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Only apply the observer if the window width is less than 767px (mobile)
        if (windowWidth < 767) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(styles.show); // Add the show class when visible
                        }
                    });
                },
                {
                    threshold: .99, // 10% of the image is in view
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
    }, [windowWidth]);

    return (
        <div className={styles['song-list']}>
            {songsData.length > 0 ? (
                songsData.map((song, index) => (
                    <div
                        key={index}
                        className={styles['song-item']}
                        style={isClient && windowWidth >= 767 ? { animationDelay: `${0.1 * (index + 1)}s` } : {}}
                    >
                        <img
                            ref={(el) => (songRefs.current[index] = el)}
                            src={song.songcoverlink}
                            alt={`${song.song_name} cover`}
                            className={styles['song-cover']}
                        />
                        <div className={styles['song-info']}>
                            <h3 className={styles['song-name']}>{song.song_name}</h3>
                            <p className={styles['artist-name']}>{song.artist}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No songs available</p>
            )}
        </div>
    );
};

export default SongList;
