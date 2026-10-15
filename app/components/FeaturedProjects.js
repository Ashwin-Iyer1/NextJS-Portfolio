import Link from "next/link";
import { featuredProjects } from "../data/projects";
import ProjectArtwork from "./ProjectArtwork";
import styles from "./FeaturedProjects.module.css";

export default function FeaturedProjects() {
  return (
    <div className={styles.grid}>
      {featuredProjects.map((project, index) => (
        <article className={styles.project} key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className={styles.artLink}
            aria-label={`${project.title} case study`}
          >
            <ProjectArtwork slug={project.slug} category={project.category} />
          </Link>
          <div className={styles.copy}>
            <span className={styles.projectIndex}>
              0{index + 1} / {project.discipline}
            </span>
            <h3>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
            <div className={styles.details}>
              <p>{project.description}</p>
              <p className={styles.proof}>
                {project.facts[0].value} · {project.facts[0].label}
              </p>
              <div className={styles.footer}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={styles.source}
                >
                  Read the case study →
                </Link>
                <a
                  href={project.demo}
                  className={styles.source}
                  aria-label={`Try ${project.title}`}
                >
                  Try it ↗
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
