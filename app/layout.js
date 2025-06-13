import "./globals.css"; // Your global CSS file
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "Ashwin Iyer's Portfolio",
  description:
    "Personal website of Ashwin Iyer, a rising sophomore at Northeastern University from Southlake, Texas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta
          property="og:image"
          content="https://ashwiniyer.com/opengraph-image.png"
        />
        <meta
          name="twitter:image"
          content="https://ashwiniyer.com/opengraph-image.png"
        />

        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {/* Layout UI */}
        <main>
          {children}
          <footer style={{ paddingTop: "20px" }}>
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
