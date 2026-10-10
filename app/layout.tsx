import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AudioProvider } from "@/components/audio-provider"
import { AppProvider } from "@/components/app-provider"
import { CommandButton } from "@/components/command-button"
import { CommandBar } from "@/components/command-bar"
import { PageTransition } from "@/components/page-transition"
import { siteConfig } from "@/src/config/site"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: ["AI engineer", "software engineer", "cybersecurity", "Python", "TypeScript", "AI agents", "security automation"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Eshwar Gajula — AI Engineering, Software Engineering, Cybersecurity" }],
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: `${siteConfig.name} Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.name,
              url: siteConfig.siteUrl,
              jobTitle: "AI Engineer · Software Engineer · Cybersecurity",
              email: siteConfig.email,
              sameAs: Object.values(siteConfig.social),
              knowsAbout: ["AI engineering", "Python", "TypeScript", "software engineering", "cybersecurity", "security automation"],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          <AudioProvider>
            <AppProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded focus:font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Skip to main content
              </a>
              <PageTransition>{children}</PageTransition>
              <CommandButton />
              <CommandBar />
            </AppProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
