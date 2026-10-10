"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Award, Calendar, Crosshair } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLanguageMatrix } from "@/components/backgrounds"
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
    const getSortYear = (date: string) => {
      if (/present/i.test(date)) return 9999
      const years = date.match(/\d{4}/g)?.map(Number) ?? []
      return years.length ? Math.max(...years) : 0
    }
    return getSortYear(b.date) - getSortYear(a.date)
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
      <main id="main-content" className="min-h-screen pt-8 sm:pt-12 pb-8 sm:pb-12 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.07} />

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
          <div className="mb-8 sm:mb-12 flex flex-wrap gap-3 sm:gap-6" aria-label="Timeline categories">
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
          <div className="relative mx-auto max-w-4xl">
            {/* Vertical line */}
            <div className="absolute left-[1rem] top-2 bottom-2 w-px bg-gradient-to-b from-neon-primary/70 via-border to-neon-secondary/50 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />

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
                  className={`relative mb-6 sm:mb-8 pl-12 md:pl-0 md:w-1/2 ${isLeft ? "md:pr-9 md:text-right" : "md:pl-9 md:ml-auto"}`}
                >
                  {/* Node */}
                  <div
                    className="absolute left-0 top-1 md:left-1/2 z-10 h-8 w-8 rounded-xl border-2 border-background bg-surface flex items-center justify-center shadow-md md:-translate-x-1/2"
                    style={{ backgroundColor: `${color}20`, boxShadow: `0 0 10px ${color}40` }}
                  >
                    <Icon size={14} style={{ color }} />
                  </div>

                  {/* Card */}
                  <div
                    className="group min-w-0 rounded-xl border border-border bg-surface/95 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neon-primary/50 hover:shadow-lg sm:p-5"

                  >
                    <div className={`mb-3 flex items-center gap-2 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                      <span className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2.5 py-1 text-[11px] font-mono font-medium text-foreground sm:text-xs">
                        <Calendar size={12} className="shrink-0 text-neon-primary" aria-hidden="true" />{item.date}
                      </span>
                    </div>

                    <h3 className="mb-1 break-words text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-neon-primary sm:text-lg">{item.title}</h3>
                    <p className="mb-3 break-words text-sm font-medium text-muted-foreground">{item.subtitle}</p>

                    {item.description && <p className="text-sm text-muted-foreground mb-3">{item.description}</p>}

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className={`space-y-2 ${isLeft ? "md:text-left" : ""}`}>
                        {item.highlights.map((h, j) => (
                          <li key={j} className="flex min-w-0 items-start gap-2 text-xs leading-5 text-muted-foreground sm:text-sm">
                            <span className="mt-0.5 shrink-0 text-neon-primary" aria-hidden="true">›</span>
                            <span>{h}</span>
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
    </>
  )
}
