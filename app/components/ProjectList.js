"use client";
import Link from "next/link";
import { useState } from "react";
import ProjectArtwork from "./ProjectArtwork";
import styles from "./ProjectList.module.css";

export default function ProjectList({ projects }) {
  const [filter, setFilter] = useState("");
  const [discipline, setDiscipline] = useState("All");
  const query = filter.trim().toLowerCase();
  const displayed = projects.filter(
    (p) =>
      (discipline === "All" || p.discipline === discipline) &&
      `${p.title} ${p.description} ${p.category} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(query),
  );
  function reset() {
    setFilter("");
    setDiscipline("All");
  }
  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="search"
          className={styles.searchInput}
          aria-label="Search projects"
          placeholder="Search projects, ideas, or technologies"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filter && (
          <button
            className={styles.clearButton}
            onClick={() => setFilter("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <div className={styles.toolbar}>
        <div className={styles.disciplines} aria-label="Project disciplines">
          {["All", "Engineering & AI", "Quant & data"].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={discipline === value}
              onClick={() => setDiscipline(value)}
            >
              {value === "All" ? "All work" : value}
            </button>
          ))}
        </div>
        <span className={styles.projectCount} role="status">
          {displayed.length} project{displayed.length === 1 ? "" : "s"}
        </span>
      </div>
      {(query || discipline !== "All") && (
        <div className={styles.collectionControls}>
          <button type="button" onClick={reset}>
            Reset filters
          </button>
        </div>
      )}
      {displayed.length ? (
        <div className={styles.studies}>
          {displayed.map((p, i) => (
            <article className={styles.study} key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className={styles.artLink}
                aria-label={`${p.title} case study`}
              >
                <ProjectArtwork slug={p.slug} category={p.category} />
              </Link>
              <div className={styles.studyCopy}>
                <span className={styles.studyMeta}>
                  0{i + 1} / {p.category}
                </span>
                <h2>
                  <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                </h2>
                <p>{p.description}</p>
                <div className={styles.tags}>
                  {p.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.studyLinks}>
                  <Link href={`/projects/${p.slug}`}>Read case study →</Link>
                  {p.demo && <a href={p.demo}>Launch demo ↗</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>No matching projects</h2>
          <p>Try another topic or explore all selected work.</p>
          <button type="button" className="button-secondary" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
      <div className={styles.archiveLink}>
        <p>
          Looking for the rest? Older experiments and smaller utilities live on
          GitHub.
        </p>
        <a
          href="https://github.com/Ashwin-Iyer1?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          Browse the full repository archive ↗
        </a>
      </div>
    </div>
  );
}
