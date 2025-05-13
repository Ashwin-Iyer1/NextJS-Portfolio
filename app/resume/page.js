import React from "react";
import Bar from "../components/Bar";
import styles from "./page.module.css";

export default function Resume() {
  return (
    <div className={styles.resume} style={{ height: "90vh", width: "100vw" }}>
      <Bar />
      <iframe
        src="./resume.pdf"
        style={{ width: "100vw", height: "90vh" }}
        frameBorder="0"
      />
    </div>
  );
}
