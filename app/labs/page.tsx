"use client"

import { motion } from "framer-motion"
import { AlertTriangle, BookOpen, Terminal } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLanguageMatrix } from "@/components/backgrounds"

const labs = [
  { title: "Web Security Fundamentals", description: "Understanding OWASP Top 10 vulnerabilities and how to prevent them in your applications.", topics: ["XSS Prevention", "SQL Injection Defense", "CSRF Protection", "Secure Headers"] },
  { title: "Secure Code Review", description: "Best practices for reviewing code for security vulnerabilities before deployment.", topics: ["Static Analysis", "Dependency Scanning", "Secret Detection", "Code Patterns"] },
  { title: "Authentication Security", description: "Implementing secure authentication and session management in web applications.", topics: ["Password Hashing", "JWT Security", "MFA Implementation", "Session Management"] },
  { title: "API Security", description: "Designing and implementing secure APIs that resist common attack vectors.", topics: ["Rate Limiting", "Input Validation", "Authorization", "API Keys vs Tokens"] },
]

export default function LabsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-12 sm:pt-16 pb-8 sm:pb-12 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.08} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="text-neon-primary" size={20} />
                <h1 className="text-2xl sm:text-4xl font-bold"><span className="text-neon-primary">&gt;</span> Labs</h1>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                Educational security research, secure-code review, authentication hardening, and API security notes. This is a learning area: hands-on exercises and additional writeups are still planned, so the listed topics should not be interpreted as completed lab modules.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-warning/10 border border-warning/30 rounded-lg mb-6 sm:mb-8 flex items-start gap-3">
              <AlertTriangle className="text-warning shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-medium text-warning text-sm sm:text-base">Educational Content Disclaimer</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">These notes are for authorized labs and defensive learning. This page currently presents topic outlines rather than executable lab environments or completed walkthroughs.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {labs.map((lab, i) => (
                <motion.div key={lab.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-4 sm:p-6 bg-surface/80 backdrop-blur border border-border rounded-lg hover:border-neon-primary/30 transition-colors">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-neon-primary/10 rounded-lg flex items-center justify-center shrink-0"><BookOpen className="text-neon-primary" size={16} /></div>
                    <div><h2 className="font-semibold text-base sm:text-lg">{lab.title}</h2><p className="text-xs sm:text-sm text-muted-foreground mt-1">{lab.description}</p></div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {lab.topics.map((topic) => <span key={topic} className="px-2 py-1 text-xs bg-surface-elevated rounded">{topic}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 sm:mt-12 text-center"><p className="text-sm text-muted-foreground">Status: learning-resource outlines published; additional original writeups are planned.</p></div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
