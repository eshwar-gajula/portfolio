"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Shield, ArrowRight, Lock, AlertTriangle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"

const securityNotes = [
  {
    id: "web-app-recon",
    title: "Web Application Reconnaissance",
    objective: "Understanding target surface area through passive and active information gathering",
    category: "Recon",
  },
  {
    id: "auth-bypass-concepts",
    title: "Authentication Bypass Concepts",
    objective: "Exploring common authentication weaknesses and their theoretical exploitation",
    category: "Exploitation",
  },
  {
    id: "xss-fundamentals",
    title: "XSS Attack Fundamentals",
    objective: "Understanding cross-site scripting vulnerabilities and defense strategies",
    category: "Web Security",
  },
  {
    id: "sql-injection-theory",
    title: "SQL Injection Theory",
    objective: "Database injection concepts and secure coding practices",
    category: "Web Security",
  },
  {
    id: "privilege-escalation",
    title: "Privilege Escalation Concepts",
    objective: "Understanding how attackers move from low to high privileges",
    category: "Post-Exploitation",
  },
]

export default function SecurityNotesPage() {
  const { playSound } = useAudio()

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-16 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.35} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-primary/10 border border-neon-primary/30 rounded-full mb-3 sm:mb-4">
              <Shield className="w-3 h-3 text-neon-primary" />
              <span className="text-neon-primary font-mono text-xs">SECURITY_NOTES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="text-neon-primary">&gt;</span> Security Notes
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              Educational security research notes — concepts, methodologies, and defensive strategies.
            </p>

            <div className="mt-4 p-4 bg-warning/10 border border-warning/30 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-warning">Disclaimer:</strong> These notes are for educational purposes only. No
                real exploits, payloads, or instructions for unauthorized access are provided.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityNotes.map((note, i) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/security-notes/${note.id}`}
                  onClick={() => playSound("click")}
                  className="block group h-full bg-surface/90 backdrop-blur border border-border rounded-lg overflow-hidden hover:border-neon-primary/50 transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-5 h-5 text-neon-primary" />
                      <span className="text-xs font-mono text-neon-secondary px-2 py-1 bg-neon-secondary/10 rounded">
                        {note.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold mb-2 group-hover:text-neon-primary transition-colors">
                      {note.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4">{note.objective}</p>

                    <div className="flex items-center gap-2 text-neon-primary text-sm group-hover:gap-3 transition-all">
                      Read Note
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CommandBar />
    </>
  )
}
