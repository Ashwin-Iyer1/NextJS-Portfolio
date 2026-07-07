import "./resume.css";
import React from "react";
import Bar from "../components/Bar";

export const metadata = {
  title: "Resume | Ashwin Iyer",
  description:
    "Ashwin Iyer's resume — view it online or download the PDF.",
};

export default function Resume() {
  return (
    <div className="resume">
      <Bar />
      <header className="resume-header">
        <div>
          <p className="resume-eyebrow">Curriculum Vitae</p>
          <h1 className="resume-title">Resume</h1>
        </div>
        <a
          href="/resume.pdf"
          download="Ashwin_Iyer_Resume.pdf"
          className="resume-download"
        >
          <svg
            className="resume-download-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 2.5v7.5m0 0 3-3m-3 3-3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 13.5h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>Download PDF</span>
        </a>
      </header>
      <div className="resume-viewer">
        <iframe
          src="https://ashwin-iyer1.github.io/resume/Ashwin_Iyer_CV.pdf"
          className="resume-iframe"
          title="Ashwin Iyer's resume"
        />
      </div>
      <p className="resume-fallback">
        PDF not displaying? <a href="/resume.pdf">Open it directly</a>.
      </p>
    </div>
  );
}
