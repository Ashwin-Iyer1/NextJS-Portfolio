import React from "react";
import "./BlogList.css"; // Assuming you have a CSS file for styling
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
const blogs = [
  {
    slug: "books",
    title: "Books",
    description: "My favorite books and books I plan to read.",
  },
  {
    slug: "coding",
    title: "My coding journey",
    description: "How I started coding and my favorite resources.",
  },
  {
    slug: "school",
    title: "School",
    description: "My experience from high school to the beginning of college.",
  },
  {
    slug: "stocks",
    title: "Stocks and Investing",
    description: "My investing strategy and what got me into investing.",
  },
  {
    slug: "working-out",
    title: "Working Out",
    description: "My gym routine and progress.",
  },
  {
    slug: "youtube",
    title: "YouTube",
    description: "My favorite Youtube channels and videos.",
  },
  {
    slug: "https://docs.google.com/document/d/14bWW7PZx2Q8DyiR392f6GOK2MdIUpGDE7WdVrj4_qJE/edit?usp=sharing",
    title: "My College Essays",
    description: "A few of my essays I submitted for my college applications.",
  },
  {
    slug: "zeal-it-consultants",
    title: "Zeal IT Consultants",
    description: "My experience interning at Zeal IT Consultants.",
  },
  {
    slug: "mission",
    title: "My Mission Statement",
    description: "My mission statement and guiding principles.",
  },
  {
    slug: "cut-the-lines",
    title: "Cut The Lines",
    description:
      "A boat is safest when it is in harbor, but that is not what boats are for.",
  },
];

export default function BlogList() {
  return (
    <Box
      margin="auto"
      sx={{
        alignContent: "center",
        textAlign: "center",
        justifyContent: "center",
        padding: { xs: 2, md: 3 },
      }}
    >
      <Stack
        spacing={{ xs: 1.5, sm: 2.5, md: 3 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {blogs.slice(0, blogs.length).map((blog, index) => {
          const isExternal = blog.slug.startsWith("http");

          return (
            <a
              key={blog.slug}
              href={isExternal ? blog.slug : `/blog/${blog.slug}`}
              target={isExternal ? "_blank" : "_self"}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{
                color: "#e8eef6",
                textDecoration: "none",
                transition: "all 0.3s ease",
                display: "inline-block",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#c596ee";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#e8eef6";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "calc(50vw - 24px)", // 2 columns on extra small screens
                    sm: 300,
                  },
                  minWidth: {
                    xs: 140, // Minimum width for mobile
                    sm: 300,
                  },
                  minHeight: { xs: "100%", sm: 200 },
                  background:
                    "linear-gradient(135deg, #1a1a1a 0%, #252525 100%)",
                  borderRadius: { xs: "12px", sm: "16px" },
                  padding: { xs: "16px", sm: "28px" },
                  border: "1px solid rgba(138, 44, 226, 0.15)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow:
                      "0 16px 48px rgba(138, 44, 226, 0.25), 0 0 0 1px rgba(197, 150, 238, 0.3)",
                    border: "1px solid rgba(138, 44, 226, 0.4)",
                    "&::before": {
                      opacity: 1,
                    },
                    "&::after": {
                      transform: "translateX(0) rotate(45deg)",
                    },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background:
                      "linear-gradient(90deg, #8a2ce2 0%, #c596ee 50%, #8a2ce2 100%)",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "-50%",
                    right: "-50%",
                    width: "200%",
                    height: "200%",
                    background:
                      "radial-gradient(circle, rgba(138, 44, 226, 0.03) 0%, transparent 70%)",
                    transform: "translateX(100%) rotate(45deg)",
                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    pointerEvents: "none",
                  },
                }}
              >
                {/* Subtle corner accent */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "60px",
                    height: "60px",
                    background:
                      "radial-gradient(circle at top right, rgba(138, 44, 226, 0.08), transparent)",
                    borderRadius: "0 16px 0 100%",
                    pointerEvents: "none",
                  }}
                />

                <h2
                  style={{
                    marginBottom: "12px",
                    fontSize: "clamp(1rem, 3.5vw, 1.4rem)",
                    position: "relative",
                    zIndex: 1,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  <a
                    href={isExternal ? blog.slug : `/blog/${blog.slug}`}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    style={{
                      color: "#e8eef6",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "inline-block",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#c596ee";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#e8eef6";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {blog.title}
                    {isExternal && (
                      <span
                        style={{
                          marginLeft: "8px",
                          fontSize: "0.75em",
                          opacity: 0.7,
                        }}
                      >
                        ↗
                      </span>
                    )}
                  </a>
                </h2>

                {/* Elegant divider line */}
                <Box
                  sx={{
                    width: "40px",
                    height: "2px",
                    background: "linear-gradient(90deg, #8a2ce2, transparent)",
                    marginBottom: "16px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />

                <p
                  style={{
                    marginTop: 0,
                    color: "#9aa4b2",
                    fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
                    lineHeight: "1.6",
                    position: "relative",
                    zIndex: 1,
                    fontWeight: 300,
                  }}
                >
                  {blog.description}
                </p>
              </Box>
            </a>
          );
        })}
      </Stack>
    </Box>
  );
}
