"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Target, Search, AlertTriangle, Shield, CheckCircle, BookOpen } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"

const securityNotesData: Record<
  string,
  {
    title: string
    category: string
    objective: string
    recon: string[]
    exploitationConcept: string
    postExploitation: string
    mitigation: string[]
    lessons: string[]
  }
> = {
  "web-app-recon": {
    title: "Web Application Reconnaissance",
    category: "Recon",
    objective: "Understanding target surface area through passive and active information gathering",
    recon: [
      "WHOIS lookup and DNS enumeration",
      "Subdomain discovery using public sources",
      "Technology fingerprinting (Wappalyzer, BuiltWith)",
      "Directory and file enumeration",
      "Identifying input vectors and endpoints",
    ],
    exploitationConcept:
      "Reconnaissance itself is not exploitation, but it identifies potential attack vectors. Understanding the target's technology stack, exposed services, and entry points helps focus subsequent testing efforts.",
    postExploitation: "N/A for reconnaissance phase",
    mitigation: [
      "Minimize public information exposure",
      "Use rate limiting on enumeration-prone endpoints",
      "Implement proper error handling to prevent information leakage",
      "Regular security audits of public-facing assets",
    ],
    lessons: [
      "Thorough recon is the foundation of effective security testing",
      "Passive techniques often reveal more than expected",
      "Documentation of findings is crucial for later phases",
    ],
  },
  "auth-bypass-concepts": {
    title: "Authentication Bypass Concepts",
    category: "Exploitation",
    objective: "Exploring common authentication weaknesses and their theoretical exploitation",
    recon: [
      "Identify authentication mechanisms in use",
      "Check for default credentials",
      "Analyze session management implementation",
      "Review password reset functionality",
    ],
    exploitationConcept:
      'Authentication bypass can occur through various vectors: weak password policies, insecure session handling, flawed "remember me" features, or improper implementation of OAuth/SSO. Understanding these concepts helps build more secure systems.',
    postExploitation:
      "Successful auth bypass could lead to unauthorized access to user accounts, privilege escalation, or access to sensitive data.",
    mitigation: [
      "Implement multi-factor authentication",
      "Use secure session management",
      "Enforce strong password policies",
      "Regular security testing of auth flows",
    ],
    lessons: [
      "Authentication is often the weakest link",
      "Defense in depth is essential",
      "Regular audits of auth mechanisms are critical",
    ],
  },
  "xss-fundamentals": {
    title: "XSS Attack Fundamentals",
    category: "Web Security",
    objective: "Understanding cross-site scripting vulnerabilities and defense strategies",
    recon: [
      "Identify user input reflection points",
      "Test input sanitization effectiveness",
      "Check Content Security Policy headers",
      "Review DOM manipulation patterns",
    ],
    exploitationConcept:
      "XSS occurs when untrusted data is included in web pages without proper validation. This conceptually allows attackers to execute scripts in victims' browsers, potentially stealing session tokens or performing actions on their behalf.",
    postExploitation:
      "Conceptually, successful XSS could lead to session hijacking, credential theft, or website defacement.",
    mitigation: [
      "Implement Content Security Policy",
      "Use output encoding for all user data",
      "Validate and sanitize all inputs",
      "Use HttpOnly and Secure cookie flags",
    ],
    lessons: ["Never trust user input", "Context-aware encoding is essential", "CSP provides defense in depth"],
  },
  "sql-injection-theory": {
    title: "SQL Injection Theory",
    category: "Web Security",
    objective: "Database injection concepts and secure coding practices",
    recon: [
      "Identify database-connected endpoints",
      "Test for error-based information disclosure",
      "Analyze query patterns in application",
      "Review ORM usage and raw queries",
    ],
    exploitationConcept:
      "SQL injection occurs when user input is incorrectly filtered or not properly parameterized before being included in SQL queries. This theoretically allows attackers to manipulate database queries.",
    postExploitation:
      "Conceptually, successful SQLi could lead to data extraction, data modification, or even system command execution in severe cases.",
    mitigation: [
      "Use parameterized queries / prepared statements",
      "Implement least privilege database accounts",
      "Regular security audits of database queries",
      "Input validation and sanitization",
    ],
    lessons: [
      "Never concatenate user input into queries",
      "ORMs help but aren't foolproof",
      "Database permissions matter",
    ],
  },
  "privilege-escalation": {
    title: "Privilege Escalation Concepts",
    category: "Post-Exploitation",
    objective: "Understanding how attackers move from low to high privileges",
    recon: [
      "Enumerate current user privileges",
      "Identify misconfigured permissions",
      "Check for vulnerable software versions",
      "Review SUID/SGID binaries (Linux)",
    ],
    exploitationConcept:
      "Privilege escalation occurs when an attacker gains higher access levels than initially granted. This can happen through misconfigurations, vulnerable software, or exploiting trust relationships.",
    postExploitation:
      "Elevated privileges typically allow full system control, access to all data, and persistence mechanisms.",
    mitigation: [
      "Implement principle of least privilege",
      "Regular patching and updates",
      "Audit and monitor privilege changes",
      "Use role-based access control",
    ],
    lessons: [
      "Initial access is just the beginning",
      "Proper permission management is crucial",
      "Regular audits can prevent escalation paths",
    ],
  },
}

export default function SecurityNoteDetailPage() {
  const params = useParams()
  const { playSound } = useAudio()
  const slug = params?.slug as string

  const note = securityNotesData[slug]

  if (!note) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Note Not Found</h1>
            <Link href="/security-notes" className="text-neon-primary hover:underline">
              Back to Security Notes
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-16 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.35} />

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/security-notes"
            onClick={() => playSound("click")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon-primary mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Security Notes
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <span className="px-3 py-1 text-xs font-mono bg-neon-secondary/10 text-neon-secondary rounded mb-4 inline-block">
                {note.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{note.title}</h1>
            </div>

            {/* Objective */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface/90 backdrop-blur border border-border rounded-lg p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-neon-primary" />
                <h2 className="text-xl font-bold font-mono">OBJECTIVE</h2>
              </div>
              <p className="text-muted-foreground">{note.objective}</p>
            </motion.div>

            {/* Recon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface/90 backdrop-blur border border-border rounded-lg p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-neon-secondary" />
                <h2 className="text-xl font-bold font-mono">RECON (High-Level)</h2>
              </div>
              <ul className="space-y-2">
                {note.recon.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-neon-secondary font-mono text-sm">{`0${i + 1}`}</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Exploitation Concept */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface/90 backdrop-blur border border-border rounded-lg p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <h2 className="text-xl font-bold font-mono">EXPLOITATION CONCEPT</h2>
              </div>
              <p className="text-muted-foreground">{note.exploitationConcept}</p>
              <p className="text-xs text-warning mt-4 italic">
                Note: No actual payloads or exploitation code is provided. This is theoretical knowledge only.
              </p>
            </motion.div>

            {/* Mitigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-surface/90 backdrop-blur border border-border rounded-lg p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-success" />
                <h2 className="text-xl font-bold font-mono">MITIGATION</h2>
              </div>
              <ul className="space-y-2">
                {note.mitigation.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Lessons Learned */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-surface/90 backdrop-blur border border-border rounded-lg p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-neon-primary" />
                <h2 className="text-xl font-bold font-mono">LESSONS LEARNED</h2>
              </div>
              <ul className="space-y-2">
                {note.lessons.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-neon-primary">→</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <CommandBar />
    </>
  )
}
