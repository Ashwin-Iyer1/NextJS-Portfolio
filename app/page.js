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
        <div className={styles.Container}>
          <div className={styles.topSection}>
            <div className={styles.basicRow}>
              <div className={styles.basic}>
                <h2>Sophomore at Northeastern University</h2>
                <p>
                  I am currently a sophomore at Northeastern University in
                  Boston, Massachusetts, and I am interested in computer
                  science. I am currently learning Python, Java, and TypeScript.{" "}
                  <Link href="/about">Learn more about me!</Link>
                </p>
              </div>
              <Links />
            </div>
            <div className={styles.workExperienceRow}>
              <div className={styles.workExperience}>
                <h2 id="WorkingOn">Work Experience</h2>
                <WorkExperience />
              </div>
              <div className={styles.rightColumn}>
                <GetTimeWrapper />
                <div className={styles.College}>
                  <Image
                    src={NEU}
                    id={"person"}
                    alt="Northeastern"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.skillsSection}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <Skills />
        </div>

        <div className={styles.MiscProj}>
          <h2 className={styles.sectionTitle}>Miscellaneous Projects</h2>
          <div className={styles.MiscProjContainer} ref={miscProjSection}>
            {(isMiscProjVisible || fadeIn || forceMiscProjLoad) && (
              <Suspense fallback={<div className="loading">Loading...</div>}>
                <LazyMiscProj />
              </Suspense>
            )}
          </div>
          <h2 className={styles.sectionTitle}>My Blogs</h2>
          <BlogList />
        </div>

        <div className={styles.dashboardRow}>
          <div className={styles.dashboardColumn}>
            <h2 className={styles.sectionTitle}>Live Health Stats</h2>
            <div className={styles.dashboardCard}>
              <OuraDashboard
                subset={["activity", "heart_rate", "sleep", "stress"]}
                columns={1}
                chartHeight="180px"
                chartWidth="100%"
                showHeader={true}
                compact={true}
              />
            </div>
          </div>

          <div className={styles.dashboardColumn}>
            <KalshiPositions id="kalshi_positions" />
          </div>
        </div>

        <div className={styles.Contact}>
          <h2 className={styles.sectionTitle}>Contact Me</h2>
          <Contact />
          <p>
            Email:{" "}
            <a href="mailto:ashwiniyer06@gmail.com">ashwiniyer06@gmail.com</a>
          </p>
        </div>
      </div>
    </>
  );
}
