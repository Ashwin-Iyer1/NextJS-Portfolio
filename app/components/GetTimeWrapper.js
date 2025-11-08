"use client";
import React from "react";
import GetTime from "./getTime";
import styles from "./GetTime.module.css";

export default function GetTimeWrapper() {
  return (
    <div className={styles.Time}>
      <div className={styles.Working}>
        <h2>Current coding time</h2>
        <GetTime />
      </div>
    </div>
  );
}
