"use client";

import "./projects.module.css";
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import projects1 from "../data/repos.json";
import Grid from "@mui/material/Grid"; // Import Grid from Material-UI
export default function ProjectList() {
  const [projects, setProjects] = useState([]); // State for projects
  const [loading, setLoading] = useState(true); // State for loading

  const [allProjects, setAllProjects] = useState([]);

  const handleShowAll = () => {
    setProjects(allProjects);
  };

  useEffect(() => {
    const fetchProjects = async () => {
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

        setAllProjects(sortedProjects);
        setProjects(
          sortedProjects.filter(
            (project) => !list_to_remove.includes(project.reponame)
          )
        );
      } catch (error) {
        console.error(
          "Failed to fetch from API, falling back to local data:",
          error
        );

        // If the fetch fails, use the local JSON file
        const sortedLocalProjects = projects1.sort((a, b) =>
          a.reponame.localeCompare(b.reponame)
        );
        setAllProjects(sortedLocalProjects);
        setProjects(
          sortedLocalProjects.filter(
            (project) => !list_to_remove.includes(project.reponame)
          )
        );
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchProjects(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  // Loading skeleton placeholder
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="projects-grid"
          style={{
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="skeleton-card"
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)",
                borderRadius: "12px",
                padding: "24px",
                borderLeft: "4px solid #3a3a3a",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                minHeight: "200px",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  height: "28px",
                  background:
                    "linear-gradient(90deg, #3a3a3a 0%, #4a4a4a 50%, #3a3a3a 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                  borderRadius: "6px",
                  width: "70%",
                }}
              />
              <div
                style={{
                  height: "16px",
                  background:
                    "linear-gradient(90deg, #3a3a3a 0%, #4a4a4a 50%, #3a3a3a 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                  borderRadius: "4px",
                  width: "100%",
                  animationDelay: "0.1s",
                }}
              />
              <div
                style={{
                  height: "16px",
                  background:
                    "linear-gradient(90deg, #3a3a3a 0%, #4a4a4a 50%, #3a3a3a 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                  borderRadius: "4px",
                  width: "90%",
                  animationDelay: "0.2s",
                }}
              />
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }

          @media (max-width: 1160px) {
            .projects-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 8px !important;
              padding: 0 8px;
            }

            :global(.skeleton-card) {
              padding: 16px !important;
              min-height: 180px !important;
              border-radius: 8px !important;
            }
          }

          @media (max-width: 480px) {
            .projects-grid {
              gap: 6px !important;
              padding: 0 4px;
            }

            :global(.skeleton-card) {
              padding: 12px !important;
              min-height: 160px !important;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="projects-grid"
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {projects.map((project, index) => {
          const hue = (index * (360 / projects.length)) % 360;
          const accentColor = `hsl(${hue}, 70%, 55%)`;

          return (
            <div
              key={project.id || index}
              className="project-card"
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)",
                borderRadius: "12px",
                padding: "24px",
                border: `2px solid transparent`,
                borderLeftColor: accentColor,
                borderLeftWidth: "4px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                minHeight: "200px",
                position: "relative",
                overflow: "hidden",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px ${accentColor}`;
                e.currentTarget.style.borderLeftWidth = "6px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.borderLeftWidth = "4px";
              }}
            >
              {/* Subtle background gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100px",
                  pointerEvents: "none",
                }}
              />

              <h3
                style={{
                  color: accentColor,
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  margin: 0,
                  lineHeight: "1.4",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {project.reponame}
              </h3>

              <p
                style={{
                  color: "#b0b0b0",
                  fontSize: "0.9rem",
                  lineHeight: "1.6",
                  margin: 0,
                  flex: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {project.description || "No description available"}
              </p>

              {/* View project indicator */}
              <a
                href={project.html_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: accentColor,
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    marginTop: "auto",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span>View Project</span>
                  <span style={{ fontSize: "1rem" }}>→</span>
                </div>
              </a>
            </div>
          );
        })}
        {projects.length !== allProjects.length && (
          <button
            onClick={handleShowAll}
            style={{
              gridColumn: "1 / -1",
              padding: "16px 32px",
              background: "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              margin: "20px auto 0",
              display: "block",
              width: "fit-content",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
              e.currentTarget.style.borderColor = "#555";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.borderColor = "#333";
            }}
          >
            Show All Projects ({allProjects.length - projects.length} hidden)
          </button>
        )}
      </div>
      <style jsx>{`
        @media (max-width: 1160px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
            padding: 0 8px;
          }

          :global(.project-card) {
            padding: 16px !important;
            min-height: 180px !important;
            border-radius: 8px !important;
          }

          :global(.project-card) h3 {
            font-size: 1rem !important;
          }

          :global(.project-card) p {
            font-size: 0.8rem !important;
          }
        }

        @media (max-width: 480px) {
          .projects-grid {
            gap: 6px !important;
            padding: 0 4px;
          }

          :global(.project-card) {
            padding: 12px !important;
            min-height: 160px !important;
          }

          :global(.project-card) h3 {
            font-size: 0.9rem !important;
          }

          :global(.project-card) p {
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
}
