import "./resume.css";
import React from "react";
import DownloadButton from "./DownloadButton";
import { extractResumeHtml, RESUME_HTML_URL } from "./resume-html.mjs";

export const metadata = {
  title: "Resume | Ashwin Iyer",
  description: "Ashwin Iyer's resume — view it online or download the PDF.",
};
// Also retry after an initial fetch failure instead of caching the fallback forever.
export const revalidate = 3600;

async function getExternalHtml() {
  try {
    const res = await fetch(RESUME_HTML_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resume fetch failed: HTTP ${res.status}`);
    return extractResumeHtml(await res.text());
  } catch (error) {
    console.error("Unable to load the resume preview:", error);
    return null;
  }
}

export default async function Resume() {
  const htmlContent = await getExternalHtml();
  return (
    <div className="page-shell resume">
      <header className="resume-header" id="page-content" tabIndex={-1}>
        <div>
          <p className="resume-eyebrow">Curriculum Vitae</p>
          <h1 className="resume-title">Resume</h1>
        </div>
        <DownloadButton />
      </header>
      <div className="resume-viewer">
        {htmlContent ? (
          <div
            className="resume-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <div className="resume-unavailable" role="status">
            <h2>Resume preview unavailable</h2>
            <p>
              You can still{" "}
              <a href="https://ashwin-iyer1.github.io/resume/Ashwin_Iyer_CV.pdf">
                view the PDF
              </a>{" "}
              or download a copy above.
            </p>
          </div>
        )}
      </div>
      <p className="resume-fallback">
        <a href={RESUME_HTML_URL}>View the standalone resume</a>
      </p>
    </div>
  );
}
