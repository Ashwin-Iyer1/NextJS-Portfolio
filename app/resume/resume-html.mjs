import { load } from "cheerio";
import sanitizeHtml from "sanitize-html";

export const RESUME_HTML_URL =
  "https://ashwin-iyer1.github.io/resume/docs/index.html";

export function extractResumeHtml(html) {
  const $ = load(html);
  const resume = $("main#resume").first();

  if (!resume.length || !resume.find("section").length || !resume.text().trim()) {
    throw new Error("The source page does not contain the expected resume.");
  }

  // Relative links must still point to the source site after embedding.
  resume.find("a[href]").each((_, element) => {
    const link = $(element);
    try {
      link.attr("href", new URL(link.attr("href"), RESUME_HTML_URL).href);
    } catch {
      link.removeAttr("href");
    }
  });

  // Import content, not the source document's styles, scripts, or page chrome.
  // Keep only the two layout hooks used by our scoped resume styles.
  return sanitizeHtml(resume.html(), {
    allowedTags: [
      "header", "section", "article", "div", "h2", "h3", "h4",
      "p", "ul", "ol", "li", "strong", "em", "b", "i", "span", "a", "br",
    ],
    allowedAttributes: {
      a: ["href", "title"],
    },
    allowedClasses: {
      div: ["entry-heading"],
      p: ["date"],
      span: ["date"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowProtocolRelative: false,
    // The portfolio supplies the page's h1; retain the source's hierarchy below it.
    transformTags: { h1: "h2", h2: "h3", h3: "h4" },
  });
}
