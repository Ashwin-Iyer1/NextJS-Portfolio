import styles from "./About.module.css";
import React from "react";
import Links from "../components/Links";
import Bar from "../components/Bar";
import SongList from "../components/SongList";
import Coc from "../components/COC";
import Link from "next/link";
import OuraDashboard from "../components/OuraDashboard";

export default function About() {
  return (
    <div className={styles.About}>
      <Bar />
      <div className={styles.mainContent}>
        <section>
          <h2 className="section-title">About Me</h2>
          <div className={styles.cardGrid}>
            <div className={`glass-card ${styles.card}`}>
              <h3>Education</h3>
              <p>
                My name is Ashwin Iyer, a current sophomore at{" "}
                <b>Northeastern University</b> studying{" "}
                <b>Computer Science x Business Administration</b>. I am looking
                forward to the co-op program as well as joining the{" "}
                <b>finance</b> and the <b>computer science</b> clubs on campus.
              </p>
            </div>

            <div className={`glass-card ${styles.card}`}>
              <h3>Experience &amp; Projects</h3>
              <p>
                I have been hobby coding for around 10 years and have competed
                in two hackathons, <b>HackUTD</b> and <b>AIFAHacks</b>, winning
                both competitions. I currently have a few side{" "}
                <Link href="/projects" className={styles.projectLink}>
                  projects
                </Link>
                , which range from web scraping to basic machine learning.
              </p>
            </div>

            <div className={`glass-card ${styles.card}`}>
              <h3>Interests</h3>
              <p>
                Beyond coding, I enjoy working out and listening to music, with
                the occasional game of Clash of Clans. My top tracks and health
                stats are just below.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">Connect With Me</h2>
          <div className={styles.connectRow}>
            <div className={styles.linksWrap}>
              <Links />
            </div>
            <Link href="/resume" className={styles.resumeCta}>
              View my resume
              <span className={styles.ctaArrow} aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="section-title">Top Songs This Week</h2>
          <div className={`glass-card ${styles.songsCard}`}>
            <SongList />
          </div>
        </section>

        <section>
          <h2 className="section-title">Health Stats (Oura)</h2>
          <div className={`glass-card ${styles.ouraCard}`}>
            <OuraDashboard showHeader={false} />
          </div>
        </section>

        <section>
          <div className={`glass-card ${styles.cocCard}`}>
            <Coc />
          </div>
        </section>
      </div>
    </div>
  );
}
