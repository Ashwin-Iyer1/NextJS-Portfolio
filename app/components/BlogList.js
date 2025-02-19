import React from "react";
import style from "./BlogList.css";

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
  // Add more blog objects here if needed
];

export default function BlogList() {
  return (
    <div className="Blogs">
      {blogs.slice(0, 6).map((blog, index) => {
        const textColor = `black`; // Saturation and Lightness for vivid colors
        const backgroundColor = `#818181`; // Add transparency to the background
        return (
          <div
            className="Blog"
            style={{
              border: `2px solid ${textColor}`,
              backgroundColor: backgroundColor,
              boxShadow: `2px 3px ${textColor}`,
            }}
            key={blog.slug} // Ensure unique key for each blog item
          >
            <h2>
              <a
                href={`/blog/${blog.slug}`} // Assuming 'slug' is used for routing
                style={{ color: textColor }}
              >
                {blog.title}
              </a>
            </h2>
            <p>{blog.description}</p>
          </div>
        );
      })}
    </div>
  );
}
