"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyEmail() {
  const [status, setStatus] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText("ashwiniyer06@gmail.com");
      setStatus("Email copied");
    } catch {
      setStatus("Couldn’t copy. Select the email address to copy it manually.");
    }
    timer.current = setTimeout(() => setStatus(""), 5000);
  }

  return (
    <div className="copy-email">
      <button type="button" className="button-secondary" onClick={copy}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V4H4v12h4" />
        </svg>
        {status === "Email copied" ? "Copied!" : "Copy email"}
      </button>
      <span className="copy-status" role="status">
        {status}
      </span>
    </div>
  );
}
