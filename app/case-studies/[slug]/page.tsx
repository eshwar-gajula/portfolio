"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Target, Lightbulb, Wrench, AlertTriangle, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { resumeData } from "@/src/data"

export default function CaseStudyDetailPage() {
  const params = useParams()
  const { playSound } = useAudio()
  const slug = params?.slug as string

  const project = resumeData.projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
            <Link href="/case-studies" className="text-neon-primary hover:underline">
              Back to Case Studies
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-16 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.35} />

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/case-studies"
            onClick={() => playSound("click")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon-primary mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Case Studies
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <span className="px-3 py-1 text-xs font-mono bg-neon-primary/10 text-neon-primary rounded mb-4 inline-block">
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{project.name}</h1>
              <p className="text-muted-foreground text-lg">{project.description}</p>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface/90 backdrop-blur border border-border rounded-lg p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-neon-primary" />
                <h2 className="text-xl font-bold font-mono">SUMMARY</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
            </motion.div>

            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface/90 backdrop-blur border border-border rounded-lg p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <h2 className="text-xl font-bold font-mono">PROBLEM</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {project.category === "AI/ML"
                  ? "Building AI models often requires expensive cloud resources and complex infrastructure. The challenge was to create a solution that works within free-tier constraints while still delivering meaningful results."
                  : "Modern web applications need to be fast, responsive, and user-friendly. The challenge was to build a scalable solution that improves user experience while maintaining clean architecture."}
              </p>
            </motion.div>

            {/* Approach & Methodology */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface/90 backdrop-blur border border-border rounded-lg p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-neon-primary" />
                <h2 className="text-xl font-bold font-mono">APPROACH & METHODOLOGY</h2>
              </div>
              <ul className="space-y-3">
                {project.highlights.slice(0, 3).map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-neon-primary font-mono text-sm mt-0.5">{`0${i + 1}`}</span>
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tools & Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-surface/90 backdrop-blur border border-border rounded-lg p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-5 h-5 text-neon-secondary" />
                <h2 className="text-xl font-bold font-mono">TOOLS & TECH STACK</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-neon-primary/10 text-neon-primary rounded border border-neon-primary/30 font-mono text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Outcome / Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-surface/90 backdrop-blur border border-border rounded-lg p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-success" />
                <h2 className="text-xl font-bold font-mono">OUTCOME / IMPACT</h2>
              </div>
              <ul className="space-y-2">
                {project.highlights.slice(3).map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-success mt-1">✓</span>
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neon-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  <ExternalLink size={18} />
                  View Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-surface text-foreground font-semibold rounded-lg hover:border-neon-primary/50 transition-colors"
                >
                  <Github size={18} />
                  View Code
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <CommandBar />
    </>
  )
}
