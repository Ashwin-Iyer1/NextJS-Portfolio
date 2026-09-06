"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./MiscProj.module.css";

const videos = [
  {
    src: "https://www.youtube.com/embed/kebgQLcctb4",
    title: "Financial Derivatives in Alternative Markets (Polymarket)",
  },
  {
    src: "https://www.youtube.com/embed/PjFANvMtrqM",
    title: "7110A | VEX Over Under | Short Reveal",
  },
  {
    src: "https://www.youtube.com/embed/_XEaRUrlE2c",
    title: "The Wolf of Skyblock",
  },
  {
    src: "https://www.youtube.com/embed/NANJDR9GeSE",
    title: "White Mountain National Forest Vlog",
  },
  {
    src: "https://www.youtube.com/embed/HEUlochQ9fc",
    title: "Puerto Rico Vlog",
  },
];

const thumbnail = (video) =>
  `https://i.ytimg.com/vi/${video.src.split("/").pop()}/hqdefault.jpg`;

export default function MiscProj() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = videos[currentIndex];
  const previous = (currentIndex + videos.length - 1) % videos.length;
  const next = (currentIndex + 1) % videos.length;
  function goTo(index) {
    setPlaying(false);
    setCurrentIndex(index);
  }

  return (
    <div
      className={styles.carouselContainer}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects and explorations"
    >
      <div className={styles.carousel}>
        <button
          type="button"
          className={styles.carouselButton}
          onClick={() => goTo(previous)}
          aria-label="Previous video"
        >
          ‹
        </button>
        <button
          type="button"
          className={styles.sideVideo}
          onClick={() => goTo(previous)}
          aria-label={`Previous: ${videos[previous].title}`}
        >
          <div className={styles.media}>
            <Image
              src={thumbnail(videos[previous])}
              alt=""
              width={480}
              height={360}
              unoptimized
              sizes="200px"
            />
          </div>
        </button>
        <div className={styles.videoCard}>
          <div className={styles.media}>
            {playing ? (
              <iframe
                key={currentIndex}
                src={`${current.src}?autoplay=1`}
                title={current.title}
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className={styles.playPreview}
                onClick={() => setPlaying(true)}
                aria-label={`Play ${current.title}`}
              >
                <Image
                  src={thumbnail(current)}
                  alt=""
                  width={480}
                  height={360}
                  unoptimized
                  sizes="600px"
                />
                <span className={styles.playIcon} aria-hidden="true">
                  ▶
                </span>
              </button>
            )}
          </div>
          <div className={styles.caption} aria-live="polite" aria-atomic="true">
            <p className={styles.captionMeta}>
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(videos.length).padStart(2, "0")}
            </p>
            <h3 className={styles.captionTitle}>{current.title}</h3>
            <a
              className={styles.watchLink}
              href={current.src.replace("/embed/", "/watch?v=")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube ↗
            </a>
          </div>
        </div>
        <button
          type="button"
          className={styles.sideVideo}
          onClick={() => goTo(next)}
          aria-label={`Next: ${videos[next].title}`}
        >
          <div className={styles.media}>
            <Image
              src={thumbnail(videos[next])}
              alt=""
              width={480}
              height={360}
              unoptimized
              sizes="200px"
            />
          </div>
        </button>
        <button
          type="button"
          className={styles.carouselButton}
          onClick={() => goTo(next)}
          aria-label="Next video"
        >
          ›
        </button>
      </div>
      <div className={styles.indicators} aria-label="Choose a video">
        {videos.map((video, index) => (
          <button
            type="button"
            key={video.src}
            className={`${styles.indicator} ${index === currentIndex ? styles.active : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Go to video ${index + 1}`}
            aria-pressed={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );
}
