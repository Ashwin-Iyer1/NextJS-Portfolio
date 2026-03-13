import React from "react";
import "./BlogList.css";

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
    <div className="blogGrid">
      {blogs.map((blog) => {
        const isExternal = blog.slug.startsWith("http");
        const href = isExternal ? blog.slug : `/blog/${blog.slug}`;

        return (
          <a
            key={blog.slug}
            href={href}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="blogCard"
          >
            <h2 className="blogCardTitle">
              {blog.title}
              {isExternal && <span className="externalIcon">&#8599;</span>}
            </h2>
            <div className="blogCardDivider" />
            <p className="blogCardDescription">{blog.description}</p>
          </a>
        );
      })}
    </div>
  );
}
