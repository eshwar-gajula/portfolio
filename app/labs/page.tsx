"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Unlock, AlertTriangle, BookOpen, Terminal } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { useApp } from "@/components/app-provider"
import { resumeData } from "@/data"

export default function LabsPage() {
  const { playSound } = useAudio()
  const { isLabsUnlocked, unlockLabs } = useApp()
  const [passphrase, setPassphrase] = useState("")
  const [error, setError] = useState("")

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (passphrase.toLowerCase() === resumeData.labsPassphrase?.toLowerCase()) {
      unlockLabs()
      playSound("success")
      setError("")
    } else {
      setError("Invalid passphrase. Try the command bar: labs_unlock <passphrase>")
      playSound("beep")
    }
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-24 pb-16 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.06} />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatePresence mode="wait">
            {!isLabsUnlocked ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-md mx-auto text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface/80 backdrop-blur border border-border flex items-center justify-center">
                  <Lock size={32} className="text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Labs Locked</h1>
                <p className="text-muted-foreground mb-8">
                  This section contains educational security research content. Enter the passphrase to unlock.
                </p>

                <form onSubmit={handleUnlock} className="space-y-4">
                  <div className="relative">
                    <input
                      type="password"
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                      placeholder="Enter passphrase..."
                      className="w-full px-4 py-3 bg-surface/80 backdrop-blur border border-border rounded-lg font-mono text-center focus:outline-none focus:ring-2 focus:ring-ring focus:border-neon-primary"
                    />
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neon-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Unlock size={18} />
                    Unlock Labs
                  </button>
                </form>

                <p className="text-xs text-muted-foreground mt-6">
                  Hint: Use the command bar (<kbd className="px-1 py-0.5 bg-surface rounded">⌘K</kbd>) and type{" "}
                  <code className="text-neon-primary">labs_unlock</code>
                </p>
              </motion.div>
            ) : (
              <motion.div key="unlocked" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Terminal className="text-neon-primary" size={24} />
                    <h1 className="text-4xl font-bold">
                      <span className="text-neon-primary">&gt;</span> Labs
                    </h1>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                    Educational security research, writeups, and learning resources. All content is for educational
                    purposes only.
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg mb-8 flex items-start gap-3">
                  <AlertTriangle className="text-warning shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-medium text-warning">Educational Content Disclaimer</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      All security research presented here is strictly for educational purposes. No tools, scripts, or
                      instructions that could enable malicious activity are provided. Always obtain proper authorization
                      before testing systems.
                    </p>
                  </div>
                </div>

                {/* Labs content */}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Web Security Fundamentals",
                      description:
                        "Understanding OWASP Top 10 vulnerabilities and how to prevent them in your applications.",
                      topics: ["XSS Prevention", "SQL Injection Defense", "CSRF Protection", "Secure Headers"],
                    },
                    {
                      title: "Secure Code Review",
                      description: "Best practices for reviewing code for security vulnerabilities before deployment.",
                      topics: ["Static Analysis", "Dependency Scanning", "Secret Detection", "Code Patterns"],
                    },
                    {
                      title: "Authentication Security",
                      description: "Implementing secure authentication and session management in web applications.",
                      topics: ["Password Hashing", "JWT Security", "MFA Implementation", "Session Management"],
                    },
                    {
                      title: "API Security",
                      description: "Designing and implementing secure APIs that resist common attack vectors.",
                      topics: ["Rate Limiting", "Input Validation", "Authorization", "API Keys vs Tokens"],
                    },
                  ].map((lab, i) => (
                    <motion.div
                      key={lab.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 bg-surface/80 backdrop-blur border border-border rounded-lg hover:border-neon-primary/30 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-neon-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <BookOpen className="text-neon-primary" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{lab.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{lab.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {lab.topics.map((topic) => (
                          <span key={topic} className="px-2 py-1 text-xs bg-surface-elevated rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Coming soon */}
                <div className="mt-12 text-center">
                  <p className="text-muted-foreground">More educational content coming soon...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      <CommandBar />
    </>
  )
}
