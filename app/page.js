"use client";
import React, { lazy, Suspense, useRef, useEffect, useState } from "react";
const NEU = "/Images/NEU.webp";
import NameAnim from "./components/NameAnim.js";
import Links from "./components/Links.js";
import projects from "./data/repos.json";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import Skills from "./components/Skills.js";
import Contact from "./components/Contact.js";
import GetTime from "./components/getTime.js";
import Bar from "./components/Bar";
import BlogList from "./components/BlogList";
import Stack from "@mui/material/Stack";
import useIntersectionObserver from "./components/useIntersectionObserver";
import List from "@mui/material/List";
import "./landing.css";
const zealImage = "/Images/zeal.png";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const LazyMiscProj = lazy(() => import("./components/MiscProj"));

const workDateFormat = (date) => {
  return <span style={{ backgroundColor: "#6E6E6E90", padding: "2px 4px", borderRadius: "4px" }}>{date}</span>;
};

export default function Home() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [forceMiscProjLoad, setForceMiscProjLoad] = useState(false);
  const miscProjSection = useRef(null);
  const isMiscProjVisible = useIntersectionObserver(miscProjSection);

  // Add this effect to force load MiscProj component after main content appears
  useEffect(() => {
    if (fadeIn) {
      // Small delay to ensure intersection observer has initialized
      const timer = setTimeout(() => {
        setForceMiscProjLoad(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fadeIn]);

  useEffect(() => {
    if (sessionStorage.getItem("loaded") === null) {
      setShouldLoad(true);
      setTimeout(() => {
        setFadeOut(true); // Start fade-out
        sessionStorage.setItem("loaded", "true");

        // Wait for the fade-out duration before removing the loader
        setTimeout(() => {
          setShouldLoad(false);
          setFadeIn(true); // Start fade-in
        }, 400); // Adjust this duration to match your CSS fade-out time
      }, 2200);
    } else {
      // If already loaded previously, set fadeIn true immediately
      setFadeIn(true);
    }
  }, []);

  if (shouldLoad) {
    return (
      <div className={`fade-out ${fadeOut ? "fade" : ""}`}>
        <NameAnim />
      </div>
    );
  }
  return (
    <div className={`Home ${fadeIn ? "fade-in" : ""}`}>
      <Bar />
      <div className="Container">
        <div className="basic">
          <h2>Rising Sophomore at Northeastern University</h2>
          <p>
            I am currently a rising sophomore at Northeastern University in
            Boston, Massachusetts, and I am interested in computer science. I am
            currently learning Python, Kotlin, and JavaScript.{" "}
            <Link href="/about">Learn more about me!</Link>
          </p>
        </div>
        <div className="Info">
          <Links />
          <Box
            sx={{
              bgcolor: "blueviolet",
              borderRadius: 1,
              boxShadow: "10px 10px #260c3e",
            }}
            className="Time"
          >
            <div className="Working">
              <h2>Current coding time</h2>
              <GetTime />
            </div>
          </Box>
          <div className="College">
            <Image
              src={NEU}
              id={"person"}
              alt="Northeastern"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div>
          <div className="workExperience">
            <h2 id="WorkingOn">Work Experience</h2>
            <List sx={{ width: "100%", color: "white" }}>
              <ListItem>
                <ListItemAvatar>
                  <Box>
                    <img src={zealImage} alt="Zeal" height={50} />
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <b>Zeal IT Consultants</b>{" "}
                      {workDateFormat("May 2025 - August 2025")}
                    </>
                  }
                  secondary="Frontend Developer Intern"
                  sx={{
                    color: "white",
                    "& .MuiListItemText-secondary": { color: "white" },
                  }}
                />
              </ListItem>
            </List>
          </div>
          <div className="Projects">
            <h2 id="WorkingOn">Projects</h2>
            <Stack
              spacing={{ xs: 1, sm: 1 }}
              direction="row"
              useFlexGap
              sx={{
                flexWrap: "wrap",
                margin: "0 auto",
              }}
              className="ProjectStack"
            >
              {projects.slice(0, 4).map((project, index) => {
                const hue = (index * (360 / projects.length)) % 360; // Dynamically calculate hue
                const textColor = `hsl(${hue}, 70%, 50%)`; // Saturation and Lightness are set for vivid colors
                const backgroundColor = `hsla(${hue}, 100%, 50%, 0.3)`; // Add transparency to the background
                return (
                  <Box
                    sx={{
                      border: `2px solid ${textColor}`,
                      bgcolor: backgroundColor,
                      boxShadow: `2px 3px ${textColor}`,
                      borderRadius: 1,
                      height: "130px",
                      maxWidth: "400px",
                      width: "100%",
                    }}
                    key={project.reponame}
                  >
                    <h2 style={{ paddingLeft: "10px" }}>
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: textColor }}
                      >
                        {project.reponame}
                      </a>
                    </h2>
                    <p style={{ color: "white", paddingLeft: "10px" }}>
                      {project.description}
                    </p>
                  </Box>
                );
              })}
            </Stack>
          </div>
          <h3>
            <Link className="SeeAllText" href="/projects">
              See All
            </Link>
          </h3>
        </div>
        <h2 style={{ textAlign: "center", fontSize: "2em" }}>Skills</h2>
        <Skills />
      </div>
      <div className="MiscProj">
        <h2 style={{ textAlign: "center", fontSize: "2em" }}>
          Miscellaneous Projects
        </h2>
        <div className="MiscProjContainer" ref={miscProjSection}>
          {(isMiscProjVisible || fadeIn || forceMiscProjLoad) && (
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <LazyMiscProj />
            </Suspense>
          )}
        </div>
        <h2 style={{ textAlign: "center", fontSize: "2em" }}>My Blogs</h2>
        <BlogList />
      </div>
      <div className="Contact">
        <h2 style={{ textAlign: "center", fontSize: "2em" }}>Contact Me</h2>
        <Contact />
        <p style={{ margin: "0 auto", marginTop: "16px" }}>
          Email:{" "}
          <a href="mailto:ashwiniyer06@gmail.com">ashwiniyer06@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
