import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Raleway, Poppins } from "next/font/google"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Clifford Silla | Software Developer & Systems Integrator",
  description:
    "Professional portfolio of Clifford Silla, a Software Developer & Systems Integrator with over 10 years of experience in full-stack development, enterprise integration, and systems architecture.",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' }
    ],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${poppins.variable} dark`}>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
