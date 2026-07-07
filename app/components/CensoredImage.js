"use client";

import { useState } from "react";
import Image from "next/image";

const imageStyle = {
  transition:
    "filter var(--transition-base), transform var(--transition-base)",
};

// Older engines throw when matches() is given an unknown pseudo-class;
// default to showing the outline so keyboard users never lose it.
const isFocusVisible = (element) => {
  try {
    return element.matches(":focus-visible");
  } catch {
    return true;
  }
};

const CensoredImage = ({ src, alt, caption }) => {
  const [revealed, setRevealed] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  const reveal = () => {
    if (!revealed) {
      setRevealed(true);
    }
  };

  const handleKeyDown = (event) => {
    if (revealed) {
      return; // Let Space/Enter behave normally once there is nothing to do
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      reveal();
    }
  };

  return (
    <div className="video">
      <div
        className={`image-container ${revealed ? "revealed" : ""}`}
        onClick={reveal}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-disabled={revealed}
        aria-label={revealed ? alt : `Reveal image: ${alt}`}
        onFocus={(event) =>
          setFocusVisible(isFocusVisible(event.currentTarget))
        }
        onBlur={() => setFocusVisible(false)}
        style={{
          cursor: revealed ? "default" : "pointer",
          outline: focusVisible
            ? "2px solid var(--accent-brand, #d4a24e)"
            : undefined,
          outlineOffset: "2px",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={500}
          height={500}
          className="flex-image"
          style={imageStyle}
        />
        <div
          className="overlay"
          aria-hidden="true"
          style={{
            opacity: revealed ? 0 : 1,
            pointerEvents: revealed ? "none" : "auto",
            transition: "opacity var(--transition-base)",
          }}
        >
          Click to Reveal
        </div>
      </div>
      <p>{caption}</p>
    </div>
  );
};

export default CensoredImage;
