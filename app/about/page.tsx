"use client"
import { motion } from "framer-motion"
import {
  MapPin,
  Code,
  Terminal,
  Award,
  Heart,
  Shield,
  Skull,
  Bug,
  Linkedin,
  Crosshair,
  Zap,
  Eye,
  Github,
  ExternalLink,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { resumeData } from "@/src/data"

export default function AboutPage() {
  const hackerStats = [
    { label: "Projects in Portfolio", value: String(resumeData.projects.length), icon: Code },
    { label: "Listed Skills", value: String(resumeData.skills.length), icon: Terminal },
    { label: "Flagship Platform", value: "ECHA", icon: Zap },
    { label: "Focus Areas", value: "3", icon: Bug },
  ]

  const journeySteps = [
    "Built a foundation in web and software development",
    "Developed interest in hacking, CTFs, and red-team methodology",
    "Now connecting AI engineering, software systems, and cybersecurity",
  ]

  const whatIDo = [
    "Build responsive, modern front-end systems",
    "Practice security concepts in authorized labs and CTFs",
    "Develop ECHA: agent workflows, desktop UI, and controlled automation",
  ]

  const philosophy = [
    "Secure-by-design beats patching later.",
    "Interfaces should remain stable even under adversarial pressure.",
  ]

  const futureDirection = [
    "AI and security engineering with strong product/UI awareness",
    "Building tools that detect and prevent attacks",
    "Publishing security notes and research",
  ]


  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-8 sm:pt-12 pb-8 sm:pb-12 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.08} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-neon-primary/10 border border-neon-primary/30 rounded-full mb-4 sm:mb-6"
              >
                <Skull className="w-3 h-3 sm:w-4 sm:h-4 text-neon-primary" />
                <span className="text-neon-primary font-mono text-xs sm:text-sm">PROFILE_OVERVIEW</span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 font-mono">
                <span className="text-muted-foreground">&gt;</span> <span className="text-foreground">whoami</span>{" "}
                <span className="neon-glow text-neon-primary">Eshwar</span>
              </h1>

              <div className="flex items-center justify-center gap-2 sm:gap-4 text-muted-foreground font-mono flex-wrap text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <MapPin size={14} className="text-neon-primary sm:w-4 sm:h-4" />
                  <span>{resumeData.location}</span>
                </div>
                <span className="text-neon-primary hidden sm:inline">|</span>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Shield size={14} className="text-neon-secondary sm:w-4 sm:h-4" />
                  <span>AI & Software Engineering · Cybersecurity</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              {hackerStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-surface/90 backdrop-blur border border-border rounded-lg p-3 sm:p-4 text-center group hover:border-neon-primary/50 transition-all"
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-neon-primary mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xl sm:text-2xl font-bold text-neon-primary font-mono">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Intro Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface/80 backdrop-blur border border-border rounded-lg overflow-hidden mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-surface-elevated border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
                <span className="text-sm font-mono text-muted-foreground ml-2">~/about/intro.sh</span>
              </div>

              <div className="p-4 font-mono sm:p-6">
                <div className="text-neon-primary mb-2">
                  <span className="text-muted-foreground">$</span> cat intro.txt
                </div>
                <p className="mb-6 border-l-2 border-neon-primary/30 pl-4 text-base leading-7 text-foreground sm:text-lg">
                  I&apos;m <span className="text-neon-primary font-bold">Eshwar</span> — a software and AI engineering practitioner exploring local LLMs, developer tooling, automation, and practical cybersecurity. I enjoy building useful interfaces and systems that make complex workflows easier to understand and control.
                </p>

                <div className="text-neon-primary mb-2">
                  <span className="text-muted-foreground">$</span> echo $SUMMARY
                </div>
                <p className="border-l-2 border-neon-secondary/30 pl-4 leading-7 text-muted-foreground">
                  {resumeData.summary}
                </p>
              </div>
            </motion.div>

            {/* Journey & What I Do Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-surface/80 backdrop-blur border border-border rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-surface-elevated border-b border-border">
                  <Terminal className="text-neon-primary" size={20} />
                  <h2 className="text-lg font-bold font-mono">MY_JOURNEY</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {journeySteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-neon-primary font-mono text-sm mt-0.5">{`0${i + 1}`}</span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-surface/80 backdrop-blur border border-border rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-surface-elevated border-b border-border">
                  <Code className="text-neon-primary" size={20} />
                  <h2 className="text-lg font-bold font-mono">WHAT_I_DO</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {whatIDo.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Shield className="text-neon-primary flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Philosophy & Future Direction Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-surface/80 backdrop-blur border border-border rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-surface-elevated border-b border-border">
                  <Eye className="text-neon-primary" size={20} />
                  <h2 className="text-lg font-bold font-mono">ENGINEERING_PHILOSOPHY</h2>
                </div>
                <div className="p-6 space-y-4">
                  {philosophy.map((quote, i) => (
                    <blockquote key={i} className="pl-4 border-l-2 border-neon-primary/50 italic text-foreground">
                      &quot;{quote}&quot;
                    </blockquote>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-surface/80 backdrop-blur border border-border rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-surface-elevated border-b border-border">
                  <Crosshair className="text-neon-primary" size={20} />
                  <h2 className="text-lg font-bold font-mono">FUTURE_DIRECTION</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {futureDirection.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-neon-primary">→</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Inspiration and the ECHA project */}
            <motion.section
              id="inspiration"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mb-8 scroll-mt-24 overflow-hidden rounded-2xl border border-neon-primary/30 bg-surface/90"
              aria-labelledby="about-inspiration-heading"
            >
              <div className="border-b border-border bg-surface-elevated px-5 py-4 sm:px-6">
                <p className="mb-1 font-mono text-xs uppercase tracking-[0.18em] text-neon-primary">Personal inspiration</p>
                <h2 id="about-inspiration-heading" className="text-xl font-bold leading-tight sm:text-2xl">
                  From the JARVIS idea to a real engineering challenge
                </h2>
              </div>
              <div className="grid min-w-0 gap-5 p-4 sm:p-6 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-7">
                <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://media2.giphy.com/media/YeXKsgwj7HOtuNgKc8/giphy.gif"
                    alt="Tony Stark from Iron Man, representing the JARVIS-inspired engineering ambition"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <blockquote className="border-l-2 border-neon-primary pl-4 text-lg font-semibold italic leading-relaxed text-foreground sm:text-xl">
                    “Sometimes you gotta run before you can walk.”
                  </blockquote>
                  <p className="mt-2 text-sm text-muted-foreground">— Tony Stark, <em>Iron Man</em> (2008)</p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                    JARVIS is fictional, but the engineering questions behind the idea are real: how can software
                    understand a task, coordinate tools, automate complex work, and remain observable, dependable,
                    and under human control? That curiosity is one of the inspirations behind my work.
                  </p>
                </div>
              </div>
              <div className="border-t border-border p-4 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Zap className="text-neon-primary" size={19} />
                  <h3 className="font-mono text-sm font-bold sm:text-base">ECHA · ECHELON CYBERNETIC HEURISTIC AEGIS</h3>
                  <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">In active development</span>
                </div>
                <p className="max-w-4xl text-sm leading-7 text-muted-foreground sm:text-base">
                  ECHA is my long-term project connecting a TypeScript-based AI-agent architecture with a desktop
                  interface built using Tauri, React, TypeScript, and Rust. The direction includes local-LLM
                  orchestration, controlled tool use, permissions, audit trails, and verification. Planned
                  capabilities are still being engineered; I aim to make reliability and human oversight part of
                  the architecture from the start.
                </p>
                <blockquote className="mt-5 border-l-2 border-neon-primary pl-4 text-sm font-semibold leading-6 text-foreground sm:text-base">
                  “Don&apos;t build the machine that follows commands. Build the system that understands the mission.”
                  <span className="mt-1 block text-xs font-normal text-muted-foreground">My own ECHA design principle—not a Tony Stark quote.</span>
                </blockquote>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="https://github.com/eshwar-gajula/ECHA-shell"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-neon-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
                  >
                    Explore ECHA Shell <ExternalLink size={15} />
                  </a>
                  <a
                    href={resumeData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:border-neon-primary/50 sm:w-auto"
                  >
                    Explore my GitHub <Github size={15} />
                  </a>
                </div>
              </div>
            </motion.section>

            {/* TryHackMe profile: link to the live profile instead of presenting a stale hard-coded badge inventory. */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-8 overflow-hidden rounded-2xl border border-border bg-surface/90 shadow-sm"
              aria-labelledby="tryhackme-title"
            >
              <div className="flex items-center gap-3 border-b border-border bg-surface-elevated px-5 py-4 sm:px-6">
                <Shield className="text-neon-primary" size={20} />
                <div className="min-w-0">
                  <h2 id="tryhackme-title" className="font-mono text-base font-bold sm:text-lg">TRYHACKME_PROFILE</h2>
                  <p className="mt-1 text-xs text-muted-foreground">Hands-on cybersecurity learning and authorised labs</p>
                </div>
              </div>
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="max-w-2xl">
                  <p className="leading-7 text-muted-foreground">
                    I use structured labs and CTF-style practice to strengthen my understanding of web security, Linux, networking, and defensive concepts. The live profile is the source of truth for current rooms, badges, and progress.
                  </p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">Badge counts are intentionally not hard-coded here, so the portfolio does not display stale progress.</p>
                </div>
                <a
                  href={resumeData.thm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-neon-primary/40 bg-neon-primary/10 px-4 py-3 text-sm font-semibold text-neon-primary transition-colors hover:bg-neon-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Open TryHackMe profile <ExternalLink size={16} />
                </a>
              </div>
            </motion.section>

            {/* Activity & Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="bg-surface/80 backdrop-blur border border-border rounded-lg overflow-hidden mb-8"
            >
              <div className="flex items-center gap-3 px-6 py-4 bg-surface-elevated border-b border-border">
                <ExternalLink className="text-neon-primary" size={20} />
                <h2 className="text-lg font-bold font-mono">ACTIVITY_&_LEARNING</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-4">
                  <a
                    href={resumeData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neon-primary/10 border border-neon-primary/30 rounded-lg hover:bg-neon-primary/20 transition-colors"
                  >
                    <Github size={18} className="text-neon-primary" />
                    <span className="text-neon-primary font-mono text-sm">View GitHub</span>
                  </a>
                  <a
                    href={resumeData.thm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neon-secondary/10 border border-neon-secondary/30 rounded-lg hover:bg-neon-secondary/20 transition-colors"
                  >
                    <Shield size={18} className="text-neon-secondary" />
                    <span className="text-neon-secondary font-mono text-sm">TryHackMe Profile</span>
                  </a>
                  <a
                    href={resumeData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-4 py-2 transition-colors hover:border-neon-primary/50"
                  >
                    <Linkedin size={18} className="text-neon-primary" />
                    <span className="font-mono text-sm text-foreground">LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-surface/80 backdrop-blur border border-border rounded-lg overflow-hidden mb-8"
            >
              <div className="flex items-center gap-3 px-6 py-4 bg-surface-elevated border-b border-border">
                <Heart className="text-neon-primary" size={20} />
                <h2 className="text-lg font-bold font-mono">INTERESTS[]</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {resumeData.about.interests.map((interest, i) => (
                    <motion.span
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + i * 0.05 }}
                      className="px-3 py-1.5 bg-neon-primary/10 text-neon-primary rounded border border-neon-primary/30 font-mono text-sm hover:bg-neon-primary/20 transition-colors cursor-default"
                    >
                      #{interest.toLowerCase().replace(/\s/g, "_")}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            {resumeData.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-surface/80 backdrop-blur border border-border rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-surface-elevated border-b border-border">
                  <Award className="text-neon-primary" size={20} />
                  <h2 className="text-lg font-bold font-mono">ACHIEVEMENTS_UNLOCKED</h2>
                  <span className="ml-auto px-2 py-1 bg-neon-primary/20 text-neon-primary text-xs font-mono rounded">
                    {resumeData.certifications.length} CERTS
                  </span>
                </div>
                <div className="p-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resumeData.certifications.map((cert, i) => (
                      <motion.div
                        key={cert.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="group p-4 bg-background/50 border border-border rounded-lg hover:border-neon-primary/50 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-neon-primary/10 rounded group-hover:bg-neon-primary/20 transition-colors">
                            <Shield className="w-5 h-5 text-neon-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-neon-primary font-mono text-sm">{cert.name}</div>
                            <div className="text-xs text-muted-foreground mt-1 font-mono">
                              {cert.issuer} :: {cert.date}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Footer Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-6 sm:mt-9 text-center"
            >
              <p className="text-muted-foreground font-mono text-sm">
                <span className="text-neon-primary">&gt;</span> EOF reached. Connection maintained.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}
