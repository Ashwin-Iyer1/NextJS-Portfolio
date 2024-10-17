import React from 'react';
import NEU from './Images/NEU.webp';
import Links from './components/Links.js';
import projects from './data/repos.json';
import Image from 'next/image'
import Link from 'next/link';

const removeAlpha = (color) => {
    // Remove the last two characters (alpha value) from the color string
    return color.slice(0, -2);
};

export default function Home() {
        return (
            <div className="Home">
                <div className="Container">
                    <div className="basic">
                        <h1>Ashwin Iyer</h1>
                        <h2>Freshman at Northeastern University</h2>
                        <p>I am currently a freshman at Northeastern University in Boston, Massachusetts, and I am interested in computer science.
                        I am currently learning Python, Java, and JavaScript. <Link href='/about'>Learn more about me!</Link></p>
                    </div>
                    <div className="Info">
                        <Links />
                        <div className="Working">
                            <h2>Currently Working on</h2>
                            <p>Personal Projects</p>
                        </div>
                        <div className="College">
                            <Image src={NEU} id={'person'} alt="Northeastern" />
                        </div>
                    </div>
                    <div>
                        <h2 id="WorkingOn">Projects</h2>
                        <div className="Projects">
                            {projects.slice(0, 4).map((project, index) => {
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
                        </div>
                        <h3><Link className="SeeAllText" href="/projects">See All</Link></h3>
                    </div>
                </div>

            </div>
        );
    }

