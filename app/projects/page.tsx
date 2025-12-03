"use client"

import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Grid3X3, Network, ExternalLink, Github, Target } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { NodeGraph } from "@/components/node-graph"
import { ProjectPanel } from "@/components/project-panel"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { resumeData } from "@/data"

type ViewMode = "grid" | "graph"

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const { playSound } = useAudio()
  const { isLowPower } = useTheme()

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
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-16 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.5} />

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
              <p className="text-muted-foreground text-sm sm:text-base">Explore my work in development</p>
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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat)
                  playSound("click")
                }}
                className={cn(
                  "px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors whitespace-nowrap flex-shrink-0",
                  filter === cat
                    ? "bg-neon-primary text-primary-foreground"
                    : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-neon-primary/50",
                )}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "grid" || isLowPower ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div
                      className="group h-full flex flex-col p-6 bg-surface border border-border rounded-lg hover:border-neon-primary/50 transition-all cursor-pointer"
                      onClick={() => handleProjectSelect(project.id)}
                      onKeyDown={(e) => e.key === "Enter" && handleProjectSelect(project.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View ${project.name} details`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-2 py-1 text-xs font-mono bg-neon-primary/10 text-neon-primary rounded">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">Featured</span>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold mb-2 group-hover:text-neon-primary transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-4 flex-1">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs bg-surface-elevated rounded">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t border-border">
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
                          className="ml-auto text-sm text-neon-primary hover:underline"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="graph"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[600px] bg-surface border border-border rounded-lg overflow-hidden"
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
      <CommandBar />
    </>
  )
}
