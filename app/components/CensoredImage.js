"use client";

import { useState } from "react";
import Image from "next/image";

const CensoredImage = ({ src, alt, caption }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="video">
      <div
        className={`image-container ${revealed ? "revealed" : ""}`}
        onClick={() => setRevealed(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={500}
          height={500}
          className="flex-image"
        />
        {!revealed && <div className="overlay">Click to Reveal</div>}
      </div>
      <p>{caption}</p>
    </div>
  );
};

export default CensoredImage;
