"use client"

import { useEffect, useState } from "react"
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
  { href: "/projects", label: "Projects" },
  { href: "/projects/echa", label: "ECHA" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { playSound } = useAudio()
  const { isRecruiterMode, setCommandBarOpen } = useApp()

  // Keep the mobile drawer in sync even when navigation comes from the command palette.
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleNavClick = () => {
    if (!isRecruiterMode) playSound("click")
    setIsMobileMenuOpen(false)
  }

  const handleCommandBarOpen = () => {
    if (!isRecruiterMode) playSound("beep")
    setCommandBarOpen(true)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-sm print:hidden">
      <div className="container mx-auto px-4">
        <div className="flex min-h-14 items-center justify-between gap-1.5 py-1.5 sm:min-h-16 sm:gap-2 sm:py-2">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => playSound("click")}
            className="flex min-w-0 shrink-0 items-center gap-1.5 rounded px-1.5 py-1 font-mono text-base font-bold text-foreground transition-colors hover:text-neon-primary focus:outline-none focus:ring-2 focus:ring-ring sm:gap-2 sm:px-2 sm:text-lg"
          >
            <Terminal size={20} className="text-neon-primary" />
            <span className="hidden sm:inline">Eshwar</span>
            <span className="text-neon-primary">_</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex min-w-0 items-center gap-0.5 2xl:gap-1" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={handleNavClick}
                className={cn(
                  "px-2 py-2 text-xs font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring 2xl:px-2.5 2xl:text-sm",
                  (pathname === item.href || (item.href === "/projects/echa" && pathname.startsWith("/projects/echa")))
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
                  "px-2 py-2 text-xs font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring 2xl:px-2.5 2xl:text-sm",
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
          <div className="flex min-w-0 shrink-0 items-center gap-1 sm:gap-2">
            {/* Command bar trigger */}
            {!isRecruiterMode && <button
              onClick={handleCommandBarOpen}
              className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-muted-foreground bg-surface border border-border rounded hover:border-neon-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Open command bar"
            >
              <span className="text-neon-primary">&gt;</span>
              <span>cmd</span>
              <kbd className="ml-2 px-1.5 py-0.5 text-[10px] bg-surface-elevated rounded">⌘K</kbd>
            </button>}

            {/* Toolbar buttons */}
            <ToolbarButtons />

            {/* Mobile menu toggle */}
            <button
              onClick={() => {
                if (!isRecruiterMode) playSound("click")
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }}
              className="xl:hidden shrink-0 p-2 text-foreground hover:text-neon-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
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
            className="xl:hidden border-t border-border bg-background/98 shadow-lg"
          >
            <nav className="container mx-auto max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain px-3 py-3 space-y-1 sm:px-4 sm:py-4" role="navigation" aria-label="Mobile navigation">
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
              {!isRecruiterMode && (
                <button
                  type="button"
                  onClick={() => { setIsMobileMenuOpen(false); handleCommandBarOpen() }}
                  className="mt-2 flex w-full items-center justify-between rounded-lg border border-neon-primary/30 bg-neon-primary/5 px-4 py-3 text-left text-base font-medium text-neon-primary transition-colors hover:bg-neon-primary/10 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <span className="flex items-center gap-2"><Terminal size={18} /> Open command palette</span>
                  <kbd className="rounded border border-border bg-surface-elevated px-2 py-1 text-xs">Ctrl / ⌘ K</kbd>
                </button>
              )}
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
