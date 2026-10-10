"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal,
  Code,
  Cpu,
  Coffee,
  TerminalSquare,
  FileCode,
  Palette,
  Atom,
  Globe,
  Layout,
  Wind,
  FileType,
  GitBranch,
  BarChart,
  Brain,
  Layers,
  Database,
  Server,
  Shield,
  Wrench,
  Binary,
  Command,
  Info,
  Skull,
  Bug,
  Wifi,
  Lock,
  Key,
  Eye,
  Crosshair,
  Radio,
  X,
  Cloud,
  TestTube,
  RefreshCw,
  Hash,
  CheckCircle,
  Triangle,
  Flame,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { resumeData } from "@/src/data"
import type { Skill, Project } from "@/src/types/resume"

type SoundId = "click" | "beep" | "boot" | "nodeSelect" | "success" | "error" | "typing"

const skillIcons: Record<string, React.ElementType> = {
  terminal: Terminal,
  code: Code,
  cpu: Cpu,
  coffee: Coffee,
  "terminal-square": TerminalSquare,
  "file-code": FileCode,
  palette: Palette,
  atom: Atom,
  globe: Globe,
  layout: Layout,
  wind: Wind,
  "file-type": FileType,
  "git-branch": GitBranch,
  "bar-chart": BarChart,
  brain: Brain,
  layers: Layers,
  database: Database,
  server: Server,
  shield: Shield,
  wrench: Wrench,
  skull: Skull,
  bug: Bug,
  wifi: Wifi,
  lock: Lock,
  key: Key,
  eye: Eye,
  crosshair: Crosshair,
  radio: Radio,
  cloud: Cloud,
  "test-tube": TestTube,
  "refresh-cw": RefreshCw,
  hash: Hash,
  "check-circle": CheckCircle,
  triangle: Triangle,
  flame: Flame,
}

const categoryIcons: Record<string, React.ElementType> = {
  Programming: Binary,
  "Web Technologies": Globe,
  "AI & LLMs": Brain,
  Cybersecurity: Shield,
  "Systems & Networking": Wifi,
  Databases: Database,
  "Desktop Development": Layers,
  "Cloud & Platforms": Cloud,
  "Automation & Engineering": Wrench,
}

const darkCategoryColors: Record<string, string> = {
  Programming: "#fb7185",
  "Web Technologies": "#c4b5fd",
  "AI & LLMs": "#f472b6",
  Cybersecurity: "#fb7185",
  "Systems & Networking": "#7dd3fc",
  Databases: "#67e8f9",
  "Desktop Development": "#c4b5fd",
  "Cloud & Platforms": "#7dd3fc",
  "Automation & Engineering": "#fdba74",
}

const lightCategoryColors: Record<string, string> = {
  Programming: "#be123c",
  "Web Technologies": "#6d28d9",
  "AI & LLMs": "#9d174d",
  Cybersecurity: "#b91c1c",
  "Systems & Networking": "#075985",
  Databases: "#0e7490",
  "Desktop Development": "#6d28d9",
  "Cloud & Platforms": "#075985",
  "Automation & Engineering": "#9a3412",
}

function categoryColor(category: string, theme: string) {
  const palette = theme === "light" ? lightCategoryColors : darkCategoryColors
  return palette[category] || (theme === "light" ? "#a7192d" : "#fb7185")
}

function SkillDetailCard({
  skill,
  relatedProjects,
  onClose,
  playSound,
}: {
  skill: Skill
  relatedProjects: Project[]
  onClose: () => void
  playSound: (sound: SoundId) => void
}) {
  const getSkillIcon = (s: Skill) => {
    const iconName = s.icon || "code"
    return skillIcons[iconName] || Code
  }

  const Icon = getSkillIcon(skill)
  const { theme } = useTheme()
  const color = categoryColor(skill.category, theme)

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="p-4 bg-surface border border-neon-primary/50 rounded-lg mt-2 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center border border-border"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <h3 className="font-bold text-base">{skill.name}</h3>
              <p className="text-xs text-muted-foreground">{skill.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface-elevated rounded transition-colors"
            aria-label="Close details"
          >
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 p-3 bg-surface-elevated rounded-lg mb-4">
          <div className="min-w-0">
            <span className="text-xs text-muted-foreground block">Category</span>
            <span className="font-mono text-sm font-semibold break-words" style={{ color }}>
              {skill.category}
            </span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Mapped project evidence</span>
            <span className="font-mono text-lg font-bold">{relatedProjects.length}</span>
          </div>
        </div>

        {relatedProjects.length > 0 ? (
          <div>
            <h4 className="text-xs font-semibold mb-2 flex items-center gap-2">
              <span className="text-neon-primary">&gt;</span> Used in Projects
            </h4>
            <div className="space-y-2">
              {relatedProjects.map((project) => (
                <a
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  onClick={() => playSound("click")}
                  className="block p-2 bg-surface-elevated rounded hover:bg-border transition-colors"
                >
                  <span className="font-medium text-xs">{project.name}</span>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{project.description}</p>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <p className="rounded-lg border border-border bg-background/50 p-3 text-xs leading-5 text-muted-foreground">
            No public portfolio project is currently mapped to this skill. See the resume for the complete skills list.
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function SkillsPage() {
  const [filter, setFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const { playSound } = useAudio()
  const { theme } = useTheme()

  const categories = useMemo(() => {
    const cats = new Set(resumeData.skills.map((s) => s.category))
    return ["all", ...Array.from(cats)]
  }, [])

  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return resumeData.skills.filter((skill) => {
      const matchesCategory = filter === "all" || skill.category === filter
      const matchesQuery = !query || `${skill.name} ${skill.category}`.toLowerCase().includes(query)
      return matchesCategory && matchesQuery
    })
  }, [filter, searchQuery])

  const selectedSkillData = useMemo(() => {
    return resumeData.skills.find((s) => s.name === selectedSkill)
  }, [selectedSkill])

  const getRelatedProjects = (skill: Skill) => {
    return resumeData.projects.filter((p) =>
      skill.projects?.some((sp: string) => p.id === sp || p.slug === sp),
    )
  }

  const relatedProjects = useMemo(() => {
    if (!selectedSkillData) return []
    return getRelatedProjects(selectedSkillData)
  }, [selectedSkillData])

  const getSkillIcon = (skill: Skill) => {
    const iconName = skill.icon || "code"
    return skillIcons[iconName] || Code
  }

  const handleSkillClick = (skillName: string, isSelected: boolean) => {
    setSelectedSkill(isSelected ? null : skillName)
    playSound("click")
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-8 sm:pt-12 pb-8 sm:pb-12 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.08} />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-primary/10 border border-neon-primary/30 rounded-full mb-4">
              <Crosshair className="w-3 h-3 text-neon-primary" />
              <span className="text-neon-primary font-mono text-xs">ARSENAL_LOADED</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-neon-primary">&gt;</span> Skills
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base leading-7">
              A searchable catalogue based on my current resume and project work. Select a skill to inspect related
              public project evidence where it is mapped; the page deliberately avoids self-rated proficiency bars.
            </p>
          </div>

          {/* Search skills */}
          <div className="mb-4 max-w-xl">
            <label htmlFor="skill-search" className="mb-2 block text-sm font-medium text-foreground">Search skills</label>
            <input
              id="skill-search"
              type="search"
              value={searchQuery}
              onChange={(event) => { setSearchQuery(event.target.value); setSelectedSkill(null) }}
              placeholder="Try Python, Rust, OWASP, Ollama..."
              className="w-full min-w-0 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              autoComplete="off"
            />
          </div>

          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground" aria-live="polite">
            <span>{filteredSkills.length} of {resumeData.skills.length} skills shown</span>
            {(searchQuery || filter !== "all") && (
              <button type="button" onClick={() => { setSearchQuery(""); setFilter("all"); setSelectedSkill(null) }} className="rounded-md border border-border bg-surface px-3 py-1.5 font-medium text-foreground transition-colors hover:border-neon-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Clear filters
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="mb-8 flex max-w-full gap-2 overflow-x-auto px-4 pb-3 -mx-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:gap-3 sm:mb-12" role="group" aria-label="Filter skills by category">
            {categories.map((cat) => {
              const Icon = cat !== "all" ? categoryIcons[cat] : Command
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat)
                    setSelectedSkill(null)
                    playSound("click")
                  }}
                  aria-pressed={filter === cat}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors sm:px-4 sm:text-sm",
                    filter === cat
                      ? "border-neon-primary bg-neon-primary text-primary-foreground"
                      : "border-border bg-surface text-muted-foreground hover:border-neon-primary/50 hover:text-foreground",
                  )}
                >
                  {Icon && <Icon size={14} className="sm:w-4 sm:h-4" />}
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Skills grid - Now shows inline details on mobile */}
            <div className="lg:col-span-2">
              {filteredSkills.length === 0 ? (
                <div className="rounded-xl border border-border bg-surface p-6 text-center sm:col-span-2">
                  <Info size={28} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="font-semibold">No matching skills</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try another term or reset the category filter.</p>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(""); setFilter("all"); setSelectedSkill(null) }}
                    className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-neon-primary/50"
                  >Reset filters</button>
                </div>
              ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {filteredSkills.map((skill, i) => {
                  const color = categoryColor(skill.category, theme)
                  const isSelected = selectedSkill === skill.name
                  const SkillIcon = getSkillIcon(skill)

                  return (
                    <div key={skill.name}>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => handleSkillClick(skill.name, isSelected)}
                        aria-pressed={isSelected}
                        className={cn(
                          "relative w-full min-w-0 p-3 sm:p-4 text-left bg-surface border rounded-xl transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          isSelected ? "border-neon-primary shadow-lg bg-surface-elevated" : "border-border hover:border-neon-primary/60 hover:-translate-y-0.5 hover:shadow-md",
                        )}
                        style={{
                          boxShadow: isSelected ? `0 0 20px ${color}30` : undefined,
                        }}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center border border-border group-hover:border-neon-primary/50 transition-colors"
                            style={{ backgroundColor: `${color}15` }}
                          >
                            <SkillIcon size={20} style={{ color }} className="sm:w-6 sm:h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="break-words font-semibold text-sm sm:text-base group-hover:text-neon-primary transition-colors">
                              {skill.name}
                            </h3>
                            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <span className="inline-flex max-w-full items-center rounded-md border border-border bg-surface-elevated px-2 py-1 leading-tight">{skill.category}</span>
                              <span className="inline-flex items-center gap-1"><Layers size={12} aria-hidden="true" />{getRelatedProjects(skill).length} mapped projects</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-2.5 text-xs text-muted-foreground">
                          <span>{isSelected ? "Details expanded" : "Inspect project evidence"}</span>
                          <span aria-hidden="true" className="font-mono text-neon-primary">{isSelected ? "−" : "+"}</span>
                        </div>
                      </motion.button>

                      <div className="lg:hidden">
                        <AnimatePresence>
                          {isSelected && (
                            <SkillDetailCard
                              skill={skill}
                              relatedProjects={getRelatedProjects(skill)}
                              onClose={() => setSelectedSkill(null)}
                              playSound={playSound}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )
                })}
              </div>
              )}
            </div>

            {/* Skill detail panel - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                {selectedSkillData ? (
                  <motion.div
                    key={selectedSkill}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 bg-surface border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center border border-border"
                        style={{ backgroundColor: `${categoryColor(selectedSkillData.category, theme)}15` }}
                      >
                        {(() => {
                          const Icon = getSkillIcon(selectedSkillData)
                          return <Icon size={28} style={{ color: categoryColor(selectedSkillData.category, theme) }} />
                        })()}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{selectedSkillData.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedSkillData.category}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 p-3 bg-surface-elevated rounded-lg">
                        <div>
                          <span className="text-xs text-muted-foreground block">Mapped evidence</span>
                          <span className="font-mono text-lg font-bold">{relatedProjects.length}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block">Technical area</span>
                          <span
                            className="font-mono text-sm font-semibold"
                            style={{ color: categoryColor(selectedSkillData.category, theme) || "#ff2d55" }}
                          >
                            {selectedSkillData.category}
                          </span>
                        </div>
                      </div>

                      {relatedProjects.length > 0 ? (
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <span className="text-neon-primary">&gt;</span> Used in Projects
                          </h4>
                          <div className="space-y-2">
                            {relatedProjects.map((project) => (
                              <a
                                key={project.id}
                                href={`/projects/${project.slug}`}
                                onClick={() => playSound("click")}
                                className="block p-3 bg-surface-elevated rounded hover:bg-border transition-colors"
                              >
                                <span className="font-medium text-sm">{project.name}</span>
                                <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="rounded-lg border border-border bg-background/50 p-3 text-xs leading-5 text-muted-foreground">No public project is mapped to this skill yet. This is not a proficiency rating; see the resume for the complete skills list.</p>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-6 bg-surface border border-border rounded-lg text-center">
                    <Info size={32} className="mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">Select a skill to view details and related projects</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
