import React from "react";
import "./BlogList.css"; // Assuming you have a CSS file for styling

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
];

export default function BlogList() {
  return (
    <div className="Blogs">
      {blogs.slice(0, blogs.length - 1).map((blog) => {
        const isExternal = blog.slug.startsWith("http");
        const textColor = "black";
        const backgroundColor = "#818181";

        return (
          <div
            className="Blog"
            style={{
              border: `2px solid ${textColor}`,
              backgroundColor: backgroundColor,
              boxShadow: `2px 3px ${textColor}`,
            }}
            key={blog.slug}
          >
            <h2>
              <a
                href={isExternal ? blog.slug : `/blog/${blog.slug}`}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
                style={{ color: textColor }}
              >
                {blog.title}
              </a>
            </h2>
            <p>{blog.description}</p>
          </div>
        );
      })}
      
      {/* Last item rendered separately to center it */}
      <div className="last-row-container">
        {blogs.length > 0 && (
          <div
            className="Blog"
            style={{
              border: `2px solid black`,
              backgroundColor: "#818181",
              boxShadow: `2px 3px black`,
            }}
            key={blogs[blogs.length - 1].slug}
          >
            <h2>
              <a
                href={
                  blogs[blogs.length - 1].slug.startsWith("http")
                    ? blogs[blogs.length - 1].slug
                    : `/blog/${blogs[blogs.length - 1].slug}`
                }
                target={
                  blogs[blogs.length - 1].slug.startsWith("http")
                    ? "_blank"
                    : "_self"
                }
                rel={
                  blogs[blogs.length - 1].slug.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                style={{ color: "black" }}
              >
                {blogs[blogs.length - 1].title}
              </a>
            </h2>
            <p>{blogs[blogs.length - 1].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}