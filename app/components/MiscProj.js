import React from "react"; 
import styles from "./MiscProj.module.css";
export default function MiscProj() {
  return (
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <iframe
          src="https://www.youtube.com/embed/kebgQLcctb4"
          title="Financial Derivatives in Alternative Markets (Polymarket)"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.videoWrapper}>
        <iframe
          src="https://www.youtube.com/embed/PjFANvMtrqM"
          title="7110A | VEX Over Under | Short Reveal"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
