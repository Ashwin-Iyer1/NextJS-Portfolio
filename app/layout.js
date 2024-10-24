import './globals.css'; // Your global CSS file
export const metadata = {
  title: 'Ashwin Iyer',
  description: 'Personal website of Ashwin Iyer, a freshman at Northeastern University from Southlake, Texas.',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <main>{children}
        <footer>
        <span className="text-xs text-slate-400 text-center">&copy; {new Date().getFullYear()} Ashwin Iyer. All rights reserved.</span>
        </footer>
        </main>
      </body>
    </html>
  )
}