import "./projects.css";
import Bar from "../components/Bar";

import ProjectList from "../components/ProjectList";

export default function Projects() {
  return (
    <div className="projects-page">
      <Bar />
      <div className="projects-content">
        <header className="projects-header">
          <h2 className="section-title">Projects</h2>
          <p className="projects-intro">
            A working index of things I&apos;ve built — search by name,
            description, or technology.
          </p>
        </header>
        <ProjectList />
      </div>
    </div>
  );
}
