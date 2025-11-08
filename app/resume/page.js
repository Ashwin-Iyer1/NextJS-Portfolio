import "./resume.css";
import React from "react";
import Bar from "../components/Bar";

export default function Resume() {
  return (
    <div className="resume" style={{
    }}>
      <Bar />
      <iframe
        src="https://ashwin-iyer1.github.io/resume/Ashwin_Iyer_CV.pdf"
        className="resumeIframe"
        frameBorder="0"
      />
    </div>
  );
}
