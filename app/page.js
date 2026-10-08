"use client";
import React, { useCallback, useEffect, useState } from "react";
const NEU = "/Images/NEU.webp";
import NameAnim from "./components/NameAnim.js";
import Image from "next/image";
import Link from "next/link";
import Skills from "./components/Skills.js";
import Contact from "./components/Contact.js";
import GetTimeWrapper from "./components/GetTimeWrapper.js";
import BlogList from "./components/BlogList";
import styles from "./page.module.css";
import WorkExperience from "./components/WorkExperience.js";
import KalshiPositions from "./components/KalshiPositions.js";
import OuraDashboard from "./components/OuraDashboard.js";
import LocalTime from "./components/LocalTime";
import CopyEmail from "./components/CopyEmail";
import FeaturedProjects from "./components/FeaturedProjects";
import SectionNav from "./components/SectionNav";
import HeroSurface from "./components/HeroSurface";
import { useInitialDocumentEntry } from "./components/IntroSessionProvider";

import MiscProj from "./components/MiscProj";

export default function Home() {
  // Only the initial document render can start the intro automatically. The
  // persistent layout provider makes internal Home mounts visible immediately.
  const initialDocumentEntry = useInitialDocumentEntry();
  const [shouldLoad, setShouldLoad] = useState(initialDocumentEntry);
  const [animateReveal, setAnimateReveal] = useState(initialDocumentEntry);
  const [fadeOut, setFadeOut] = useState(false);

  const [introRun, setIntroRun] = useState(0);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem("loaded", "true");
    } catch {}
    setShouldLoad(false);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    let alreadyLoaded = true;
    try {
      alreadyLoaded = sessionStorage.getItem("loaded") !== null;
    } catch {
      // If storage is unavailable, go straight to the portfolio.
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (introRun === 0 && (alreadyLoaded || reduceMotion)) {
      const timer = setTimeout(() => setShouldLoad(false), 0);
      return () => clearTimeout(timer);
    }
    const fadeTimer = setTimeout(
      () => setFadeOut(true),
      reduceMotion ? 700 : 2200,
    );
    const finishTimer = setTimeout(finishIntro, reduceMotion ? 900 : 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [finishIntro, introRun, shouldLoad]);

  function replayIntro() {
    setFadeOut(false);
    setAnimateReveal(true);
    setIntroRun((run) => run + 1);
    setShouldLoad(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <>
      <noscript>
        <style>{`[data-home-intro] { display: none !important; } [data-home-content] { display: block !important; opacity: 1 !important; } .Bar, .skip-link { visibility: visible !important; }`}</style>
      </noscript>
      {shouldLoad && (
        <div
          data-home-intro
          className={`${styles.intro} fade-out ${fadeOut ? "fade" : ""}`}
          role="status"
          aria-label="Loading portfolio"
        >
          <NameAnim key={introRun} />
        </div>
      )}
      <div
        data-home-content
        className={`${styles.Home} ${!shouldLoad && animateReveal ? "fade-in" : ""}`}
        style={{ display: shouldLoad ? "none" : undefined }}
      >
        <div
          className={`${styles.content} page-shell`}
          id="page-content"
          tabIndex={-1}
        >
          <header className={styles.hero} id="top">
            <div className={styles.heroTopline}>
              <span>Computer science × financial markets</span>
              <span className={styles.heroLocation}>Based in Boston, MA</span>
            </div>
            <div className={styles.heroStage}>
              <h1 className={styles.heroTitle}>
                <span>Ashwin</span>{" "}
                <span>
                  Iyer<span className={styles.titleDot}>.</span>
                </span>
              </h1>
              <figure className={styles.heroVisual}>
                <HeroSurface active={!shouldLoad} />
                <figcaption className={styles.visualCaption}>
                  A surface, built from code.
                </figcaption>
              </figure>
            </div>
            <div className={styles.heroBody}>
              <div className={styles.heroCopy}>
                <p className={styles.heroLede}>
                  I build software and explore the systems behind financial
                  markets.
                </p>
                <p className={styles.heroDetail}>
                  A computer science student in Boston, working across Python,
                  Java, and TypeScript.
                </p>
                <div className={styles.heroActions}>
                  <a href="#selected-projects" className="button-primary">
                    Explore my work <span aria-hidden="true">↓</span>
                  </a>
                  <Link href="/resume" className={styles.heroLink}>
                    View résumé <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
              <LocalTime />
            </div>
            <div className={styles.heroFoot}>
              <div className={styles.heroSocial}>
                <a
                  href="https://github.com/Ashwin-Iyer1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/ashwin-hao-iyer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a href="mailto:ashwiniyer06@gmail.com">Email ↗</a>
              </div>
            </div>
          </header>
          <SectionNav />

          <section
            className={`${styles.section} ${styles.selectedWork}`}
            aria-labelledby="selected-projects"
          >
            <div className={styles.sectionHeading}>
              <div>
                <h2 className="section-title" id="selected-projects">
                  Selected work
                </h2>
                <p>From understanding risk to building something useful.</p>
              </div>
              <Link href="/projects">
                All projects <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <FeaturedProjects />
          </section>

          {/* Work Experience */}
          <section className={styles.section}>
            <h2 className="section-title" id="WorkingOn">
              Where I’ve been
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

          {/* Skills */}
          <section className={styles.section}>
            <h2 className="section-title">My toolkit</h2>
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
            <h2 className="section-title">A few more explorations</h2>
            <div className={styles.miscProjContainer}>
              <MiscProj />
            </div>
          </section>

          {/* Writing */}
          <section className={styles.section}>
            <div className={styles.sectionHeading}>
              <div>
                <h2 className="section-title" id="writing">
                  Notes & interests
                </h2>
                <p>
                  A little of what I’m learning, reading, and thinking about.
                </p>
              </div>
            </div>
            <BlogList initialLimit={4} />
          </section>

          {/* Now — live widgets */}
          <section className={styles.section} aria-labelledby="now-title">
            <h2 className="section-title" id="now-title">
              Away from the editor
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
          <section className={`${styles.section} ${styles.contactSection}`}>
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
          <div className={styles.bottomBar}>
            <button
              type="button"
              onClick={replayIntro}
              className={styles.replayIntro}
            >
              Replay the intro
            </button>
            <a href="#top" className={styles.backToTop}>
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
