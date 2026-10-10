"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, ChevronDown, Shield, Terminal, FileText } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { useApp } from "@/components/app-provider"
import { useTheme } from "@/components/theme-provider"
import { resumeData } from "@/src/data"

export default function HomePage() {
  const { playSound } = useAudio()
  const { isRecruiterMode } = useApp()
  const { theme } = useTheme()
  const isLight = theme === "light"

  // Recruiter mode simplified view
  if (isRecruiterMode) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1 pt-10 sm:pt-12 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {resumeData.name}
              </h1>
              <p className="text-lg sm:text-xl text-neon-primary mb-6 font-mono">
                AI Engineer · Software Engineer · Cybersecurity
              </p>
              <p className="text-foreground mb-8 text-sm sm:text-base">{resumeData.summary}</p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-7 sm:mb-9">
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
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main
        id="main-content"
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundColor: isLight ? "#faf9f8" : "#0a0a0f",
        }}
      >
        <div className="fixed inset-0 z-0 pointer-events-none">
          <MultiLanguageMatrix opacity={0.12} />
        </div>

        <section className="relative min-h-[76svh] lg:min-h-[calc(100svh-4rem)] flex items-center justify-center px-4 py-8 sm:py-10 lg:py-12">
          <div className="relative z-10 container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
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
                    &gt; echa --status
                    <span className="inline-block w-2 h-4 sm:h-5 ml-1 bg-neon-primary terminal-cursor" />
                  </p>
                </div>
              </div>

              <div className="text-center mb-8">
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="text-neon-primary">AI Engineering</span> ×{" "}
                  <span className="text-foreground">Cybersecurity & Software</span>
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  I build AI-powered tools, security automation, and reliable software — combining{" "}
                  <span className="text-neon-primary font-semibold">engineering discipline</span> with{" "}
                  <span className="text-neon-primary font-semibold">offensive-security thinking</span>.
                </p>
              </div>

              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface/80 backdrop-blur rounded-full border border-border">
                  <Terminal className="w-4 h-4 text-neon-primary" />
                  <span className="text-neon-primary font-mono text-sm sm:text-base">AI Engineering · Autonomous Systems · Cybersecurity</span>

                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                <Link
                  href="/projects/echa"
                  onClick={() => playSound("click")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-neon-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all hover:gap-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background shadow-lg"
                >
                  Explore ECHA
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

              <div className="max-w-3xl mx-auto mb-8 rounded-xl border border-neon-primary/30 bg-surface/90 p-5 sm:p-6 text-left">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-neon-primary">Flagship · In active development</span>
                  <span className="px-2 py-1 rounded bg-warning/10 text-warning text-xs">ECHA</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Autonomous Engineering &amp; Security Platform</h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  ECHA explores a controlled AI-agent runtime alongside a modular desktop shell. The design emphasizes explicit tool permissions, auditability, and verification instead of unrestricted autonomous execution.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["TypeScript", "Rust", "React", "Tauri", "Ollama", "Security Automation"].map((item) => (
                    <span key={item} className="px-2 py-1 rounded bg-background border border-border text-xs font-mono">{item}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/projects/echa" className="text-sm font-semibold text-neon-primary hover:underline">Project details →</Link>
                  <Link href="/case-studies/echa" className="text-sm font-semibold text-neon-primary hover:underline">Architecture case study →</Link>
                  <a href={resumeData.projects.find((project) => project.slug === "echa")?.githubUrl ?? resumeData.github} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-neon-primary hover:underline">Source repository ↗</a>
                </div>
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

        {/* Inspiration: the JARVIS idea, translated into real engineering goals. */}
        <section
          id="inspiration"
          aria-labelledby="inspiration-heading"
          className="relative z-10 overflow-hidden border-y border-border bg-background/95 py-8 sm:py-10 lg:py-12"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-5 max-w-3xl sm:mb-6">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-neon-primary sm:text-sm">
                  The idea behind the build
                </p>
                <h2 id="inspiration-heading" className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  Inspired by <span className="text-neon-primary">JARVIS.</span>
                  <span className="block text-foreground">Driven by real engineering.</span>
                </h2>
                <p className="mt-2.5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Tony Stark&apos;s fictional assistant sparked my curiosity about intelligent systems that can
                  understand context, work with tools, and help solve complex problems. I want to explore that
                  ambition through practical AI engineering, cybersecurity, and reliable software—not just a
                  futuristic interface.
                </p>
              </div>

              <div className="grid min-w-0 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
                <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
                  <div className="relative overflow-hidden bg-background">
                    {/* The selected Tony Stark / Iron Man GIF from the profile README. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://media2.giphy.com/media/YeXKsgwj7HOtuNgKc8/giphy.gif"
                      alt="Tony Stark from Iron Man, representing the JARVIS-inspired engineering ambition"
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/3]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 sm:p-5 sm:pt-16">
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/75">The inspiration</p>
                      <p className="mt-1 text-lg font-semibold text-white sm:text-xl">Think beyond the interface.</p>
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-3">
                    <blockquote className="text-base font-semibold italic leading-relaxed text-foreground sm:text-lg">
                      “Sometimes you gotta run before you can walk.”
                    </blockquote>
                    <p className="mt-2 text-sm text-muted-foreground">— Tony Stark, <em>Iron Man</em> (2008)</p>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col rounded-2xl border border-neon-primary/30 bg-surface/90 p-4 sm:p-5 lg:p-6">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-neon-primary/30 bg-neon-primary/10 px-3 py-1 font-mono text-xs text-neon-primary">
                      ECHA · IN ACTIVE DEVELOPMENT
                    </span>
                    <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
                      Precision in shadows.
                    </span>
                  </div>
                  <h3 className="text-xl font-bold sm:text-2xl">Turning inspiration into ECHA</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                    ECHA (Echelon Cybernetic Heuristic Aegis) is my long-term project for bringing AI-agent
                    workflows, security tooling, and a desktop interface into one modular ecosystem.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      ["01", "Understand", "Interpret the task and its context."],
                      ["02", "Plan", "Choose a bounded, auditable approach."],
                      ["03", "Act carefully", "Use tools with explicit permissions."],
                      ["04", "Verify", "Inspect outcomes and recover from failure."],
                    ].map(([number, title, description]) => (
                      <div key={number} className="min-w-0 rounded-xl border border-border bg-background/70 p-2.5 sm:p-3">
                        <span className="font-mono text-xs text-neon-primary">{number}</span>
                        <h4 className="mt-1 font-semibold text-foreground">{title}</h4>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">{description}</p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="mt-4 border-l-2 border-neon-primary pl-4 text-sm leading-6 text-foreground sm:text-base">
                    “Don&apos;t build the machine that follows commands. Build the system that understands the mission.”
                    <span className="mt-2 block text-xs font-normal text-muted-foreground">
                      My own design principle for ECHA—not a Tony Stark quote.
                    </span>
                  </blockquote>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      href="/projects/echa"
                      onClick={() => playSound("click")}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-neon-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
                    >
                      Explore ECHA <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="/case-studies/echa"
                      onClick={() => playSound("click")}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:border-neon-primary/50 sm:w-auto"
                    >
                      Read the architecture case study <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10 lg:py-12 bg-surface/95 backdrop-blur-md relative z-10">
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

        <section className="py-8 sm:py-10 lg:py-12 relative z-10 bg-background/95 backdrop-blur-md">
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

        <section className="py-8 sm:py-10 lg:py-12 relative z-10 bg-background/95 backdrop-blur-md">
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
    </div>
  )
}
