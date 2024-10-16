import "./projects.css";
import React from 'react';
import Bar from '../components/Bar';
import projects from '../components/projects.json'
const removeAlpha = (color) => {
    // Remove the last two characters (alpha value) from the color string
    return color.slice(0, -2);
};

function Projects(){
    return (
        <div className="Project1">
            <Bar />
            <div className="BG" />
            <h2 id="WorkingOnP">Projects</h2>
        <div className="Projects">
                {projects.map((project) => {
                    return (
                        <div className="Project" style={{backgroundColor: project.color, border: "2px solid " + removeAlpha(project.color)}}>
                            <h2><a href={project.link} target='_blank' rel="noreferrer" style={{color:removeAlpha(project.color)}}>{project.name}</a></h2>
                            <p>{project.description}</p>
                            
                        </div>
                    )
                })}
        </div></div>
    );
}

export default Projects;