import styles from './About.module.css';
import React from 'react';
import Links from '../components/Links';
import Bar from '../components/Bar';
import SongList from '../components/SongList';
export default function About(){
    return (
        <div className={styles.About}>
            <Bar />
            <div className={styles.BG} />
            <div className={styles.text}>
                <h2>About me 😲</h2>
                <p>My name is Ashwin Iyer, a current freshman at <b>Northeastern University</b> for <b>Computer science x Business</b>.
                    I am looking forward to the co-op program as well as joining the <b>Mars Rover Team</b> and the <b>Electric Racing Team</b>.
                </p>
                <p>I have been hobby coding for around 10~ years and have competed in 2 hackathons being <b>HackUTD</b> and <b>AIFAHacks</b> and I have won both. 
                    I currently have a few side <a href='../projects' id="AHHH">projects</a> which range from web scraping to basic machine learning.
                </p>
                <p>I also enjoy working out and listening to music 🎵!</p>

                <div className={styles.Links2}>
                    <Links />
                    
                </div>
                <h1>My top songs this week</h1>
                <SongList />
            </div>
            
        </div>
    );
}