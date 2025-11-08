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
      <div className={styles.Container}>
        <div className={styles.mainContent}>
          <div className={styles.introSection}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <div className={styles.card}>
              <h3 className={styles.cardSubtitle}>Education</h3>
              <p>
                My name is Ashwin Iyer, a current sophomore at{" "}
                <b>Northeastern University</b> studying{" "}
                <b>Computer Science x Business Administration</b>. I am looking
                forward to the co-op program as well as joining the{" "}
                <b>finance</b> and the <b>computer science</b> clubs on campus.
              </p>
            </div>
            
            <div className={styles.card}>
              <h3 className={styles.cardSubtitle}>Experience & Projects</h3>
              <p>
                I have been hobby coding for around 10~ years and have competed
                in 2 hackathons, <b>HackUTD</b> and <b>AIFAHacks</b>, winning
                both competitions. I currently have a few side{" "}
                <Link href="/projects" className={styles.projectLink}>
                  projects
                </Link>
                , which range from web scraping to basic machine learning.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardSubtitle}>Interests</h3>
              <p>
                Beyond coding, I enjoy working out and listening to music 🎵!
              </p>
            </div>
          </div>

          <div className={styles.linksSection}>
            <h2 className={styles.sectionTitle}>Connect With Me</h2>
            <div className={styles.linksCard}>
              <Links />
            </div>
            <Link href="/resume" className={styles.resumeLink}>
              <div className={styles.resumeCard}>
                <h3>View My Resume</h3>
                <p>Check out my full professional background →</p>
              </div>
            </Link>
          </div>

          <div className={styles.musicSection}>
            <h2 className={styles.sectionTitle}>My Top Songs This Week</h2>
            <div className={styles.songsCard}>
              <SongList />
            </div>
          </div>

          <div className={styles.cocSection}>
            <Coc />
          </div>
        </div>
      </div>
    </div>
  );
}
