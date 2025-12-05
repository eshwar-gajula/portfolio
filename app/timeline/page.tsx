"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Award, Calendar, Crosshair } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { resumeData } from "@/src/data"

interface TimelineItem {
  id: string
  type: "experience" | "education" | "certification"
  title: string
  subtitle: string
  date: string
  description?: string
  highlights?: string[]
}

export default function TimelinePage() {
  const { playSound } = useAudio()

  // Combine all timeline items
  const timelineItems: TimelineItem[] = [
    ...resumeData.experience.map((exp) => ({
      id: exp.id,
      type: "experience" as const,
      title: exp.role,
      subtitle: exp.company,
      date: `${exp.startDate} - ${exp.endDate}`,
      description: exp.description,
      highlights: exp.highlights,
    })),
    ...resumeData.education.map((edu, i) => ({
      id: `edu-${i}`,
      type: "education" as const,
      title: `${edu.degree} in ${edu.field}`,
      subtitle: edu.institution,
      date: `${edu.startDate} - ${edu.endDate}`,
      highlights: edu.highlights,
    })),
    ...resumeData.certifications.map((cert, i) => ({
      id: `cert-${i}`,
      type: "certification" as const,
      title: cert.name,
      subtitle: cert.issuer,
      date: cert.date,
    })),
  ].sort((a, b) => {
    const getYear = (d: string) => {
      if (d === "Present") return 9999
      const match = d.match(/\d{4}/)
      return match ? Number.parseInt(match[0]) : 0
    }
    return getYear(b.date) - getYear(a.date)
  })

  const getIcon = (type: string) => {
    switch (type) {
      case "experience":
        return Briefcase
      case "education":
        return GraduationCap
      case "certification":
        return Award
      default:
        return Calendar
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "experience":
        return "#ff2d55"
      case "education":
        return "#bf5af2"
      case "certification":
        return "#ff9500"
      default:
        return "#8e8e93"
    }
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-16 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.5} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-primary/10 border border-neon-primary/30 rounded-full mb-3 sm:mb-4">
              <Crosshair className="w-3 h-3 text-neon-primary" />
              <span className="text-neon-primary font-mono text-xs">MISSION_LOG</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="text-neon-primary">&gt;</span> Timeline
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              My professional journey through development, learning, and continuous growth.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mb-12">
            {["experience", "education", "certification"].map((type) => {
              const Icon = getIcon(type)
              return (
                <div key={type} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${getColor(type)}20` }}
                  >
                    <Icon size={16} style={{ color: getColor(type) }} />
                  </div>
                  <span className="text-muted-foreground capitalize">{type}</span>
                </div>
              )
            })}
          </div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {timelineItems.map((item, i) => {
              const Icon = getIcon(item.type)
              const color = getColor(item.type)
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative mb-8 pl-12 md:pl-0 md:w-1/2 ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"}`}
                >
                  {/* Node */}
                  <div
                    className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center md:-translate-x-1/2"
                    style={{ backgroundColor: `${color}20`, boxShadow: `0 0 10px ${color}40` }}
                  >
                    <Icon size={14} style={{ color }} />
                  </div>

                  {/* Card */}
                  <div
                    className="p-5 bg-surface border border-border rounded-lg hover:border-neon-primary/30 transition-colors cursor-pointer"
                    onClick={() => playSound("click")}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                      <span className="text-xs font-mono text-muted-foreground">{item.date}</span>
                    </div>

                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{item.subtitle}</p>

                    {item.description && <p className="text-sm text-muted-foreground mb-3">{item.description}</p>}

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className={`space-y-1 ${isLeft ? "md:text-left" : ""}`}>
                        {item.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="text-neon-primary mt-0.5">•</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
      <CommandBar />
    </>
  )
}
