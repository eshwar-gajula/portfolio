"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Download, Printer, Mail, MapPin, Linkedin, Github } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { resumeData } from "@/src/data"

export default function ResumePage() {
  const { playSound } = useAudio()
  const resumeRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    playSound("click")
    window.print()
  }

  const handleDownload = () => {
    playSound("success")
    // In production, this would download the PDF from /public/assets/resume.pdf
    const link = document.createElement("a")
    link.href = "/assets/resume.pdf"
    link.download = `${resumeData.name.replace(" ", "_")}_Resume.pdf`
    link.click()
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-16 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.5} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 print:hidden">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                <span className="text-neon-primary">&gt;</span> Resume
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm">Printable and downloadable format</p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-surface border border-border rounded-lg hover:border-neon-primary/50 transition-colors text-sm"
              >
                <Printer size={16} />
                <span>Print</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-neon-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Resume content */}
          <motion.div
            ref={resumeRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-surface border border-border rounded-lg p-8 md:p-12 print:border-none print:shadow-none print:p-0 print:bg-white"
          >
            {/* Header */}
            <header className="mb-8 pb-8 border-b border-border print:border-gray-300">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 print:text-black">{resumeData.name}</h1>
              <p className="text-xl text-muted-foreground mb-4 print:text-gray-600">{resumeData.title}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-1 text-muted-foreground hover:text-neon-primary print:text-gray-600"
                >
                  <Mail size={14} />
                  {resumeData.email}
                </a>
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
              <p className="text-muted-foreground print:text-gray-700">{resumeData.summary}</p>
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
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-3 text-neon-primary print:text-black">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1 text-sm bg-surface-elevated rounded print:bg-gray-100 print:text-black"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
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
            <section>
              <h2 className="text-lg font-bold mb-3 text-neon-primary print:text-black">Certifications</h2>
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
      <CommandBar />
    </>
  )
}
