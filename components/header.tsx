"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Terminal } from "lucide-react"
import { ToolbarButtons } from "./toolbar-buttons"
import { useAudio } from "./audio-provider"
import { useApp } from "./app-provider"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/timeline", label: "Timeline" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { playSound } = useAudio()
  const { isRecruiterMode, setCommandBarOpen } = useApp()

  const handleNavClick = () => {
    playSound("click")
    setIsMobileMenuOpen(false)
  }

  const handleCommandBarOpen = () => {
    playSound("beep")
    setCommandBarOpen(true)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => playSound("click")}
            className="flex items-center gap-2 font-mono text-lg font-bold text-foreground hover:text-neon-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded px-2 py-1"
          >
            <Terminal size={20} className="text-neon-primary" />
            <span className="hidden sm:inline">Eshwar</span>
            <span className="text-neon-primary">_</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                  pathname === item.href
                    ? "text-neon-primary bg-surface"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface",
                )}
              >
                {item.label}
              </Link>
            ))}
            {!isRecruiterMode && (
              <Link
                href="/resume"
                onClick={handleNavClick}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                  pathname === "/resume"
                    ? "text-neon-primary bg-surface"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface",
                )}
              >
                Resume
              </Link>
            )}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Command bar trigger */}
            <button
              onClick={handleCommandBarOpen}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-muted-foreground bg-surface border border-border rounded hover:border-neon-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Open command bar"
            >
              <span className="text-neon-primary">&gt;</span>
              <span>cmd</span>
              <kbd className="ml-2 px-1.5 py-0.5 text-[10px] bg-surface-elevated rounded">⌘K</kbd>
            </button>

            {/* Toolbar buttons */}
            <ToolbarButtons />

            {/* Mobile menu toggle */}
            <button
              onClick={() => {
                playSound("click")
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }}
              className="lg:hidden p-2 text-foreground hover:text-neon-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1" role="navigation" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                    pathname === item.href
                      ? "text-neon-primary bg-surface"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/resume"
                onClick={handleNavClick}
                className={cn(
                  "block px-4 py-3 text-base font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                  pathname === "/resume"
                    ? "text-neon-primary bg-surface"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface",
                )}
              >
                Resume
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recruiter mode badge */}
      <AnimatePresence>
        {isRecruiterMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-accent text-primary-foreground text-xs font-bold rounded-full"
          >
            RECRUITER MODE
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
