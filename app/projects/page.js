import "./projects.module.css";
import React from "react"; // Import useEffect and useState
import Bar from "../components/Bar";

import ProjectList from "../components/ProjectList";

export default function Projects() {
  return (
    <div className="Project1">
      <Bar />
      <div className="BG" />
      <h2 id="WorkingOnP">Projects</h2>
      <ProjectList />
    </div>
  );
}
