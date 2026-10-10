"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Download, Printer, Mail, MapPin, Linkedin, Github, Phone, Globe, Shield } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { resumeData } from "@/src/data"

export default function ResumePage() {
  const { playSound } = useAudio()
  const resumeRef = useRef<HTMLDivElement>(null)
  const skillsByCategory = Object.entries(
    resumeData.skills.reduce<Record<string, string[]>>((groups, skill) => {
      if (!groups[skill.category]) groups[skill.category] = []
      groups[skill.category].push(skill.name)
      return groups
    }, {}),
  )

  const handlePrint = () => {
    playSound("click")
    window.print()
  }

  const handleDownload = () => {
    // The download link below points to the exact PDF supplied by Eshwar.
    playSound("success")
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pb-8 sm:pb-12 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.06} />

        <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12 relative z-10">
          <div className="no-print mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center print:hidden">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                <span className="text-neon-primary">&gt;</span> Resume
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">A concise overview of my software engineering, local-LLM experimentation, automation, and security-focused project work. Download the original resume PDF or use Print to print this page.</p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-surface border border-border rounded-lg hover:border-neon-primary/50 transition-colors text-sm"
              >
                <Printer size={16} />
                <span>Print</span>
              </button>
              <a
                href="/Eshwar_Gajula_Resume.pdf"
                download="Eshwar_Gajula_Resume.pdf"
                onClick={handleDownload}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-neon-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Resume content */}
          <motion.div
            ref={resumeRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-black/10 sm:p-8 lg:p-12 print:max-w-none print:rounded-none print:border-none print:shadow-none print:p-0 print:bg-white"
          >
            {/* Header */}
            <header className="mb-8 pb-8 border-b border-border print:border-gray-300">
              <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl print:text-black">{resumeData.name}</h1>
              <p className="mb-4 text-lg font-medium text-neon-primary sm:text-xl print:text-gray-700">{resumeData.title}</p>

              <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
                <a
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-1 text-muted-foreground hover:text-neon-primary print:text-gray-600"
                >
                  <Mail size={14} />
                  <span className="break-all">{resumeData.email}</span>
                </a>
                {resumeData.phone && <a href={`tel:${resumeData.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-1 text-muted-foreground hover:text-neon-primary print:text-gray-600"><Phone size={14} /> {resumeData.phone}</a>}
                <span className="flex items-center gap-1 text-muted-foreground print:text-gray-600">
                  <MapPin size={14} />
                  {resumeData.location}
                </span>
                <a
                  href={resumeData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-neon-primary print:text-gray-600"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
                <a
                  href={resumeData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-neon-primary print:text-gray-600 break-all"
                >
                  <Globe size={14} /> Website
                </a>
                <a
                  href={resumeData.thm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-neon-primary print:text-gray-600"
                >
                  <Shield size={14} /> TryHackMe
                </a>
                <a
                  href={resumeData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-neon-primary print:text-gray-600"
                >
                  <Github size={14} />
                  GitHub
                </a>
              </div>
            </header>

            {/* Summary */}
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-3 text-neon-primary print:text-black">Summary</h2>
              <p className="leading-7 text-muted-foreground print:text-gray-700">{resumeData.summary}</p>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-neon-primary print:text-black">Experience</h2>
              <div className="space-y-6">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-wrap justify-between gap-2 mb-1">
                      <h3 className="font-semibold print:text-black">{exp.role}</h3>
                      <span className="text-sm text-muted-foreground print:text-gray-600">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2 print:text-gray-600">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-2 print:text-gray-700">{exp.description}</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 print:text-gray-700">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="mb-8 break-inside-avoid">
              <h2 className="text-lg font-bold mb-3 text-neon-primary print:text-black">Technical Skills</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {skillsByCategory.map(([category, skills]) => (
                  <div key={category} className="min-w-0 rounded-lg border border-border bg-background/40 p-3 print:border-gray-200 print:bg-white">
                    <h3 className="mb-2 text-sm font-semibold print:text-black">{category}</h3>
                    <p className="break-words text-sm leading-6 text-muted-foreground print:text-gray-700">{skills.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Selected projects */}
            <section className="mb-8 break-inside-avoid">
              <h2 className="mb-4 text-lg font-bold text-neon-primary print:text-black">Selected Projects</h2>
              <div className="space-y-5">
                {resumeData.projects.filter((project) => project.featured || project.slug === "echa").slice(0, 6).map((project) => (
                  <article key={project.id} className="break-inside-avoid border-l-2 border-neon-primary/40 pl-4">
                    <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold print:text-black">{project.name}</h3>
                      <span className="text-xs text-muted-foreground print:text-gray-600">{project.category}</span>
                    </div>
                    <p className="mb-2 text-sm leading-6 text-muted-foreground print:text-gray-700">{project.description}</p>
                    <p className="text-xs leading-5 text-muted-foreground print:text-gray-600"><span className="font-semibold">Stack:</span> {project.techStack.join(" · ")}</p>
                    {project.status && <p className="mt-1 text-xs font-medium text-warning print:text-gray-700">Status: {project.status}. Capabilities are described conservatively and may be under active development.</p>}
                  </article>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-8 break-inside-avoid">
              <h2 className="text-lg font-bold mb-4 text-neon-primary print:text-black">Education</h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex flex-wrap justify-between gap-2 mb-1">
                      <h3 className="font-semibold print:text-black">
                        {edu.degree} in {edu.field}
                      </h3>
                      <span className="text-sm text-muted-foreground print:text-gray-600">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm print:text-gray-600">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section className="break-inside-avoid">
              <h2 className="text-lg font-bold mb-3 text-neon-primary print:text-black">Certifications & Training</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {resumeData.certifications.map((cert, i) => (
                  <div key={i} className="p-3 bg-surface-elevated rounded print:bg-gray-100">
                    <p className="font-medium text-sm print:text-black">{cert.name}</p>
                    <p className="text-xs text-muted-foreground print:text-gray-600">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}
