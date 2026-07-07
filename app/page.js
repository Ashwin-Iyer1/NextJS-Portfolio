"use client";
import React, { lazy, Suspense, useRef, useEffect, useState } from "react";
const NEU = "/Images/NEU.webp";
import NameAnim from "./components/NameAnim.js";
import Links from "./components/Links.js";
import Image from "next/image";
import Link from "next/link";
import Skills from "./components/Skills.js";
import Contact from "./components/Contact.js";
import GetTimeWrapper from "./components/GetTimeWrapper.js";
import Bar from "./components/Bar";
import BlogList from "./components/BlogList";
import useIntersectionObserver from "./components/useIntersectionObserver";
import "./landing.css";
import styles from "./page.module.css";
import WorkExperience from "./components/WorkExperience.js";
import KalshiPositions from "./components/KalshiPositions.js";
import OuraDashboard from "./components/OuraDashboard.js";

const LazyMiscProj = lazy(() => import("./components/MiscProj"));

export default function Home() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [forceMiscProjLoad, setForceMiscProjLoad] = useState(false);
  const miscProjSection = useRef(null);
  const isMiscProjVisible = useIntersectionObserver(miscProjSection);

  useEffect(() => {
    if (fadeIn) {
      const timer = setTimeout(() => {
        setForceMiscProjLoad(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fadeIn]);

  useEffect(() => {
    const loaded = sessionStorage.getItem("loaded");

    if (loaded === null) {
      const timer = setTimeout(() => {
        setFadeIn(false);
        setShouldLoad(true);
        setTimeout(() => {
          setFadeOut(true);
          sessionStorage.setItem("loaded", "true");
          setTimeout(() => {
            setShouldLoad(false);
            setFadeIn(true);
          }, 400);
        }, 2200);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  if (shouldLoad) {
    return (
      <div className={`fade-out ${fadeOut ? "fade" : ""}`}>
        <NameAnim />
      </div>
    );
  }

  return (
    <>
      <div
        className={`${styles.Home} ${fadeIn ? "fade-in" : ""}`}
        style={{
          opacity: shouldLoad ? 0 : 1,
          visibility: shouldLoad ? "hidden" : "visible",
          transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
        }}
      >
        <Bar />

        <div className={styles.content}>
          {/* Hero */}
          <header className={styles.hero}>
            <p className={styles.heroEyebrow}>
              Junior &middot; Northeastern University &middot; Boston, MA
            </p>
            <h1 className={styles.heroTitle}>Ashwin Iyer</h1>
            <p className={styles.heroLede}>
              I&apos;m a computer science student at Northeastern, currently
              learning Python, Java, and TypeScript.{" "}
              <Link href="/about" className={styles.heroLink}>
                More about me
              </Link>
            </p>
            <div className={styles.heroSocial}>
              <Links />
            </div>
          </header>

          {/* Work Experience */}
          <section className={styles.section}>
            <h2 className="section-title" id="WorkingOn">
              Work Experience
            </h2>
            <div className={styles.workRow}>
              <div className={`glass-card ${styles.workCard}`}>
                <WorkExperience />
              </div>
              <aside className={styles.workAside}>
                <GetTimeWrapper />
                <div className={`glass-card ${styles.college}`}>
                  <Image
                    src={NEU}
                    id={"person"}
                    alt="Northeastern"
                    width={200}
                    height={200}
                  />
                </div>
              </aside>
            </div>
          </section>

          {/* Skills */}
          <section className={styles.section}>
            <h2 className="section-title">Skills</h2>
            <Skills />
          </section>

          {/* Research */}
          <section className={styles.section}>
            <h2 className="section-title">Research</h2>
            <div className={styles.researchRow}>
              <a
                href="/projects/NUSA Spring 26 RS - Equity Vol. Project.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-card ${styles.researchLink}`}
              >
                NUSA Spring 26 RS — Equity Volatility Project (PDF)
              </a>
            </div>
          </section>

          {/* Miscellaneous Projects */}
          <section className={styles.section}>
            <h2 className="section-title">Miscellaneous Projects</h2>
            <div className={styles.miscProjContainer} ref={miscProjSection}>
              {(isMiscProjVisible || fadeIn || forceMiscProjLoad) && (
                <Suspense fallback={<div className="loading">Loading...</div>}>
                  <LazyMiscProj />
                </Suspense>
              )}
            </div>
          </section>

          {/* Writing */}
          <section className={styles.section}>
            <h2 className="section-title">Writing</h2>
            <BlogList />
          </section>

          {/* Now — live widgets */}
          <section className={styles.section} aria-labelledby="now-title">
            <h2 className="section-title" id="now-title">
              Now
            </h2>
            <p className={styles.nowNote}>
              Live while you read — health metrics from my Oura ring and open
              positions on Kalshi.
            </p>
            <div className={styles.nowGrid}>
              <div className={`glass-card ${styles.nowCard}`}>
                <OuraDashboard
                  subset={["activity", "heart_rate", "sleep", "stress"]}
                  columns={1}
                  chartHeight="180px"
                  chartWidth="100%"
                  showHeader={true}
                  compact={true}
                />
              </div>
              <div className={styles.nowCol}>
                <KalshiPositions id="kalshi_positions" />
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className={styles.section}>
            <h2 className="section-title">Contact</h2>
            <Contact />
            <p className={styles.contactEmail}>
              Email:{" "}
              <a href="mailto:ashwiniyer06@gmail.com">ashwiniyer06@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
