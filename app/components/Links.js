"use client";
import Image from "next/image";
import Box from "@mui/material/Box";
import React from "react";
import styles from "./Links.module.css";

const socialLinks = [
  {
    href: "https://github.com/Ashwin-Iyer1",
    label: "GitHub",
    src: "/Images/github.webp",
    width: 50,
    darkenOnLight: true,
  },
  {
    href: "https://www.linkedin.com/in/ashwin-hao-iyer",
    label: "LinkedIn",
    src: "/Images/linkedin.webp",
    width: 50,
  },
  {
    href: "https://www.instagram.com/ashwin_i_/",
    label: "Instagram",
    src: "/Images/instagram-color.webp",
    width: 50,
  },
  {
    href: "https://discordapp.com/users/299516008920514560",
    label: "Discord",
    src: "/Images/Discord.webp",
    width: 68,
  },
];

const rowSx = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-md)",
  padding: "var(--space-sm)",
};

const iconButtonSx = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "56px",
  height: "56px",
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-color)",
  borderRadius: "var(--radius-md)",
  transition:
    "transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base), background-color var(--transition-base)",
  "& img": {
    height: "24px",
    width: "auto",
    filter: "brightness(0.85)",
    transition: "filter var(--transition-base)",
  },
  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: "var(--border-hover)",
    boxShadow: "var(--shadow-md)",
    backgroundColor: "var(--bg-card-hover)",
    "& img": {
      filter: "brightness(1)",
    },
  },
  "&:focus-visible": {
    outline: "2px solid var(--accent-brand, #d4a24e)",
    outlineOffset: "2px",
  },
  "@media (max-width: 640px)": {
    width: "48px",
    height: "48px",
    "& img": {
      height: "22px",
    },
  },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    "& img": {
      transition: "none",
    },
    "&:hover": {
      transform: "none",
    },
  },
};

// The GitHub mark ships as a light-gray webp; darken it so it stays
// visible against light-theme surfaces.
const darkenOnLightSx = {
  '[data-theme="light"] & img': {
    filter: "brightness(0.45)",
  },
  '[data-theme="light"] &:hover img': {
    filter: "brightness(0.3)",
  },
};

const darkenIconButtonSx = [iconButtonSx, darkenOnLightSx];

// Fill the column when a parent flex row stretches the component (home
// page); resolves to auto height inside plain block parents (about page).
const cardSx = {
  height: "100%",
};

export default function Links() {
  return (
    <div className={styles.links}>
      <Box
        component="section"
        aria-label="Social links"
        className={styles.Socials}
        sx={cardSx}
      >
        <Box sx={rowSx}>
          {socialLinks.map((item) => (
            <Box
              key={item.href}
              component="a"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              sx={item.darkenOnLight ? darkenIconButtonSx : iconButtonSx}
            >
              <Image src={item.src} alt="" width={item.width} height={50} />
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}
