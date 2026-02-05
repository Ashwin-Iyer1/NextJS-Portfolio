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
  const [fadeIn, setFadeIn] = useState(true); // Default to true to show content immediately on server
  const [forceMiscProjLoad, setForceMiscProjLoad] = useState(false);
  const miscProjSection = useRef(null);
  const isMiscProjVisible = useIntersectionObserver(miscProjSection);

  // Add this effect to force load MiscProj component after main content appears
  useEffect(() => {
    if (fadeIn) {
      // Small delay to ensure intersection observer has initialized
      const timer = setTimeout(() => {
        setForceMiscProjLoad(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fadeIn]);

  useEffect(() => {
    // Check sessionStorage only on client side after mount
    const loaded = sessionStorage.getItem("loaded");

    if (loaded === null) {
      // First time loading - show animation
      const timer = setTimeout(() => {
        setFadeIn(false); // Hide content initially
        setShouldLoad(true);
        setTimeout(() => {
          setFadeOut(true); // Start fade-out
          sessionStorage.setItem("loaded", "true");

          // Wait for the fade-out duration before removing the loader
          setTimeout(() => {
            setShouldLoad(false);
            setFadeIn(true); // Start fade-in
          }, 400); // Adjust this duration to match your CSS fade-out time
        }, 2200);
      }, 0);
      return () => clearTimeout(timer);
    }
    // If loaded before, fadeIn is already true from initial state
  }, []);

  if (shouldLoad) {
    return (
      <div className={`fade-out ${fadeOut ? "fade" : ""}`}>
        <NameAnim />
      </div>
    );
  }

  // Always render the main content, but conditionally show loader overlay
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
          <div></div>
          <h2
            style={{ textAlign: "center", fontSize: "2em", marginTop: "48px" }}
          >
            Skills
          </h2>
          <Skills />
        </div>
        
        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
          <h2 style={{ textAlign: "center", fontSize: "2em", marginBottom: '20px' }}>Live Health Stats</h2>
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(138, 44, 226, 0.30), rgba(0, 0, 0, 0.3))',
            border: '1px solid rgba(138, 44, 226, 0.2)',
            borderRadius: '16px', 
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
          }}>
            <OuraDashboard subset={['activity', 'sleep', 'stress']} />
          </div>
        </div>

        <div className={styles.MiscProj}>
          <h2 style={{ textAlign: "center", fontSize: "2em" }}>
            Miscellaneous Projects
          </h2>
          <div className={styles.MiscProjContainer} ref={miscProjSection}>
            {(isMiscProjVisible || fadeIn || forceMiscProjLoad) && (
              <Suspense fallback={<div className="loading">Loading...</div>}>
                <LazyMiscProj />
              </Suspense>
            )}
          </div>
          <h2 style={{ textAlign: "center", fontSize: "2em" }}>My Blogs</h2>
          <BlogList />
        </div>
        <KalshiPositions id="kalshi_positions" />
        <div className={styles.Contact}>
          <h2 style={{ textAlign: "center", fontSize: "2em" }}>Contact Me</h2>
          <Contact />
          <p style={{ margin: "0 auto", marginTop: "16px" }}>
            Email:{" "}
            <a href="mailto:ashwiniyer06@gmail.com">ashwiniyer06@gmail.com</a>
          </p>
        </div>
      </div>
    </>
  );
}
