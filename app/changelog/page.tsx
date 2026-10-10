"use client"

import { motion } from "framer-motion"
import { History, Tag, Calendar } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLanguageMatrix } from "@/components/backgrounds"

const changelog = [
  {
    version: "v3.2",
    date: "Oct 2026",
    changes: [
      "Separated the ECHA project page from the personal About page and added a dedicated Agent + Shell overview",
      "Moved the site header into the page layout to prevent content overlap and improved responsive navigation",
      "Kept Matrix Rain active in low-power mode with a slower cadence, fewer columns, and lower opacity",
      "Refined resume content, added selected projects, and made Save as PDF use the browser print dialog",
      "Improved responsive spacing, focus visibility, reduced-motion behavior, and print styling",
    ],
  },
  {
    version: "v3.1",
    date: "Sep 2026",
    changes: ["Refocused portfolio positioning around AI engineering, software engineering, and cybersecurity", "Added ECHA as the flagship in-progress engineering project", "Improved metadata, accessibility, and project case-study structure"],
  },
]

export default function ChangelogPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-8 sm:pt-12 pb-8 sm:pb-12 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.08} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-primary/10 border border-neon-primary/30 rounded-full mb-3 sm:mb-4">
              <History className="w-3 h-3 text-neon-primary" />
              <span className="text-neon-primary font-mono text-xs">VERSION_HISTORY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="text-neon-primary">&gt;</span> Changelog
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              A transparent record of portfolio improvements, project updates, accessibility changes, and interface refinements.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {changelog.map((release, i) => (
              <motion.div
                key={release.version}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface/90 backdrop-blur border border-border rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-4 px-6 py-4 bg-surface-elevated border-b border-border">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-neon-primary" />
                    <span className="font-mono font-bold text-neon-primary">{release.version}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{release.date}</span>
                  </div>
                </div>

                <div className="p-6">
                  <ul className="space-y-2">
                    {release.changes.map((change, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-neon-primary mt-1">•</span>
                        <span className="text-muted-foreground">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
