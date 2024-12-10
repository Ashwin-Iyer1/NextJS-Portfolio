import React, { useEffect, useState } from "react"; // Import useEffect and useState
import styles from "./MiscProj.module.css";


export default function MiscProj() {
    return (
    <div className={styles.container}>
        <iframe src="https://www.youtube.com/embed/kebgQLcctb4" title="Financial Derivatives in Alternative Markets (Polymarket)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <iframe src="https://www.youtube.com/embed/PjFANvMtrqM" title="7110A | VEX Over Under | Short Reveal" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    );
}