import Navbar from "./LayoutElements/Navbar"
import '../styles/globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme='halloween'>
      <head />
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
