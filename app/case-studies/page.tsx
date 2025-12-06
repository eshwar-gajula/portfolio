"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FileText, ArrowRight, Shield } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { resumeData } from "@/src/data"

export default function CaseStudiesPage() {
  const { playSound } = useAudio()

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-16 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.35} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-primary/10 border border-neon-primary/30 rounded-full mb-3 sm:mb-4">
              <FileText className="w-3 h-3 text-neon-primary" />
              <span className="text-neon-primary font-mono text-xs">CASE_STUDIES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="text-neon-primary">&gt;</span> Case Studies
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              In-depth analysis of my projects — exploring the problems, approaches, and outcomes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeData.projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/case-studies/${project.slug}`}
                  onClick={() => playSound("click")}
                  className="block group h-full bg-surface/90 backdrop-blur border border-border rounded-lg overflow-hidden hover:border-neon-primary/50 transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-neon-primary" />
                      <span className="text-xs font-mono text-neon-primary px-2 py-1 bg-neon-primary/10 rounded">
                        {project.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold mb-2 group-hover:text-neon-primary transition-colors">
                      {project.name}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs bg-surface-elevated rounded font-mono">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground">+{project.techStack.length - 3}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-neon-primary text-sm group-hover:gap-3 transition-all">
                      Read Case Study
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CommandBar />
    </>
  )
}
