"use client";
import React from "react";
import GetTime from "./getTime";
import styles from "./GetTime.module.css";

export default function GetTimeWrapper() {
  return (
    <section className={styles.timeCard}>
      <h2 className={styles.label}>Current coding time</h2>
      <GetTime />
    </section>
  );
}
