import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
      className={inter.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>
        <a href="#page-content" className="skip-link">
          Skip to content
        </a>
        <main id="main-content" tabIndex={-1}>
          {children}
          <footer>
            <span>&copy; {new Date().getFullYear()} Ashwin Iyer</span>
          </footer>
        </main>
        <GoogleAnalytics gaId="G-DFDFQZ1B7Q" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
