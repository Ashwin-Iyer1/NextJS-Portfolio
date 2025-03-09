import "./globals.css"; // Your global CSS file
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "Ashwin Iyer",
  description:
    "Personal website of Ashwin Iyer, a freshman at Northeastern University from Southlake, Texas.",
  image: "https://photos.fife.usercontent.google.com/pw/AP1GczOdFssYTs9Pz2YtPa3Vrqv4YdpBEb5aIQV80EsI1owJ01Hqns6ibXs7MA=w1234-h1646-s-no-gm?authuser=0",
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
        <meta property="og:image" content={metadata.image} />
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
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
      <GoogleAnalytics gaId="G-T57ZFGY2HZ" />
    </html>
  );
}
