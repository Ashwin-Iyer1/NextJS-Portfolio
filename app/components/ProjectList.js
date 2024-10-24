"use client";

import "./projects.module.css";
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import projects1 from '../data/repos.json';

export default function ProjectList() {
    const [projects, setProjects] = useState([]); // State for projects
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Attempt to fetch the data from the external API
                const res = await fetch(`/api/data`);
                
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                // Await the JSON response to get the projects array
                const data = await res.json(); // Make sure to await this
                const sortedProjects = data.sort((a, b) => a.reponame.localeCompare(b.reponame));
                setProjects(sortedProjects); // Set the fetched projects
            } catch (error) {
                console.error('Failed to fetch from API, falling back to local data:', error);
                
                // If the fetch fails, use the local JSON file
                const sortedLocalProjects = projects1.sort((a, b) => a.reponame.localeCompare(b.reponame));
                setProjects(sortedLocalProjects); // Use the local projects data
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchProjects(); // Call the fetch function
    }, []); // Empty dependency array to run once on mount

    // Loading skeleton placeholder
    if (loading) {
        return (
            <div className="Projects skeleton">
                {[...Array(3)].map((_, index) => ( // Display 3 placeholders
                    <div className="Project placeholder" key={index}>
                        <div className="skeleton-text" />
                        <div className="skeleton-description" />
                    </div>
                ))}
            </div>
        ); // Return loading skeleton
    }

    return (
        <div className="Projects">
            {projects.map((project, index) => {
                const hue = (index * (360 / projects.length)) % 360;  // Dynamically calculate hue
                const textColor = `hsl(${hue}, 70%, 50%)`;  // Saturation and Lightness are set for vivid colors
                const backgroundColor = `hsla(${hue}, 100%, 50%, 0.3)`;  // Add transparency to the background                    
                return (
                    <div className="Project" key={project.id} style={{border: `2px solid ${textColor}`, backgroundColor: backgroundColor}}>
                        <h2>
                            <a href={project.html_url} target='_blank' rel="noreferrer" style={{color: textColor}}>
                                {project.reponame}
                            </a>
                        </h2>
                        <p>{project.description}</p>
                    </div>
                );
            })}
        </div>
    );
}
