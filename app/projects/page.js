import "./projects.css";
import React from 'react';
import Bar from '../components/Bar';
import projects from '../data/repos.json';

function Projects(){
    return (
        <div className="Project1">
            <Bar />
            <div className="BG" />
            <h2 id="WorkingOnP">Projects</h2>
        <div className="Projects">
                {projects.map((project, index) => {
                      const hue = (index * (360 / projects.length)) % 360;  // Dynamically calculate hue
                      const textColor = `hsl(${hue}, 70%, 50%)`;  // Saturation and Lightness are set for vivid colors
                      const backgroundColor = `hsla(${hue}, 100%, 50%, 0.3)`;  // Add transparency to the background                    
                    return (
                        <div className="Project" style={{border: `2px solid ${textColor}`, backgroundColor: backgroundColor}}>
                            <h2><a href={project.html_url} target='_blank' rel="noreferrer" style={{color: textColor}}>{project.name}</a></h2>
                            <p>{project.description}</p>
                            
                        </div>
                    )
                })}
        </div></div>
    );
}

export default Projects;