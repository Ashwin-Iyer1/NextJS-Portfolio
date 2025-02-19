import React from "react";
import style from "./BlogList.css";

const blogs = [
  {
    slug: "books",
    title: "My favorite books and what I am reading next",
    description: "A breakdown of my workout schedule and tips.",
  },
  {
    slug: "coding",
    title: "My coding journey",
    description: "A breakdown of my workout schedule and tips.",
  },
  {
    slug: "school",
    title: "High school to College",
    description: "A breakdown of my workout schedule and tips.",
  },
  {
    slug: "stocks",
    title: "What got me into stocks",
    description: "A breakdown of my workout schedule and tips.",
  },
  {
    slug: "working-out",
    title: "My Working Out Journey",
    description: "A breakdown of my workout schedule and tips.",
  },
  {
    slug: "youtube",
    title: "My Favorite Youtube Channels and Videos",
    description: "A breakdown of my workout schedule and tips.",
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
