"use client";
const Github = "/Images/github.webp";
const Linkedin = "/Images/linkedin.webp";
const Instagram = "/Images/instagram-color.webp";
const Discord = "/Images/discord.webp";
import Image from "next/image";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import React from "react";
import { styled } from "@mui/material/styles";

export default function Links() {
  const SocialIcon = styled(Image)({
    width: "auto",
    height: "50px",
    margin: "auto", // Fixed duplicated margin declaration
    filter: "brightness(80%)",
    transition: "all 0.3s ease",
    display: "block",
    "&:hover": {
      filter: "brightness(100%)",
      transform: "scale(1.1)",
    },
  });

  return (
    <div className="links">
      <Box
        component="section"
        sx={{
          p: 2,
          border: "2px solid white",
          padding: "0",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 1,
          bgcolor: "#000000", // Fixed value (had one too few zeros)
          maxHeight: "162.8px",
          minHeight: "150px",
          height: "100%",
          minWidth: "150px",
          maxWidth: "220px",
          margin: "0 auto",
          //
          backgroundColor: "transparent",
        }}
        className="Socials"
      >
        <ImageList
          sx={{
            width: "100%",
            height: "100%",
            minHeight: "150px",
            maxHeight: "162.8px",
            alignItems: "center",
            margin: "0 auto",
          }}
          cols={2}
          rowHeight={50}
        >
          {Object.values(imageData).map((item) => (
            <ImageListItem key={item.src}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <SocialIcon
                  src={item.src}
                  alt={item.alt}
                  width={item.width || 50}
                  height={50}
                />
              </a>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

const imageData = {
  github: {
    src: Github,
    alt: "Github Logo",
    href: "https://github.com/Ashwin-Iyer1",
  },
  linkedin: {
    src: Linkedin,
    alt: "Linkedin Logo",
    href: "https://www.linkedin.com/in/ashwin-iyer-949028263/",
  },
  instagram: {
    src: Instagram,
    alt: "Instagram Logo",
    href: "https://www.instagram.com/ashwin_i_/",
  },
  discord: {
    src: Discord,
    alt: "Discord Logo",
    href: "https://discordapp.com/users/299516008920514560",
    width: 68,
  },
};
