// SongList.js
"use client";

import React from 'react';
import songsData from '../data/songs.json'; // Adjust the path as necessary
import styles from './SongList.module.css'; // Import your CSS module

const SongList = () => {
    return (
        <div className={styles['song-list']}>
            {songsData.length > 0 ? (
                songsData.map((song, index) => (
                    <div key={index} className={styles['song-item']}>
                        <img
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
