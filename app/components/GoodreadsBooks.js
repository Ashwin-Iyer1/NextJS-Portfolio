"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./GoodreadsBooks.module.css";

const PROFILE = "https://www.goodreads.com/review/list/189157306-ashwin-iyer";
const SHELVES = [
  {
    shelf: "read",
    title: "Books I’ve read",
    id: "gr_custom_widget_1791821667",
    scriptUrl:
      "https://www.goodreads.com/review/custom_widget/189157306?shelf=read&sort=date_updated&order=d&num_books=5&cover_position=left&cover_size=small&title=Ashwin%27s%20bookshelf:%20read&show_cover=1&show_author=1&show_title=1&show_rating=1&show_review=1&show_tags=1&widget_id=1791821667&widget_bg_color=FFFFFF&widget_bg_transparent=true&widget_text_color=000000&widget_title_size=medium",
    bookSelector: ".gr_custom_each_container_1791821667",
  },
  {
    shelf: "to-read",
    title: "Want to read",
    id: "gr_grid_widget_1791777141",
    scriptUrl:
      "https://www.goodreads.com/review/grid_widget/189157306.Ashwin%27s%20to-read%20book%20montage?cover_size=medium&hide_link=&hide_title=true&num_books=20&order=d&shelf=to-read&sort=date_added&widget_id=1791777141",
    bookSelector: ".gr_grid_book_container",
  },
];

function GoodreadsShelf({ shelf, title, id, scriptUrl, bookSelector }) {
  const widgetRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const widget = widgetRef.current;
    // Goodreads owns this empty subtree. Reload on each mount so returning to
    // this route works without Next Script's execution cache.
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.charset = "utf-8";
    let active = true;
    const timeout = window.setTimeout(() => {
      if (active) setStatus("unavailable");
    }, 15000);

    script.onload = () => {
      if (!active) return;
      window.clearTimeout(timeout);
      widget.querySelectorAll("a").forEach((link) => {
        link.target = "_blank";
        link.rel = "nofollow noopener noreferrer";
      });
      widget.querySelectorAll(".staticStars").forEach((rating) => {
        rating.setAttribute("role", "img");
        rating.setAttribute("aria-label", rating.title || "Not rated");
        rating.querySelectorAll("img").forEach((star) => {
          star.alt = "";
        });
      });
      setStatus(widget.querySelector(bookSelector) ? "loaded" : "empty");
    };
    script.onerror = () => {
      window.clearTimeout(timeout);
      if (active) setStatus("unavailable");
    };
    // Avoid starting the discarded first effect during React Strict Mode.
    queueMicrotask(() => {
      if (active) widget.after(script);
    });

    return () => {
      active = false;
      window.clearTimeout(timeout);
      script.onload = null;
      script.onerror = null;
      script.remove();
      widget.replaceChildren();
    };
  }, [scriptUrl, bookSelector]);

  return (
    <section className={styles.shelf} aria-labelledby={`${shelf}-heading`}>
      <div className={styles.heading}>
        <h2 id={`${shelf}-heading`}>{title}</h2>
        <a
          href={`${PROFILE}?shelf=${shelf}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Full shelf on Goodreads <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className={styles.widget} id={id} ref={widgetRef} />
      {status !== "loaded" && (
        <p className={styles.fallback} role="status">
          {status === "unavailable"
            ? "Goodreads couldn’t load right now. You can still visit the full shelf above."
            : status === "empty"
              ? "No books to show here yet. Visit Goodreads for the full shelf."
              : "Browse the full shelf on Goodreads for all my books and reviews."}
        </p>
      )}
    </section>
  );
}

export default function GoodreadsBooks() {
  return SHELVES.map((shelf) => <GoodreadsShelf key={shelf.shelf} {...shelf} />);
}
