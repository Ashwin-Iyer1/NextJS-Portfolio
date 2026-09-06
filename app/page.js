"use client";
import React, { useEffect, useState } from "react";
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
import "./landing.css";
import styles from "./page.module.css";
import WorkExperience from "./components/WorkExperience.js";
import KalshiPositions from "./components/KalshiPositions.js";
import OuraDashboard from "./components/OuraDashboard.js";
import LocalTime from "./components/LocalTime";
import CopyEmail from "./components/CopyEmail";
import FeaturedProjects from "./components/FeaturedProjects";

import MiscProj from "./components/MiscProj";

export default function Home() {
  // Render the same splash-first markup on the server and during hydration.
  // The portfolio stays mounted underneath, so its data can load only once.
  const [shouldLoad, setShouldLoad] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let alreadyLoaded = true;
    try {
      alreadyLoaded = sessionStorage.getItem("loaded") !== null;
    } catch {
      // If storage is unavailable, go straight to the portfolio.
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (alreadyLoaded || reduceMotion) {
      const timer = setTimeout(() => setShouldLoad(false), 0);
      return () => clearTimeout(timer);
    }

    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const finishTimer = setTimeout(() => {
      try {
        sessionStorage.setItem("loaded", "true");
      } catch {}
      setShouldLoad(false);
    }, 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <>
      <noscript>
        <style>{`[data-home-intro] { display: none !important; } [data-home-content] { display: block !important; opacity: 1 !important; }`}</style>
      </noscript>
      {shouldLoad && (
        <div
          data-home-intro
          className={`${styles.intro} fade-out ${fadeOut ? "fade" : ""}`}
          role="status"
          aria-label="Loading portfolio"
        >
          <NameAnim />
        </div>
      )}
      <div
        data-home-content
        className={`${styles.Home} ${shouldLoad ? "" : "fade-in"}`}
        style={{ display: shouldLoad ? "none" : undefined }}
      >
        <Bar />

        <div className={styles.content} id="page-content" tabIndex={-1}>
          <header className={styles.hero} id="top">
            <div className={styles.heroCopy}>
              <p className={styles.heroEyebrow}>
                Computer science at Northeastern University
              </p>
              <h1 className={styles.heroTitle}>Ashwin Iyer</h1>
              <p className={styles.heroLede}>
                I build software and explore financial markets. A computer
                science student in Boston, working across Python, Java, and
                TypeScript.
              </p>
              <div className={styles.heroActions}>
                <Link href="/projects" className="button-primary">
                  Explore my projects
                </Link>
                <Link href="/resume" className="button-secondary">
                  View résumé
                </Link>
                <a href="#contact" className={styles.heroLink}>
                  Get in touch
                </a>
              </div>
              <div className={styles.heroSocial}>
                <Links />
              </div>
            </div>
            <LocalTime />
          </header>
          <nav className={styles.sectionNav} aria-label="On this page">
            <span>On this page</span>
            <a href="#WorkingOn">Experience</a>
            <a href="#selected-projects">Projects</a>
            <a href="#writing">Writing</a>
            <a href="#now-title">Now</a>
            <a href="#contact">Contact</a>
          </nav>

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
                  <div>
                    <h3>Northeastern University</h3>
                    <p>Computer science · Boston, MA</p>
                    <Link href="/about">More about me</Link>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section
            className={styles.section}
            aria-labelledby="selected-projects"
          >
            <div className={styles.sectionHeading}>
              <h2 className="section-title" id="selected-projects">
                Selected projects
              </h2>
              <Link href="/projects">
                Browse all projects <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <FeaturedProjects />
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
                <div>
                  <span className={styles.researchMeta}>
                    NUSA · Spring 2026
                  </span>
                  <h3>Equity Volatility Project</h3>
                  <p>Read the research presentation.</p>
                </div>
                <span className={styles.researchBadge}>
                  View PDF <span aria-hidden="true">↗</span>
                </span>
              </a>
            </div>
          </section>

          {/* Miscellaneous Projects */}
          <section className={styles.section}>
            <h2 className="section-title">Projects & explorations</h2>
            <div className={styles.miscProjContainer}>
              <MiscProj />
            </div>
          </section>

          {/* Writing */}
          <section className={styles.section}>
            <h2 className="section-title" id="writing">
              Writing
            </h2>
            <BlogList initialLimit={4} />
          </section>

          {/* Now — live widgets */}
          <section className={styles.section} aria-labelledby="now-title">
            <h2 className="section-title" id="now-title">
              Now
            </h2>
            <p className={styles.nowNote}>
              A look beyond the code: activity from my Oura ring and positions
              on Kalshi. These widgets show the latest available data from each
              service.
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
            <h2 className="section-title" id="contact">
              Let’s connect
            </h2>
            <p className={styles.contactIntro}>
              Have a project in mind, a question, or an interesting idea? I’d
              love to hear from you.
            </p>
            <Contact />
            <p className={styles.contactEmail}>
              <a href="mailto:ashwiniyer06@gmail.com">ashwiniyer06@gmail.com</a>
            </p>
            <div className={styles.contactActions}>
              <a
                href="mailto:ashwiniyer06@gmail.com"
                className="button-primary"
              >
                Send an email
              </a>
              <CopyEmail />
            </div>
          </section>
          <a href="#top" className={styles.backToTop}>
            Back to top ↑
          </a>
        </div>
      </div>
    </>
  );
}
