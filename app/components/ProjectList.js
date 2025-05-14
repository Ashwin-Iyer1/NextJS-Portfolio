"use client";

import "./projects.module.css";
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import projects1 from "../data/repos.json";
import Grid from "@mui/material/Grid"; // Import Grid from Material-UI
export default function ProjectList() {
  const [projects, setProjects] = useState([]); // State for projects
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Attempt to fetch the data from the external API
        const res = await fetch(`/api/data`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        // Await the JSON response to get the projects array
        const data = await res.json(); // Make sure to await this
        const sortedProjects = data.sort((a, b) =>
          a.reponame.localeCompare(b.reponame)
        );
        setProjects(sortedProjects); // Set the fetched projects
      } catch (error) {
        console.error(
          "Failed to fetch from API, falling back to local data:",
          error
        );

        // If the fetch fails, use the local JSON file
        const sortedLocalProjects = projects1.sort((a, b) =>
          a.reponame.localeCompare(b.reponame)
        );
        setProjects(sortedLocalProjects); // Use the local projects data
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchProjects(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  // Loading skeleton placeholder
  if  (true) {
  return (
    <Grid
      container
      rowSpacing={1}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 6, sm: 9, md: 12 }}
      sx={{ alignContent: "center", textAlign: "center" }}
      flexWrap={"wrap"}
    >
      {[...Array(16)].map((_, index) => (
          <Grid
            size={3}
            sx={{
              border: `2px solid gray`,
              bgcolor: "white",
              boxShadow: `2px 3px gray`,
              borderRadius: 1,
            }}
            key={index}
          >
            <h2>
              <a
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
              >
                Lorem ipsum
              </a>
            </h2>
            <p style={{ color: "white" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut </p>
        </Grid>
      ))}
    </Grid>
  );
}


  return (
    <Grid
      container
      rowSpacing={1}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 6, sm: 9, md: 12 }}
      sx={{ alignContent: "center", textAlign: "center" }}
      flexWrap={"wrap"}
    >
      {projects.map((project, index) => {
        const hue = (index * (360 / projects.length)) % 360; // Dynamically calculate hue
        const textColor = `hsl(${hue}, 70%, 50%)`; // Saturation and Lightness are set for vivid colors
        const backgroundColor = `hsla(${hue}, 100%, 50%, 0.3)`; // Add transparency to the background
        return (
          <Grid
            size={3}
            sx={{
              border: `2px solid ${textColor}`,
              bgcolor: backgroundColor,
              boxShadow: `2px 3px ${textColor}`,
              borderRadius: 1,
            }}
          >
            <h2>
              <a
                href={project.html_url}
                target="_blank"
                rel="noreferrer"
                style={{ color: textColor }}
              >
                {project.reponame}
              </a>
            </h2>
            <p style={{ color: "white" }}>{project.description}</p>
          </Grid>
        );
      })}
    </Grid>
  );
}
