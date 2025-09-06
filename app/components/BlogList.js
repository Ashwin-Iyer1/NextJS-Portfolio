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
    description: "My experience interning at Zeal IT Consultants."
  },
  {
    slug: "mission",
    title: "My Mission Statement",
    description: "My mission statement and guiding principles.",
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
      }}
    >
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {blogs.slice(0, blogs.length).map((blog) => {
          const isExternal = blog.slug.startsWith("http");
          const textColor = "black";
          const backgroundColor = "#818181";

          return (
            <Box
              sx={{
                width: "100%",
                maxWidth: 300,
                borderRadius: 1,
                padding: 2,
                "&:hover": {
                  filter: "brightness(110%)",
                  transform: "translateY(-5px)",
                  transition:
                    "transform 0.3s ease-in-out, filter 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  boxShadow: `0 4px 12px ${textColor}`,
                },
                transition:
                  "transform 0.3s ease-in-out, filter 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              }}
              key={blog.slug}
              bgcolor={backgroundColor}
            >
              <h2>
                <a
                  href={isExternal ? blog.slug : `/blog/${blog.slug}`}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  style={{ color: textColor, textDecoration: "underline" }}
                >
                  {blog.title}
                </a>
              </h2>
              <p style={{ marginTop: 8, color: "#333" }}>{blog.description}</p>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
