import styles from "./About.module.css";
import React from "react";
import Links from "../components/Links";
import Bar from "../components/Bar";
import SongList from "../components/SongList";
import Coc from "../components/COC";
import Link from "next/link";

export default function About() {
  return (
    <div className={styles.About}>
      <Bar />
      <div className={styles.BG} />
      <div className={styles.text}>
        <h2>About me 😲</h2>
        <p>
          My name is Ashwin Iyer, a current rising sophomore at{" "}
          <b>Northeastern University</b> studying <b>Computer science x Business Administration</b>.
          I am looking forward to the co-op program as well as joining the{" "}
          <b>finance</b> and the <b>computer science</b> clubs on campus.
        </p>
        <p className="ABTText">
          I have been hobby coding for around 10~ years and have competed in 2
          hackathons, <b>HackUTD</b> and <b>AIFAHacks</b>, and I have won
          both. I currently have a few side{" "}
          <a href="../projects" id="AHHH">
            projects
          </a>{", "}
          which range from web scraping to basic machine learning.
        </p>
        <p className="ABTText">
          I also enjoy working out and listening to music 🎵!
        </p>

        <div className={styles.Links2}>
          <Links />
        </div>
        <Link href="/resume">
          <h2>My Resume</h2>
        </Link>

        <h1 className={styles.songsHeading}>My top songs this week</h1>
      </div>
      <div className={styles.songs}>
        <SongList />
      </div>
      <Coc />
      <div className="ContactText"></div>
    </div>
  );
}
