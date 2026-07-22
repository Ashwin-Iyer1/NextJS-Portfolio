import "./resume.css";
import React from "react";
import Bar from "../components/Bar";
import DownloadButton from "./DownloadButton";

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
        <DownloadButton />
      </header>
      <div className="resume-viewer">
        <iframe
          src="https://ashwin-iyer1.github.io/resume/Ashwin_Iyer_CV.pdf"
          className="resume-iframe"
          title="Ashwin Iyer's resume"
        />
      </div>
      <p className="resume-fallback">
        PDF not displaying? <a href="https://ashwin-iyer1.github.io/resume/Ashwin_Iyer_CV.pdf">Open it directly</a>.
      </p>
    </div>
  );
}
