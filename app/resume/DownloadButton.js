"use client";

import React from "react";

const RESUME_URL = "https://ashwin-iyer1.github.io/resume/Ashwin_Iyer_CV.pdf";
const FILE_NAME = "Ashwin_Iyer_Resume.pdf";

export default function DownloadButton() {
  const [busy, setBusy] = React.useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(RESUME_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = FILE_NAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fall back to opening the PDF directly if the fetch fails.
      window.open(RESUME_URL, "_blank", "noopener");
    } finally {
      setBusy(false);
    }
  };

  return (
    <a
      href={RESUME_URL}
      download={FILE_NAME}
      onClick={handleDownload}
      className="resume-download"
      aria-busy={busy}
    >
      <svg
        className="resume-download-icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 2.5v7.5m0 0 3-3m-3 3-3-3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 13.5h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span>{busy ? "Downloading…" : "Download PDF"}</span>
    </a>
  );
}
