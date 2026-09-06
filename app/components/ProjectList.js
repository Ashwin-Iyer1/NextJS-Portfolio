"use client";

import { useEffect, useMemo, useState } from "react";
import savedProjects from "../data/repos.json";
import { getTags } from "../data/projectTags";
import styles from "./ProjectList.module.css";

const EXCLUDED_PROJECTS = [
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

function normalizeProjects(data) {
  if (!Array.isArray(data)) throw new Error("Invalid project data");
  return data
    .filter(
      (project) =>
        typeof project.reponame === "string" &&
        /^https?:\/\//.test(project.html_url),
    )
    .map((project) => ({
      ...project,
      html_url:
        project.reponame === "NUWorks-Co-op-grader"
          ? "https://nucoop.app/"
          : project.html_url,
    }));
}

export default function ProjectList() {
  const [allProjects, setAllProjects] = useState(() =>
    normalizeProjects(savedProjects),
  );
  const [filter, setFilter] = useState("");
  const [technology, setTechnology] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [sort, setSort] = useState("asc");
  const [source, setSource] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    let active = true;
    fetch("/api/data", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Projects unavailable");
        return res.json();
      })
      .then((data) => {
        const projects = normalizeProjects(data);
        if (active) {
          setAllProjects(projects);
          setSource("live");
        }
      })
      .catch(() => {
        if (active) setSource("saved");
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const projects = useMemo(
    () =>
      showAll
        ? allProjects
        : allProjects.filter((p) => !EXCLUDED_PROJECTS.includes(p.reponame)),
    [allProjects, showAll],
  );
  const technologies = [...new Set(allProjects.flatMap(getTags))].sort();
  const query = filter.trim().toLowerCase();
  const displayed = projects
    .filter(
      (p) =>
        (technology === "All" || getTags(p).includes(technology)) &&
        (!query ||
          `${p.reponame} ${p.description || ""} ${getTags(p).join(" ")}`
            .toLowerCase()
            .includes(query)),
    )
    .sort((a, b) =>
      sort === "asc"
        ? a.reponame.localeCompare(b.reponame)
        : b.reponame.localeCompare(a.reponame),
    );

  function resetFilters() {
    setFilter("");
    setTechnology("All");
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <svg
          className={styles.searchIcon}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder="Search by name, description, or technology"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.searchInput}
          aria-label="Search projects"
        />
        {filter && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => setFilter("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <label>
            Technology
            <select
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
            >
              <option value="All">All technologies</option>
              {technologies.map((tag) => (
                <option key={tag}>{tag}</option>
              ))}
            </select>
          </label>
          <label>
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="asc">Name: A–Z</option>
              <option value="desc">Name: Z–A</option>
            </select>
          </label>
        </div>
        <span className={styles.projectCount} role="status">
          {displayed.length} project{displayed.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className={styles.collectionControls}>
        <label>
          <input
            type="checkbox"
            checked={showAll}
            onChange={(e) => setShowAll(e.target.checked)}
          />{" "}
          Include smaller experiments
        </label>
        {(query || technology !== "All") && (
          <button type="button" onClick={resetFilters}>
            Reset filters
          </button>
        )}
      </div>
      {source !== "live" && (
        <p className={styles.sourceNote}>
          {source === "loading"
            ? "Checking for the latest projects…"
            : "Showing saved projects. The latest updates are temporarily unavailable."}
        </p>
      )}
      {displayed.length ? (
        <div className={styles.grid}>
          {displayed.map((project) => (
            <a
              key={project.reponame}
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} ${styles.cardVisible}`}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardContent}>
                  <h2 className={styles.title}>{project.reponame}</h2>
                  <p className={styles.description}>
                    {project.description ||
                      "Explore the source code and project details."}
                  </p>
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.tags}>
                    {getTags(project).map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className={styles.viewLink}>
                    View <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>No matching projects</h2>
          <p>
            Try another search or technology
            {!showAll ? ", or include smaller experiments" : ""}.
          </p>
          <button
            type="button"
            className="button-secondary"
            onClick={resetFilters}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
