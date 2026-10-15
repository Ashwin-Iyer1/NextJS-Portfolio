import "./projects.css";

import ProjectList from "../components/ProjectList";
import { projects } from "../data/projects";

export const metadata = {
  title: "Projects — Ashwin Iyer",
  description:
    "Interactive tools, mathematical research, and engineering case studies. Explore the demos, inspect the source, and understand the decisions behind each project.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return (
    <div className="projects-page">
      <div
        className="page-shell projects-content"
        id="page-content"
        tabIndex={-1}
      >
        <header className="projects-header">
          <h1 className="section-title">Projects</h1>
          <p className="projects-intro">
            Software you can try. Research you can inspect. A collection of
            mathematical tools and engineering projects, with the
            implementation, tradeoffs, and evidence behind each one.
          </p>
        </header>
        <ProjectList
          projects={projects.map(
            ({
              slug,
              title,
              description,
              category,
              discipline,
              tags,
              demo,
            }) => ({
              slug,
              title,
              description,
              category,
              discipline,
              tags,
              demo,
            }),
          )}
        />
      </div>
    </div>
  );
}
