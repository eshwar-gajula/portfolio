"use client"

import type React from "react"

import { motion } from "framer-motion"
import {
  MapPin,
  Award,
  Heart,
  Terminal,
  Shield,
  Skull,
  Bug,
  Code,
  Crosshair,
  Zap,
  Eye,
  Github,
  ExternalLink,
  Trophy,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { resumeData } from "@/src/data"

export default function AboutPage() {
  const hackerStats = [
    { label: "Projects Completed", value: "15+", icon: Code },
    { label: "Technologies", value: "20+", icon: Terminal },
    { label: "Coffee Consumed", value: "∞", icon: Zap },
    { label: "Bugs Fixed", value: "999+", icon: Bug },
  ]

  const journeySteps = [
    "Started in front-end development",
    "Developed interest in hacking, CTFs, and red-team methodology",
    "Now merging UI engineering with offensive security insights",
  ]

  const whatIDo = [
    "Build responsive, modern front-end systems",
    "Practice attack simulations and security labs",
    "Experiment with tools that combine UX and security",
  ]

  const philosophy = [
    "Secure-by-design beats patching later.",
    "Interfaces should remain stable even under adversarial pressure.",
  ]

  const futureDirection = [
    "Red-team engineer with strong product/UI awareness",
    "Building tools that detect and prevent attacks",
    "Publishing security notes and research",
  ]

  const tryhackmeBadges = [
    { name: "Advent of Cyber", icon: "🎄", color: "#88cc14" },
    { name: "OWASP Top 10", icon: "🔐", color: "#ff6b6b" },
    { name: "Web Fundamentals", icon: "🌐", color: "#4ecdc4" },
    { name: "Linux Fundamentals", icon: "🐧", color: "#ffa500" },
    { name: "Network Security", icon: "🌍", color: "#9b59b6" },
    { name: "Burp Suite", icon: "🔍", color: "#e74c3c" },
  ]

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-16 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.5} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-neon-primary/10 border border-neon-primary/30 rounded-full mb-4 sm:mb-6"
              >
                <Skull className="w-3 h-3 sm:w-4 sm:h-4 text-neon-primary" />
                <span className="text-neon-primary font-mono text-xs sm:text-sm">PROFILE_ACCESSED</span>
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
                  <span>Red-Team Front-End Engineer</span>
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

              <div className="p-6 font-mono">
                <div className="text-neon-primary mb-2">
                  <span className="text-muted-foreground">$</span> cat intro.txt
                </div>
                <p className="text-foreground leading-relaxed mb-6 pl-4 border-l-2 border-neon-primary/30 text-lg">
                  I'm <span className="text-neon-primary font-bold">Eshwar</span>, a front-end engineer with an
                  expanding focus on <span className="text-neon-primary">red-teaming</span> and{" "}
                  <span className="text-neon-primary">adversarial security</span>.
                </p>

                <div className="text-neon-primary mb-2">
                  <span className="text-muted-foreground">$</span> echo $SUMMARY
                </div>
                <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-neon-secondary/30">
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
                      "{quote}"
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-surface/80 backdrop-blur border border-border rounded-lg overflow-hidden mb-8"
            >
              <div className="flex items-center gap-3 px-6 py-4 bg-surface-elevated border-b border-border">
                <Trophy className="text-neon-primary" size={20} />
                <h2 className="text-lg font-bold font-mono">TRYHACKME_BADGES</h2>
                <span className="ml-auto px-2 py-1 bg-success/20 text-success text-xs font-mono rounded">
                  {tryhackmeBadges.length} EARNED
                </span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {tryhackmeBadges.map((badge, i) => (
                    <motion.div
                      key={badge.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="group flex flex-col items-center p-3 bg-background/50 border border-border rounded-lg hover:border-neon-primary/50 transition-all cursor-default"
                      style={{ "--badge-color": badge.color } as React.CSSProperties}
                    >
                      <span className="text-2xl mb-2">{badge.icon}</span>
                      <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors font-mono">
                        {badge.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <a
                    href="https://tryhackme.com/p/eshwar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-neon-primary hover:underline text-sm"
                  >
                    View all badges on TryHackMe
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>

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
                    href="https://tryhackme.com/p/eshwar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neon-secondary/10 border border-neon-secondary/30 rounded-lg hover:bg-neon-secondary/20 transition-colors"
                  >
                    <Shield size={18} className="text-neon-secondary" />
                    <span className="text-neon-secondary font-mono text-sm">TryHackMe Profile</span>
                  </a>
                  <a
                    href="https://app.hackthebox.com/profile/eshwar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/30 rounded-lg hover:bg-success/20 transition-colors"
                  >
                    <Terminal size={18} className="text-success" />
                    <span className="text-success font-mono text-sm">HackTheBox Profile</span>
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-12 text-center"
            >
              <pre className="text-neon-primary/30 font-mono text-xs inline-block">
                {`
  ╔══════════════════════════════════════╗
  ║  "Secure-by-design beats patching   ║
  ║   later."                           ║
  ╚══════════════════════════════════════╝
`}
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <CommandBar />
    </>
  )
}
