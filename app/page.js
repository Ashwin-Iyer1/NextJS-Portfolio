"use client";
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import NEU from "./Images/NEU.webp";
import NameAnim from "./components/NameAnim.js";
import Links from "./components/Links.js";
import projects from "./data/repos.json";
import Image from "next/image";
import Link from "next/link";
import Skills from "./components/Skills.js";
import Contact from "./components/Contact.js";
import GetTime from "./components/getTime.js";
import MiscProj from "./components/MiscProj";
import Bar from "./components/Bar";
import BlogList from "./components/BlogList";
export default function Home() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); // New state for fade out
  const [fadeIn, setFadeIn] = useState(false); // New state for fade in

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
          <h2>Freshman at Northeastern University</h2>
          <p>
            I am currently a freshman at Northeastern University in Boston,
            Massachusetts, and I am interested in computer science. I am
            currently learning Python, Kotlin, and JavaScript.{" "}
            <Link href="/about">Learn more about me!</Link>
          </p>
        </div>
        <div className="Info">
          <Links />
          <div className="Working">
            <h2>Current coding time</h2>
            <GetTime />
          </div>
          <div className="College">
            <Image src={NEU} id={"person"} alt="Northeastern" />
          </div>
        </div>
        <div>
          <h2 id="WorkingOn">Projects</h2>
          <div className="Projects">
            {projects.slice(0, 4).map((project, index) => {
              const hue = (index * (360 / projects.length)) % 360; // Dynamically calculate hue
              const textColor = `hsl(${hue}, 70%, 50%)`; // Saturation and Lightness are set for vivid colors
              const backgroundColor = `hsla(${hue}, 100%, 50%, 0.3)`; // Add transparency to the background
              return (
                <div
                  className="Project"
                  style={{
                    border: `2px solid ${textColor}`,
                    backgroundColor: backgroundColor,
                    boxShadow: `2px 3px ${textColor}`,
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
                  <p>{project.description}</p>
                </div>
              );
            })}
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
        <h2 style={{ textAlign: "center", fontSize: "2em" }}>Miscellaneous Projects</h2>
        <MiscProj />
        <h2 style={{ textAlign: "center", fontSize: "2em" }}>My Blogs</h2>
        <BlogList />
      </div>
      <div className="Contact">
        <h2 style={{ textAlign: "center", fontSize: "2em" }}>Contact Me</h2>
        <Contact />
        <p>
          Email:{" "}
          <a href="mailto:ashwiniyer06@gmail.com">ashwiniyer06@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
