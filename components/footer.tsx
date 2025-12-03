"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Shield } from "lucide-react"
import { resumeData } from "@/data"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-20 border-t border-border bg-surface mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-mono font-bold text-lg text-foreground mb-2">{resumeData.name}</h3>
            <p className="text-sm text-muted-foreground">{resumeData.title}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-neon-primary transition-colors">
                About
              </Link>
              <Link
                href="/projects"
                className="text-sm text-muted-foreground hover:text-neon-primary transition-colors"
              >
                Projects
              </Link>
              <Link href="/resume" className="text-sm text-muted-foreground hover:text-neon-primary transition-colors">
                Resume
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-neon-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Social links */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Connect</h4>
            <div className="flex gap-4">
              <a
                href={resumeData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${resumeData.email}`}
                className="text-muted-foreground hover:text-neon-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Ethics disclaimer */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-start gap-2 text-xs text-muted-foreground mb-4">
            <Shield size={14} className="mt-0.5 flex-shrink-0" />
            <p>
              This portfolio is a professional showcase and educational resource only. No instructions, scripts, or
              tools that enable wrongdoing are provided. Any security-related content is strictly educational and
              follows responsible disclosure practices.
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            &copy; {currentYear} {resumeData.name}. Built with Next.js & deployed on Vercel.
          </p>
        </div>
      </div>
    </footer>
  )
}
