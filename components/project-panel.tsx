"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, Download, Code2 } from "lucide-react"
import { useAudio } from "./audio-provider"

interface Project {
  id: string
  name: string
  slug: string
  description: string
  longDescription?: string
  techStack: string[]
  category: string
  demoUrl?: string | null
  githubUrl?: string | null
  image?: string
  highlights?: string[]
}

interface ProjectPanelProps {
  project: Project | undefined
  isOpen: boolean
  onClose: () => void
}

export function ProjectPanel({ project, isOpen, onClose }: ProjectPanelProps) {
  const { playSound } = useAudio()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        playSound("click")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    closeButtonRef.current?.focus()

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, playSound])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[90%] sm:max-w-lg bg-surface border-l border-border z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="panel-title"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-3 sm:p-4 bg-surface/95 backdrop-blur border-b border-border">
              <div className="flex items-center gap-2">
                <Code2 size={18} className="text-neon-primary" />
                <span className="font-mono text-xs sm:text-sm text-muted-foreground truncate">
                  forensic_analysis.log
                </span>
              </div>
              <button
                ref={closeButtonRef}
                onClick={() => {
                  onClose()
                  playSound("click")
                }}
                className="p-2 text-muted-foreground hover:text-foreground rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Close panel"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Project header */}
              <div>
                <span className="inline-block px-2 py-1 text-xs font-mono bg-neon-primary/10 text-neon-primary rounded mb-2 sm:mb-3">
                  {project.category}
                </span>
                <h2 id="panel-title" className="text-xl sm:text-2xl font-bold mb-2">
                  {project.name}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Tech stack */}
              <div>
                <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  <span className="text-neon-primary">&gt;</span> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-surface-elevated border border-border rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="text-neon-primary">&gt;</span> Key Features
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                        <span className="text-neon-primary mt-0.5">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Code excerpt */}
              <div>
                <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  <span className="text-neon-primary">&gt;</span> Code Preview
                </h3>
                <div className="bg-background rounded-lg p-3 sm:p-4 font-mono text-xs overflow-x-auto border border-border">
                  <pre className="text-muted-foreground">
                    <code>
                      {`// ${project.name} - Code Sample

import { security } from '@core';

export async function analyze(t: string) {
  const sanitized = validate(t);
  const results = await security.scan(
    sanitized, { mode: 'passive' }
  );
  return results.report();
}`}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Actions - Stack on mobile */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-neon-primary text-primary-foreground rounded font-medium hover:opacity-90 transition-opacity text-sm"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded font-medium hover:bg-surface-elevated transition-colors text-sm"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  onClick={() => playSound("click")}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded font-medium hover:bg-surface-elevated transition-colors text-sm"
                >
                  Full Details →
                </Link>
              </div>

              {/* Download artifact */}
              <div className="p-3 sm:p-4 bg-surface-elevated rounded-lg border border-border">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="font-medium text-xs sm:text-sm">Project Documentation</h4>
                    <p className="text-xs text-muted-foreground truncate">Download detailed analysis (PDF)</p>
                  </div>
                  <button
                    onClick={() => playSound("success")}
                    className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded hover:border-neon-primary/50 transition-colors shrink-0"
                  >
                    <Download size={14} />
                    <span className="text-xs sm:text-sm">PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
