import React from "react";
import "./Bar.css";
import Link from "next/link";
export default function Bar() {
  return (
    <div className="Bar">
      <div className="name-section">
        <h1>Ashwin Iyer</h1>
      </div>
      <div className="links-section">
        <Link href="/">
          <h2>Home</h2>
        </Link>
        <Link href="/projects">
          <h2>Projects</h2>
        </Link>
        <Link href="/about">
          <h2>About</h2>
        </Link>
      </div>
    </div>
  );
}
