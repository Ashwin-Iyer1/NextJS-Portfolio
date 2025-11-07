import React from "react";
import Bar from "../components/Bar";
import styles from "./page.module.css";

export default function Resume() {
  return (
    <div className={styles.resume}>
      <Bar />
      <iframe
        src="https://ashwin-iyer1.github.io/resume/Ashwin_Iyer_CV.pdf"
        className={styles.resumeIframe}
        frameBorder="0"
      />
    </div>
  );
}
