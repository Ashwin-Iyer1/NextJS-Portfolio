import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  metadataBase: new URL("https://ashwiniyer.com"),
  title: "Ashwin Iyer's Portfolio",
  description:
    "Personal website of Ashwin Iyer, a sophomore at Northeastern University from Southlake, Texas.",
  openGraph: {
    title: "Ashwin Iyer's Portfolio",
    description: "Personal website of Ashwin Iyer, a sophomore at Northeastern University from Southlake, Texas.",
    url: "https://ashwiniyer.com",
    siteName: "Ashwin Iyer's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashwin Iyer's Portfolio",
    description: "Personal website of Ashwin Iyer, a sophomore at Northeastern University from Southlake, Texas.",
    creator: "@ashwiniyer",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
          <footer>
            <span>&copy; {new Date().getFullYear()} Ashwin Iyer</span>
          </footer>
        </main>
        <GoogleAnalytics gaId="G-DFDFQZ1B7Q" />
      </body>
    </html>
  );
}
