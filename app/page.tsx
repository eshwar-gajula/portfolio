"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, ChevronDown, Shield, Terminal, FileText } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StartupOverlay } from "@/components/startup-overlay"
import { CommandBar } from "@/components/command-bar"
import { CommandButton } from "@/components/command-button"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { useApp } from "@/components/app-provider"
import { useTheme } from "@/components/theme-provider"
import { resumeData } from "@/src/data"

const taglines = [
  "Red-Team Front-End Engineer",
  "Security-Focused Developer",
  "Offensive Security Enthusiast",
  "Full-Stack Builder",
  "Automation Specialist",
]

const terminalCommands = [
  "blackroom@portfolio:~$ whoami",
  "blackroom@portfolio:~$ cat /etc/motd",
  "blackroom@portfolio:~$ ./handshake --init",
  "blackroom@portfolio:~$ nmap -sV localhost",
  "blackroom@portfolio:~$ echo 'Welcome, Operator.'",
]

export default function HomePage() {
  const { playSound } = useAudio()
  const { isRecruiterMode, isOverlayVisible } = useApp()
  const { theme } = useTheme()
  const isLight = theme === "light"
  const [typedText, setTypedText] = useState("")
  const [currentCommand] = useState(() => terminalCommands[Math.floor(Math.random() * terminalCommands.length)])
  const fullText = currentCommand

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0)
  const [currentTaglineText, setCurrentTaglineText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (isOverlayVisible) return

    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isOverlayVisible, fullText])

  useEffect(() => {
    if (isOverlayVisible) return

    const currentTagline = taglines[currentTaglineIndex]
    const typeSpeed = isDeleting ? 30 : 80
    const pauseTime = isDeleting ? 500 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentTaglineText.length < currentTagline.length) {
          setCurrentTaglineText(currentTagline.slice(0, currentTaglineText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (currentTaglineText.length > 0) {
          setCurrentTaglineText(currentTagline.slice(0, currentTaglineText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length)
        }
      }
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentTaglineText, isDeleting, currentTaglineIndex, isOverlayVisible])

  // Recruiter mode simplified view
  if (isRecruiterMode) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1 pt-16 bg-background relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <MultiLanguageMatrix opacity={0.35} />
          </div>
          <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {resumeData.name}
              </h1>
              <p className="text-lg sm:text-xl text-neon-primary mb-6 font-mono">
                {currentTaglineText}
                <span className="inline-block w-0.5 h-5 ml-1 bg-neon-primary animate-pulse" />
              </p>
              <p className="text-foreground mb-8 text-sm sm:text-base">{resumeData.summary}</p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12">
                <Link
                  href="/resume"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neon-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Resume
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={`mailto:${resumeData.email}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-surface transition-colors"
                >
                  Contact Me
                  <Mail size={18} />
                </a>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mb-4">Featured Projects</h2>
              <div className="grid gap-4">
                {resumeData.projects
                  .filter((p) => p.featured)
                  .map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      className="block p-4 sm:p-6 bg-surface/90 backdrop-blur border border-border rounded-lg hover:border-neon-primary/50 transition-colors"
                    >
                      <h3 className="font-semibold text-base sm:text-lg mb-2">{project.name}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs bg-surface-elevated rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <CommandBar />
        <CommandButton />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <StartupOverlay />
      <Header />

      <main
        id="main-content"
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundColor: isLight ? "#faf9f8" : "#0a0a0f",
        }}
      >
        <div className="fixed inset-0 z-0 pointer-events-none">
          <MultiLanguageMatrix opacity={0.35} />
        </div>

        <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 sm:pt-0">
          <div className="relative z-10 container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOverlayVisible ? 0 : 1, y: isOverlayVisible ? 20 : 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="mb-6 sm:mb-8 mt-4 sm:mt-0">
                <div className="bg-surface/95 backdrop-blur-md border border-border rounded-lg p-3 sm:p-4 text-left font-mono shadow-lg inline-block">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-xs text-muted-foreground ml-2">blackroom@portfolio</span>
                  </div>
                  <p className="text-neon-primary text-sm sm:text-lg">
                    {typedText}
                    <span className="inline-block w-2 h-4 sm:h-5 ml-1 bg-neon-primary terminal-cursor" />
                  </p>
                </div>
              </div>

              <div className="text-center mb-8">
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="text-neon-primary">Red-Team</span> Oriented{" "}
                  <span className="text-foreground">Front-End Engineer</span>
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  I design and build fast, secure web experiences — blending{" "}
                  <span className="text-neon-primary font-semibold">offensive security thinking</span> with{" "}
                  <span className="text-neon-primary font-semibold">modern front-end engineering</span>.
                </p>
              </div>

              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface/80 backdrop-blur rounded-full border border-border">
                  <Terminal className="w-4 h-4 text-neon-primary" />
                  <span className="text-neon-primary font-mono text-sm sm:text-base">{currentTaglineText}</span>
                  <span className="inline-block w-0.5 h-4 sm:h-5 bg-neon-primary animate-pulse" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                <Link
                  href="/projects"
                  onClick={() => playSound("click")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-neon-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all hover:gap-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background shadow-lg"
                >
                  View Projects
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/case-studies"
                  onClick={() => playSound("click")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-border bg-surface/90 backdrop-blur text-foreground font-semibold rounded-lg hover:border-neon-primary/50 hover:bg-surface transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background shadow-lg"
                >
                  <FileText size={18} />
                  Read Case Studies
                </Link>
              </div>

              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <a
                  href={resumeData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="text-muted-foreground hover:text-neon-primary transition-colors p-2 bg-surface/80 backdrop-blur rounded-full"
                  aria-label="GitHub"
                >
                  <Github size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a
                  href={resumeData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="text-muted-foreground hover:text-neon-primary transition-colors p-2 bg-surface/80 backdrop-blur rounded-full"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a
                  href={`mailto:${resumeData.email}`}
                  onClick={() => playSound("click")}
                  className="text-muted-foreground hover:text-neon-primary transition-colors p-2 bg-surface/80 backdrop-blur rounded-full"
                  aria-label="Email"
                >
                  <Mail size={20} className="sm:w-6 sm:h-6" />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-muted-foreground bg-surface/80 backdrop-blur p-2 rounded-full"
            >
              <ChevronDown size={20} className="sm:w-6 sm:h-6" />
            </motion.div>
          </motion.div>
        </section>

        <section className="py-12 sm:py-20 bg-surface/95 backdrop-blur-md relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
              Case <span className="text-neon-primary">Studies</span>
            </h2>
            <p className="text-muted-foreground text-center mb-8 sm:mb-12 max-w-xl mx-auto">
              In-depth breakdowns of my approach to solving complex problems.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {resumeData.projects
                .filter((p) => p.featured)
                .slice(0, 3)
                .map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={`/case-studies/${project.slug}`}
                      onClick={() => playSound("click")}
                      className="block group h-full p-4 sm:p-6 bg-background/95 backdrop-blur border border-border rounded-lg hover:border-neon-primary/50 transition-all hover:shadow-lg"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-4 h-4 text-neon-primary" />
                        <span className="text-xs font-mono text-neon-primary">CASE_STUDY</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-neon-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <span className="text-neon-primary text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                      </span>
                    </Link>
                  </motion.div>
                ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Link
                href="/case-studies"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 text-neon-primary hover:underline text-sm sm:text-base"
              >
                View all case studies
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20 relative z-10 bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              Featured <span className="text-neon-primary">Projects</span>
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {resumeData.projects
                .filter((p) => p.featured)
                .map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={() => playSound("click")}
                      className="block group h-full p-4 sm:p-6 bg-surface/95 backdrop-blur border border-border rounded-lg hover:border-neon-primary/50 transition-all hover:shadow-lg"
                      style={{ "--hover-shadow": "var(--glow-primary)" } as React.CSSProperties}
                    >
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <span className="px-2 py-1 text-xs font-mono bg-neon-primary/10 text-neon-primary rounded">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-neon-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs bg-surface-elevated rounded">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-1 text-xs text-muted-foreground">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <Link
                href="/projects"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 text-neon-primary hover:underline text-sm sm:text-base"
              >
                View all projects
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20 relative z-10 bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              Core <span className="text-neon-primary">Skills</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-4xl mx-auto">
              {resumeData.skills.slice(0, 8).map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-background/95 backdrop-blur border border-border rounded-full hover:border-neon-primary/50 transition-colors"
                >
                  <span className="font-mono text-xs sm:text-sm">{skill.name}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <Link
                href="/skills"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 text-neon-primary hover:underline text-sm sm:text-base"
              >
                View all skills
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CommandBar />
      <CommandButton />
    </div>
  )
}
