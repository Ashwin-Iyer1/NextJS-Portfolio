import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProject } from "../../data/projects";
import ProjectArtwork from "../../components/ProjectArtwork";
import styles from "./study.module.css";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Ashwin Iyer`,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} — Ashwin Iyer`,
      description: project.description,
      url: `/projects/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: project.title,
      description: project.description,
    },
  };
}

function EvidenceLink({ href, children, className }) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

export default async function ProjectStudy({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const related = projects
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.discipline === project.discipline) -
        Number(a.discipline === project.discipline),
    )
    .slice(0, 2);
  return (
    <article
      className={`page-shell ${styles.page}`}
      id="page-content"
      tabIndex={-1}
    >
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/projects">Projects</Link>
        <span aria-hidden="true">/</span>
        <span>{project.shortTitle}</span>
      </nav>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>{project.category}</p>
          <h1>{project.title}</h1>
          <p className={styles.kicker}>{project.kicker}</p>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.actions}>
            {project.demo && (
              <a className="button-primary" href={project.demo}>
                {project.demoLabel}
                <span aria-hidden="true"> ↗</span>
              </a>
            )}
            <EvidenceLink href={project.source} className={styles.textLink}>
              Explore source
            </EvidenceLink>
            {project.live && (
              <EvidenceLink href={project.live} className={styles.textLink}>
                {slug === "equity-volatility"
                  ? "Read presentation"
                  : "Project website"}
              </EvidenceLink>
            )}
          </div>
          <p className={styles.demoNote}>
            {project.demoNote ||
              "Collaborative research, with the original presentation and source linked directly."}
          </p>
        </div>
        <div className={styles.art}>
          <ProjectArtwork slug={slug} category={project.status} />
        </div>
      </header>
      <dl className={styles.facts}>
        {project.facts.map(({ value, label }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        <div>
          <dt>Contribution</dt>
          <dd className={styles.role}>{project.role}</dd>
        </div>
      </dl>
      <nav className={styles.contents} aria-label="Case study sections">
        <a href="#overview">Overview</a>
        <a href="#workflow">Workflow</a>
        <a href="#architecture">Architecture</a>
        <a href="#decisions">Decisions</a>
        <a href="#evidence">Evidence</a>
      </nav>
      <section
        className={styles.overview}
        id="overview"
        aria-labelledby="overview-title"
      >
        <div>
          <p className={styles.eyebrow}>01 / The problem</p>
          <h2 id="overview-title">{project.kicker}</h2>
        </div>
        <div className={styles.prose}>
          <p>{project.problem}</p>
          <p>{project.solution}</p>
        </div>
      </section>
      <section
        className={styles.workflow}
        id="workflow"
        aria-labelledby="workflow-title"
      >
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>02 / In practice</p>
            <h2 id="workflow-title">Follow the workflow.</h2>
          </div>
          {project.demo && (
            <a href={project.demo} className={styles.textLink}>
              {project.demoLabel} ↗
            </a>
          )}
        </div>
        <ol className={styles.steps}>
          {project.workflow.map((step, index) => (
            <li key={step}>
              <span aria-hidden="true">0{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
        {project.demo && (
          <figure className={styles.productPreview}>
            <a href={project.demo} aria-label={`Open ${project.title} demo`}>
              <Image
                src={`/Images/project-previews/${slug}.png`}
                alt={`${project.title} interface with example inputs and results`}
                width={1440}
                height={900}
                sizes="(max-width: 700px) 100vw, 90vw"
              />
            </a>
            <figcaption>
              Actual interface ·{" "}
              {slug === "factor-risk" || slug === "fantasy-draft"
                ? "Public research snapshot"
                : "Example data"}
              . Open the demo to change the inputs and inspect the results.
            </figcaption>
          </figure>
        )}
        {project.demo && (
          <div className={styles.tryPanel}>
            <div>
              <strong>A working interface, ready to explore.</strong>
              <p>{project.demoNote}</p>
            </div>
            <a href={project.demo} className="button-primary">
              Launch demo ↗
            </a>
          </div>
        )}
      </section>
      <section
        id="architecture"
        className={styles.section}
        aria-labelledby="architecture-title"
      >
        <p className={styles.eyebrow}>03 / Under the hood</p>
        <h2 id="architecture-title">How the pieces fit.</h2>
        <ol className={styles.pipeline}>
          {project.architecture.map((stage, index) => (
            <li key={stage.title}>
              <span className={styles.stageNumber}>0{index + 1}</span>
              <h3>{stage.title}</h3>
              <p>{stage.detail}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        id="decisions"
        className={styles.section}
        aria-labelledby="decisions-title"
      >
        <p className={styles.eyebrow}>04 / Engineering judgment</p>
        <h2 id="decisions-title">Decisions & tradeoffs.</h2>
        <div className={styles.decisions}>
          {project.decisions.map((decision) => (
            <div key={decision.title}>
              <h3>{decision.title}</h3>
              <p>{decision.detail}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="evidence"
        className={styles.section}
        aria-labelledby="evidence-title"
      >
        <p className={styles.eyebrow}>05 / Inspect the work</p>
        <h2 id="evidence-title">Evidence, with context.</h2>
        <div className={styles.evidence}>
          {project.evidence.map((item) => (
            <EvidenceLink
              key={item.href}
              href={item.href}
              className={styles.evidenceCard}
            >
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </EvidenceLink>
          ))}
        </div>
        <aside className={styles.limits}>
          <h3>Scope & limitations</h3>
          <p>{project.limitations}</p>
        </aside>
      </section>
      <section className={styles.related} aria-labelledby="related-title">
        <div>
          <p className={styles.eyebrow}>Keep exploring</p>
          <h2 id="related-title">More selected work.</h2>
        </div>
        {related.map((item) => (
          <Link key={item.slug} href={`/projects/${item.slug}`}>
            <span>{item.category}</span>
            <strong>{item.title}</strong>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>
    </article>
  );
}
