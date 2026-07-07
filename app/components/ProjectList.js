"use client";

import React, { useEffect, useState, useRef } from "react";
import projects1 from "../data/repos.json";
import styles from "./ProjectList.module.css";

// Tech/language labels per repository. The repo data source only exposes
// name/description/url, so tags are maintained here (primary language from
// GitHub, plus a domain hint).
const TECH_TAGS = {
  "7110A-Website": ["JavaScript", "Web"],
  "7110A_Code": ["C++", "Robotics"],
  ArbitrageFinder: ["Python", "Trading"],
  AskGPT: ["Lua", "KOReader"],
  "Chess-Bot-using-OpenCV": ["Python", "OpenCV"],
  Cookle: ["JavaScript", "Game"],
  "Email-Writer-with-web-search": ["Python", "Selenium"],
  FourierSeries: ["HTML", "Math"],
  "Fridge Flow": ["App"],
  "Game-Pigeon-Anagrams": ["Python", "Automation"],
  GPTvsGeminiTrader: ["Python", "LLMs", "Trading"],
  HerImpact: ["Web"],
  homereadypro: ["JavaScript", "Hackathon"],
  insta_confirm_action: ["JavaScript"],
  insta_following_order: ["HTML"],
  IVTrading: ["Python", "Trading"],
  "marketviewr.koreader": ["Lua", "KOReader"],
  MLProjects: ["Python", "ML"],
  "NextJS-Portfolio": ["Next.js", "React"],
  "Northeastern-Co-op-Prestige-Hunt": ["Python", "Data"],
  "NUWorks-Co-op-grader": ["Python", "Web"],
  openai_merch_bot: ["Python", "Telegram"],
  "Oura-message-bot": ["Python", "Automation"],
  "oura-npm": ["TypeScript", "React"],
  "pm-tradingdesk": ["Python", "Trading"],
  PolymarketArbitrage: ["Python", "Trading"],
  "Pomodoro-App": ["TypeScript"],
  "Pothole-detector": ["Python", "ML"],
  ReactPortfolio: ["React", "JavaScript"],
  resume: ["LaTeX"],
  row2reach: ["JavaScript", "Automation"],
  SkyblockSniper: ["Python", "APIs"],
  Stridez: ["Next.js", "MySQL"],
  studentsdrivesafe: ["JavaScript", "ML"],
  Tactus: ["Web"],
  tiktodv4: ["Python", "Selenium"],
  "TikTok-Video-Creator": ["Python", "Automation"],
};

const getTags = (project) => TECH_TAGS[project.reponame] || [];

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
  const [filter, setFilter] = useState("");
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  const list_to_remove = [
    "7110A_Code",
    "7110A-Website",
    "AskGPT",
    "Cookle",
    "Email-Writer-with-web-search",
    "homereadypro",
    "marketviewr.koreader",
    "openai_merch_bot",
    "Ashwin-Iyer1",
    "Pomodoro-App",
    "ReactPortfolio",
    "resume",
    "tiktodv4",
    "TikTok-Video-Creator",
    "HerImpact",
    "Game-Pigeon-Anagrams",
    "GPTvsGeminiTrader",
    "",
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`/api/data`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        const sorted = data.sort((a, b) =>
          a.reponame.localeCompare(b.reponame)
        );
        sorted.forEach((project) => {
          if (project.reponame === "NUWorks-Co-op-grader") {
            project.html_url = "https://nucoop.app/";
          }
        });
        setAllProjects(sorted);
        setProjects(
          sorted.filter((p) => !list_to_remove.includes(p.reponame))
        );
      } catch {
        const sorted = [...projects1].sort((a, b) =>
          a.reponame.localeCompare(b.reponame)
        );
        setAllProjects(sorted);
        setProjects(
          sorted.filter((p) => !list_to_remove.includes(p.reponame))
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setVisibleCards((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [projects, filter, loading]);

  const handleShowAll = () => {
    setProjects(allProjects);
  };

  const query = filter.trim().toLowerCase();
  const displayed = query
    ? projects.filter(
        (p) =>
          p.reponame.toLowerCase().includes(query) ||
          (p.description || "").toLowerCase().includes(query) ||
          getTags(p).some((tag) => tag.toLowerCase().includes(query))
      )
    : projects;

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <div className={styles.searchSkeleton} />
        </div>
        <div className={styles.grid}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`${styles.card} ${styles.skeleton}`}>
              <div className={styles.skeletonLine} style={{ width: "30%" }} />
              <div
                className={styles.skeletonLine}
                style={{ width: "70%", height: "20px" }}
              />
              <div className={styles.skeletonLine} style={{ width: "90%" }} />
              <div className={styles.skeletonLine} style={{ width: "60%" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <svg
          className={styles.searchIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search projects..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.searchInput}
          aria-label="Search projects"
        />
        <span className={styles.projectCount}>
          {displayed.length} project{displayed.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className={styles.grid}>
        {displayed.map((project, index) => {
          const num = String(index + 1).padStart(2, "0");
          const isVisible = visibleCards.has(index);
          const tags = getTags(project);

          return (
            <a
              key={project.id || index}
              href={project.html_url}
              target="_blank"
              rel="noreferrer"
              className={`${styles.card} ${isVisible ? styles.cardVisible : ""}`}
              style={{ animationDelay: `${(index % 6) * 0.06}s` }}
              ref={(el) => (cardRefs.current[index] = el)}
              data-idx={index}
            >
              <div className={styles.cardInner}>
                <span className={styles.index}>{num}</span>
                <div className={styles.cardContent}>
                  <h3 className={styles.title}>{project.reponame}</h3>
                  <p className={styles.description}>
                    {project.description || "No description available"}
                  </p>
                </div>
                <div className={styles.cardFooter}>
                  {tags.length > 0 && (
                    <div className={styles.tags}>
                      {tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className={styles.viewLink}>
                    View
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {projects.length !== allProjects.length && (
        <button onClick={handleShowAll} className={styles.showAllBtn}>
          Show {allProjects.length - projects.length} more projects
        </button>
      )}
    </div>
  );
}
