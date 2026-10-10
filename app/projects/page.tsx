"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Grid3X3, Network, ExternalLink, Github, Target, Brain, Globe, Code, Shield, Monitor, FlaskConical } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NodeGraph } from "@/components/node-graph"
import { ProjectPanel } from "@/components/project-panel"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { resumeData } from "@/src/data"

type ViewMode = "grid" | "graph"

const categoryColors: Record<string, string> = {
  "AI Engineering & Security": "#e11d48",
  "Desktop Development": "#7c3aed",
  Cybersecurity: "#b91c1c",
  "Test Automation": "#047857",
  "Web Development": "#6d28d9",
}

const categoryIcons: Record<string, React.ElementType> = {
  "AI Engineering & Security": Brain,
  "Desktop Development": Monitor,
  Cybersecurity: Shield,
  "Test Automation": FlaskConical,
  "Web Development": Globe,
}

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const { playSound } = useAudio()
  const { isLowPower, theme } = useTheme()

  const categories = useMemo(() => {
    const cats = new Set(resumeData.projects.map((p) => p.category))
    return ["all", ...Array.from(cats)]
  }, [])

  const filteredProjects = useMemo(() => {
    if (filter === "all") return resumeData.projects
    return resumeData.projects.filter((p) => p.category === filter)
  }, [filter])

  const handleProjectSelect = useCallback(
    (projectId: string) => {
      playSound("nodeSelect")
      setSelectedProject(projectId)
    },
    [playSound],
  )

  const selectedProjectData = useMemo(() => {
    return resumeData.projects.find((p) => p.id === selectedProject)
  }, [selectedProject])

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-8 sm:pt-12 pb-8 sm:pb-12 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.08} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-primary/10 border border-neon-primary/30 rounded-full mb-3 sm:mb-4">
                <Target className="w-3 h-3 text-neon-primary" />
                <span className="text-neon-primary font-mono text-xs">TARGETS_ACQUIRED</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                <span className="text-neon-primary">&gt;</span> Projects
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">Selected work across AI engineering, software development, and security tooling. Open ECHA for the flagship project architecture and current implementation status.</p>
            </div>

            {!isLowPower && (
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg p-1 w-fit">
                <button
                  onClick={() => {
                    setViewMode("grid")
                    playSound("click")
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded transition-colors",
                    viewMode === "grid"
                      ? "bg-neon-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={viewMode === "grid"}
                >
                  <Grid3X3 size={16} />
                  <span className="text-sm">Grid</span>
                </button>
                <button
                  onClick={() => {
                    setViewMode("graph")
                    playSound("click")
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded transition-colors",
                    viewMode === "graph"
                      ? "bg-neon-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={viewMode === "graph"}
                >
                  <Network size={16} />
                  <span className="text-sm">Graph</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat) => {
              const Icon = cat !== "all" ? categoryIcons[cat] || Code : Target
              const color = cat !== "all" ? (theme === "light" ? ({
                "AI Engineering & Security": "#a7192d",
                "Desktop Development": "#6d28d9",
                Cybersecurity: "#b91c1c",
                "Test Automation": "#047857",
                "Web Development": "#6d28d9",
              } as Record<string, string>)[cat] || "#a7192d" : categoryColors[cat]) : (theme === "light" ? "#a7192d" : "#ff2d55")
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat)
                    playSound("click")
                  }}
                  aria-pressed={filter === cat}
                  className={cn(
                    "flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    filter === cat
                      ? "text-white"
                      : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-neon-primary/50",
                  )}
                  style={{
                    backgroundColor: filter === cat ? color : undefined,
                    borderColor: filter === cat ? color : undefined,
                  }}
                >
                  <Icon size={14} className="sm:w-4 sm:h-4" />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "grid" || isLowPower ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid min-w-0 grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {filteredProjects.map((project, i) => {
                  const color = theme === "light"
                    ? ({ "AI Engineering & Security": "#a7192d", "Desktop Development": "#6d28d9", Cybersecurity: "#b91c1c", "Test Automation": "#047857", "Web Development": "#6d28d9" } as Record<string, string>)[project.category] || "#a7192d"
                    : categoryColors[project.category] || "#ff2d55"
                  const Icon = categoryIcons[project.category] || Code

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div
                        className="group h-full min-w-0 flex flex-col rounded-xl border border-border bg-surface/90 p-5 shadow-sm transition-all hover:border-neon-primary/50 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-6 cursor-pointer"
                        onClick={() => handleProjectSelect(project.id)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleProjectSelect(project.id) } }}
                        tabIndex={0}
                        role="button"
                        aria-label={`View ${project.name} details`}
                        style={{
                          borderColor: undefined,
                        }}
                      >
                        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                          <span
                            className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono rounded"
                            style={{
                              backgroundColor: `${color}20`,
                              color: color,
                            }}
                          >
                            <Icon size={12} />
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">Featured</span>
                          )}
                        </div>

                        <h3 className="mb-2 break-words text-lg font-semibold group-hover:text-neon-primary transition-colors sm:text-xl">
                          {project.name}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-3 flex-1">{project.description}</p>
                        {project.status && <p className="mb-4 text-xs font-medium text-muted-foreground">Status: <span className="text-neon-primary">{project.status}</span></p>}

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs rounded"
                              style={{
                                backgroundColor: `${color}10`,
                                border: `1px solid ${color}30`,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4">
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-neon-primary transition-colors"
                            >
                              <ExternalLink size={14} />
                              Demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-neon-primary transition-colors"
                            >
                              <Github size={14} />
                              Code
                            </a>
                          )}
                          <Link
                            href={`/projects/${project.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="ml-auto text-sm hover:underline"
                            style={{ color }}
                          >
                            Details →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            ) : (
              <motion.div
                key="graph"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[420px] overflow-hidden rounded-xl border border-border bg-surface sm:h-[600px]"
              >
                <NodeGraph
                  projects={filteredProjects}
                  onSelectProject={handleProjectSelect}
                  selectedProject={selectedProject}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <ProjectPanel project={selectedProjectData} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />

      <Footer />
    </>
  )
}
