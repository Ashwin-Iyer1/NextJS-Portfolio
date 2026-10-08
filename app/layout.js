import "./globals.css";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Bar from "./components/Bar";
import IntroSessionProvider from "./components/IntroSessionProvider";
import "./landing.css";

const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  display: "swap",
  variable: "--font-body",
  weight: "200 800",
});
const bricolage = localFont({
  src: "../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2",
  display: "swap",
  variable: "--font-display",
  weight: "200 800",
});
const caveat = localFont({
  src: "../node_modules/@fontsource/caveat/files/caveat-latin-700-normal.woff2",
  display: "swap",
  variable: "--font-signature",
  weight: "700",
});

export const metadata = {
  metadataBase: new URL("https://ashwiniyer.com"),
  title: "Ashwin Iyer's Portfolio",
  description:
    "Personal website of Ashwin Iyer, a junior at Northeastern University from Southlake, Texas.",
  openGraph: {
    title: "Ashwin Iyer's Portfolio",
    description:
      "Personal website of Ashwin Iyer, a junior at Northeastern University from Southlake, Texas.",
    url: "https://ashwiniyer.com",
    siteName: "Ashwin Iyer's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashwin Iyer's Portfolio",
    description:
      "Personal website of Ashwin Iyer, a junior at Northeastern University from Southlake, Texas.",
    creator: "@ashwiniyer",
  },
};

export default function RootLayout({ children }) {
  const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${manrope.variable} ${bricolage.variable} ${caveat.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <IntroSessionProvider>
          <a href="#page-content" className="skip-link">
            Skip to content
          </a>
          <Bar />
          <main id="main-content" tabIndex={-1}>
            {children}
            <footer>
              <span>&copy; {new Date().getFullYear()} Ashwin Iyer</span>
            </footer>
          </main>
        </IntroSessionProvider>
        <GoogleAnalytics gaId="G-DFDFQZ1B7Q" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
