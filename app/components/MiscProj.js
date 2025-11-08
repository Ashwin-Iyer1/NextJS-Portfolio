"use client";

import React, { useState } from "react";
import styles from "./MiscProj.module.css";

export default function MiscProj() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    {
      src: "https://www.youtube.com/embed/kebgQLcctb4",
      title: "Financial Derivatives in Alternative Markets (Polymarket)"
    },
    {
      src: "https://www.youtube.com/embed/PjFANvMtrqM",
      title: "7110A | VEX Over Under | Short Reveal"
    },
    {
      src: "https://www.youtube.com/embed/_XEaRUrlE2c",
      title: "The Wolf of Skyblock"
    },
    {
      src: "https://www.youtube.com/embed/NANJDR9GeSE",
      title: "The Wolf of Skyblock"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <button className={styles.carouselButton} onClick={prevSlide} aria-label="Previous video">
          ‹
        </button>
        
        <div className={styles.sideVideo} onClick={prevSlide}>
          <iframe
            src={videos[prevIndex].src}
            title={videos[prevIndex].title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={false}
            className={styles.previewIframe}
          ></iframe>
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.videoWrapper}>
          <iframe
            key={currentIndex}
            src={videos[currentIndex].src}
            title={videos[currentIndex].title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <div className={styles.sideVideo} onClick={nextSlide}>
          <iframe
            src={videos[nextIndex].src}
            title={videos[nextIndex].title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={false}
            className={styles.previewIframe}
          ></iframe>
          <div className={styles.overlay}></div>
        </div>

        <button className={styles.carouselButton} onClick={nextSlide} aria-label="Next video">
          ›
        </button>
      </div>

      <div className={styles.indicators}>
        {videos.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
