"use client";

import React, { useState, useEffect } from "react";
import styles from "./MiscProj.module.css";

export default function MiscProj() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState({});

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
      title: "White Mountain National Forest Vlog"
    },
    {
      src: "https://www.youtube.com/embed/HEUlochQ9fc",
      title: "Puerto Rico Vlog"
    }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleIframeLoad = (index) => {
    setLoadedVideos(prev => ({ ...prev, [index]: true }));
  };

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

  // Skeleton loader component
  const VideoSkeleton = ({ isMain = false, className = "" }) => (
    <div className={`${styles.skeleton} ${isMain ? styles.skeletonMain : styles.skeletonSide} ${className}`}>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonPlayButton}></div>
      </div>
    </div>
  );

  // Prevent hydration mismatch by only rendering interactive elements on client
  if (!isClient) {
    return (
      <div className={styles.carouselContainer}>
        <div className={styles.carousel}>
          <button className={styles.carouselButton} aria-label="Previous video" disabled>
            ‹
          </button>
          
          <div className={styles.videoWrapper}>
            <VideoSkeleton isMain />
          </div>

          <button className={styles.carouselButton} aria-label="Next video" disabled>
            ›
          </button>
        </div>

        <div className={styles.indicators}>
          {videos.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === 0 ? styles.active : ''}`}
              aria-label={`Go to video ${index + 1}`}
              disabled
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <button className={styles.carouselButton} onClick={prevSlide} aria-label="Previous video">
          ‹
        </button>
        
        <div className={styles.sideVideo} onClick={prevSlide}>
          {!loadedVideos[prevIndex] && <VideoSkeleton className={styles.skeletonSide} />}
          <iframe
            src={videos[prevIndex].src}
            title={videos[prevIndex].title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={false}
            className={styles.previewIframe}
            onLoad={() => handleIframeLoad(prevIndex)}
            style={{ opacity: loadedVideos[prevIndex] ? 1 : 0 }}
          ></iframe>
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.videoWrapper}>
          {!loadedVideos[currentIndex] && <VideoSkeleton isMain />}
          <iframe
            key={currentIndex}
            src={videos[currentIndex].src}
            title={videos[currentIndex].title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => handleIframeLoad(currentIndex)}
            style={{ opacity: loadedVideos[currentIndex] ? 1 : 0, transition: 'opacity 0.3s ease' }}
          ></iframe>
        </div>

        <div className={styles.sideVideo} onClick={nextSlide}>
          {!loadedVideos[nextIndex] && <VideoSkeleton className={styles.skeletonSide} />}
          <iframe
            src={videos[nextIndex].src}
            title={videos[nextIndex].title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={false}
            className={styles.previewIframe}
            onLoad={() => handleIframeLoad(nextIndex)}
            style={{ opacity: loadedVideos[nextIndex] ? 1 : 0 }}
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
