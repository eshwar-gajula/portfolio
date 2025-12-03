"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
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
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { cn } from "@/lib/utils"
import { resumeData } from "@/data"

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
}

const categoryIcons: Record<string, React.ElementType> = {
  Programming: Binary,
  Frontend: Globe,
  Backend: Server,
  Tools: Wrench,
  Data: Database,
  ML: Brain,
  Security: Shield,
}

const categoryColors: Record<string, string> = {
  Programming: "#ff2d55",
  Frontend: "#bf5af2",
  Backend: "#ff9500",
  Tools: "#30d158",
  Data: "#5ac8fa",
  ML: "#ff375f",
  Security: "#ff453a",
}

export default function SkillsPage() {
  const [filter, setFilter] = useState<string>("all")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const { playSound } = useAudio()

  const categories = useMemo(() => {
    const cats = new Set(resumeData.skills.map((s) => s.category))
    return ["all", ...Array.from(cats)]
  }, [])

  const filteredSkills = useMemo(() => {
    if (filter === "all") return resumeData.skills
    return resumeData.skills.filter((s) => s.category === filter)
  }, [filter])

  const selectedSkillData = useMemo(() => {
    return resumeData.skills.find((s) => s.name === selectedSkill)
  }, [selectedSkill])

  const relatedProjects = useMemo(() => {
    if (!selectedSkillData) return []
    return resumeData.projects.filter((p) =>
      (selectedSkillData as any).projects?.some((sp: string) => p.id === sp || p.slug === sp),
    )
  }, [selectedSkillData])

  const getSkillIcon = (skill: any) => {
    const iconName = skill.icon || "code"
    return skillIcons[iconName] || Code
  }

  const handleSkillClick = (skillName: string, isSelected: boolean) => {
    setSelectedSkill(isSelected ? null : skillName)
    // Play multiple sounds for louder, more noticeable feedback
    playSound("nodeSelect")
    setTimeout(() => playSound("beep"), 30)
    setTimeout(() => playSound("click"), 60)
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-16 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.5} />

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
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              Technical capabilities across programming, web development, and tools. Click on any skill to see related
              projects and details.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat) => {
              const Icon = cat !== "all" ? categoryIcons[cat] : Command
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat)
                    playSound("click")
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap flex-shrink-0",
                    filter === cat
                      ? "bg-neon-primary text-primary-foreground"
                      : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-neon-primary/50",
                  )}
                >
                  {Icon && <Icon size={14} className="sm:w-4 sm:h-4" />}
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Skills grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {filteredSkills.map((skill, i) => {
                  const color = categoryColors[skill.category] || "#ff2d55"
                  const isSelected = selectedSkill === skill.name
                  const SkillIcon = getSkillIcon(skill)

                  return (
                    <motion.button
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleSkillClick(skill.name, isSelected)}
                      className={cn(
                        "relative p-3 sm:p-4 text-left bg-surface border rounded-lg transition-all group focus:outline-none focus:ring-2 focus:ring-ring",
                        isSelected ? "border-neon-primary shadow-lg" : "border-border hover:border-neon-primary/50",
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
                          <h3 className="font-semibold text-sm sm:text-base group-hover:text-neon-primary transition-colors truncate">
                            {skill.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="px-1.5 py-0.5 rounded bg-surface-elevated">{skill.category}</span>
                            <span>{skill.years}y</span>
                          </div>
                        </div>
                      </div>

                      {/* Proficiency meter */}
                      <div className="h-1.5 sm:h-2 bg-surface-elevated rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ delay: i * 0.03 + 0.2, duration: 0.5 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-[10px] sm:text-xs text-muted-foreground">
                        <span>Proficiency</span>
                        <span className="font-mono">{skill.proficiency}%</span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Skill detail panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 sm:top-24">
                {selectedSkillData ? (
                  <motion.div
                    key={selectedSkill}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 sm:p-6 bg-surface border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center border border-border"
                        style={{ backgroundColor: `${categoryColors[selectedSkillData.category]}15` }}
                      >
                        {(() => {
                          const Icon = getSkillIcon(selectedSkillData)
                          return (
                            <Icon
                              size={24}
                              style={{ color: categoryColors[selectedSkillData.category] }}
                              className="sm:w-7 sm:h-7"
                            />
                          )
                        })()}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl">{selectedSkillData.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{selectedSkillData.category}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 p-3 bg-surface-elevated rounded-lg">
                        <div>
                          <span className="text-xs text-muted-foreground block">Experience</span>
                          <span className="font-mono text-lg font-bold">{selectedSkillData.years}y</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block">Proficiency</span>
                          <span
                            className="font-mono text-lg font-bold"
                            style={{ color: categoryColors[selectedSkillData.category] }}
                          >
                            {selectedSkillData.proficiency}%
                          </span>
                        </div>
                      </div>

                      {relatedProjects.length > 0 && (
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2">
                            <span className="text-neon-primary">&gt;</span> Used in Projects
                          </h4>
                          <div className="space-y-2">
                            {relatedProjects.map((project) => (
                              <a
                                key={project.id}
                                href={`/projects/${project.slug}`}
                                onClick={() => playSound("click")}
                                className="block p-2 sm:p-3 bg-surface-elevated rounded hover:bg-border transition-colors"
                              >
                                <span className="font-medium text-xs sm:text-sm">{project.name}</span>
                                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                                  {project.description}
                                </p>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-4 sm:p-6 bg-surface border border-border rounded-lg text-center">
                    <Info size={28} className="mx-auto mb-3 text-muted-foreground sm:w-8 sm:h-8" />
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Select a skill to view details and related projects
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CommandBar />
    </>
  )
}
