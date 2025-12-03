import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AudioProvider } from "@/components/audio-provider"
import { AppProvider } from "@/components/app-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Eshwar Gajula | Frontend Developer",
  description:
    "Portfolio of Eshwar Gajula - Frontend Developer specializing in React.js, Next.js, and modern web development. Building user-friendly, responsive web applications.",
  keywords: ["frontend developer", "react developer", "web developer", "javascript", "next.js", "html css"],
  authors: [{ name: "Eshwar Gajula" }],
  creator: "Eshwar Gajula",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eshwar-gajula-portfolio.vercel.app",
    siteName: "Eshwar Gajula Portfolio",
    title: "Eshwar Gajula | Frontend Developer",
    description: "Portfolio of Eshwar Gajula - Frontend Developer specializing in React.js and Next.js",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eshwar Gajula | Frontend Developer",
    description: "Portfolio of Eshwar Gajula - Frontend Developer",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AudioProvider>
            <AppProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded focus:font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Skip to main content
              </a>
              {children}
            </AppProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
