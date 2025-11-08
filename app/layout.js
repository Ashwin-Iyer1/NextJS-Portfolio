import "./globals.css"; // Your global CSS file
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "Ashwin Iyer's Portfolio",
  description:
    "Personal website of Ashwin Iyer, a sophomore at Northeastern University from Southlake, Texas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta property="og:url" content="https://ashwiniyer.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ashwin Iyer's Portfolio" />
        <meta property="og:description" content="Personal website of Ashwin Iyer, a sophomore at Northeastern University from Southlake, Texas." />
        <meta property="og:image" content="https://ashwiniyer.com/opengraph-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ashwiniyer.com" />
        <meta property="twitter:url" content="https://ashwiniyer.com" />
        <meta name="twitter:title" content="Ashwin Iyer's Portfolio" />
        <meta name="twitter:description" content="Personal website of Ashwin Iyer, a sophomore at Northeastern University from Southlake, Texas." />
        <meta name="twitter:image" content="https://ashwiniyer.com/opengraph-image.png" />

        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/cxf0gov.css"></link>
      </head>
      <body>
        {/* Layout UI */}
        <main>
          {children}
          <footer>
            <span
              className="text-xs text-slate-400 text-center"
              style={{ color: "#7c7c7c" }}
            >
              &copy; {new Date().getFullYear()} Ashwin Iyer. All rights
              reserved.
            </span>
          </footer>
        </main>
      </body>
      <GoogleAnalytics gaId="G-DFDFQZ1B7Q" />
    </html>
  );
}
