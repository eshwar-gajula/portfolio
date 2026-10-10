"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Terminal, ArrowUpRight, FolderOpen } from "lucide-react"
import { useApp } from "./app-provider"
import { useAudio } from "./audio-provider"
import { resumeData } from "@/src/data"

interface CommandResult {
  type: "success" | "error" | "info"
  message: string
}

const COMMANDS = [
  { cmd: "help", desc: "Show available commands" },
  { cmd: "pages", desc: "List every page, including pages outside the main navigation" },
  { cmd: "hidden", desc: "List non-header, utility, and detail routes" },
  { cmd: "jump <page>", desc: "Navigate by name or route (try: jump security notes)" },
  { cmd: "open <project>", desc: "Open a project detail page" },
  { cmd: "resume", desc: "Open the resume page" },
  { cmd: "whoami", desc: "Show the portfolio owner" },
  { cmd: "echo <text>", desc: "Print text in the terminal" },
  { cmd: "clear", desc: "Clear terminal history" },
]

const STATIC_PAGES = [
  { label: "Home", href: "/", group: "Main" },
  { label: "Projects", href: "/projects", group: "Main" },
  { label: "ECHA — Agent + Shell", href: "/projects/echa", group: "Main" },
  { label: "ECHA Shell", href: "/projects/echa-shell", group: "Project detail pages · direct route" },
  { label: "About", href: "/about", group: "Main" },
  { label: "Skills", href: "/skills", group: "Main" },
  { label: "Resume", href: "/resume", group: "Main" },
  { label: "Contact", href: "/contact", group: "Main" },
  { label: "Timeline", href: "/timeline", group: "More pages · not in header" },
  { label: "Case Studies", href: "/case-studies", group: "More pages · not in header" },
  { label: "Security Notes", href: "/security-notes", group: "More pages · not in header" },
  { label: "Changelog", href: "/changelog", group: "More pages · not in header" },
  { label: "Labs", href: "/labs", group: "More pages · not in header" },
  { label: "Offline Fallback", href: "/offline", group: "Utility / direct route" },
]

const SECURITY_NOTE_PAGES = [
  { label: "Web Application Reconnaissance", href: "/security-notes/web-app-recon", group: "Security note details" },
  { label: "Authentication Bypass Concepts", href: "/security-notes/auth-bypass-concepts", group: "Security note details" },
  { label: "XSS Attack Fundamentals", href: "/security-notes/xss-fundamentals", group: "Security note details" },
  { label: "SQL Injection Theory", href: "/security-notes/sql-injection-theory", group: "Security note details" },
  { label: "Privilege Escalation Concepts", href: "/security-notes/privilege-escalation", group: "Security note details" },
]

const CASE_STUDY_PAGES = [
  { label: "ECHA Architecture Case Study", href: "/case-studies/echa", group: "Case study details · not in header" },
]

const PAGE_LINKS = [
  ...STATIC_PAGES,
  ...resumeData.projects.map((project) => ({
    label: `Project: ${project.name}`,
    href: `/projects/${project.slug}`,
    group: "Project detail pages",
  })),
  ...CASE_STUDY_PAGES,
  ...resumeData.projects.filter((project) => !CASE_STUDY_PAGES.some((page) => page.href === `/case-studies/${project.slug}`)).map((project) => ({
    label: `Case study: ${project.name}`,
    href: `/case-studies/${project.slug}`,
    group: "Case study detail pages · direct route",
  })),
  ...SECURITY_NOTE_PAGES,
]

function normalizePageQuery(value: string) {
  return value.trim().toLowerCase().replace(/^\//, "").replace(/[\s_]+/g, "-")
}

const PAGE_ALIASES: Record<string, string> = {
  echa: "/projects/echa",
  "echa-agent": "/projects/echa",
  "case-study": "/case-studies",
  "case-studies": "/case-studies",
  "security-note": "/security-notes",
  "security-notes": "/security-notes",
  "offline": "/offline",
  "offline-fallback": "/offline",
}


export function CommandBar() {
  const router = useRouter()
  const { isCommandBarOpen, setCommandBarOpen } = useApp()
  const { playSound } = useAudio()
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Array<{ input: string; result: CommandResult }>>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandBarOpen(!isCommandBarOpen)
        playSound("beep")
      }
      if (e.key === "Escape" && isCommandBarOpen) {
        setCommandBarOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isCommandBarOpen, setCommandBarOpen, playSound])

  // Focus the input, trap keyboard focus while open, and restore focus on close.
  useEffect(() => {
    if (!isCommandBarOpen) return

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    inputRef.current?.focus()

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleDialogKeyDown)
    return () => {
      document.removeEventListener("keydown", handleDialogKeyDown)
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
    }
  }, [isCommandBarOpen])

  // Scroll to bottom on new history
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = useCallback(
    (cmd: string): CommandResult => {
      const trimmed = cmd.trim().toLowerCase()
      const parts = trimmed.split(" ")
      const command = parts[0]
      const args = parts.slice(1).join(" ")

      switch (command) {
        case "help":
          return {
            type: "info",
            message: [
              ...COMMANDS.map((c) => `  ${c.cmd.padEnd(20)} - ${c.desc}`),
              "",
              `  ${PAGE_LINKS.length} routes are discoverable. Run "pages" to list all routes, including non-header pages.`,
              "  Not in the main header: Timeline, Case Studies, Security Notes, Changelog, Labs, Offline Fallback, plus every project/case-study/security-note detail route.",
            ].join("\n"),
          }

        case "pages":
        case "hidden":
        case "routes":
          return {
            type: "info",
            message: PAGE_LINKS.map((page) => `  ${page.label.padEnd(43)} ${page.href}`).join("\n"),
          }

        case "jump":
        case "goto":
        case "cd": {
          const query = normalizePageQuery(args)
          const aliasPath = PAGE_ALIASES[query]
          const match = PAGE_LINKS.find((page) =>
            normalizePageQuery(page.href) === query ||
            normalizePageQuery(page.label) === query ||
            normalizePageQuery(page.label.replace(/^(project|case study):\s*/i, "")) === query,
          )
          const target = aliasPath || (args.startsWith("/") && PAGE_LINKS.some((page) => page.href === args) ? args : match?.href)
          if (target) {
            router.push(target)
            setCommandBarOpen(false)
            return { type: "success", message: `Navigating to ${target}...` }
          }
          return { type: "error", message: `Unknown page: ${args}. Run "pages" to see every available route.` }
        }

        case "open": {
          const project = resumeData.projects.find(
            (p) => p.slug.toLowerCase() === args || p.name.toLowerCase().includes(args),
          )
          if (project) {
            router.push(`/projects/${project.slug}`)
            setCommandBarOpen(false)
            return { type: "success", message: `Opening ${project.name}...` }
          }
          return { type: "error", message: `Project not found: ${args}. Run "pages" to browse project pages.` }
        }

        case "resume":
          router.push("/resume")
          setCommandBarOpen(false)
          return { type: "success", message: "Opening resume..." }

        case "clear":
          setHistory([])
          return { type: "success", message: "" }

        case "labs_unlock":
          return { type: "info", message: 'Labs are public educational content. Use "jump labs" to enter.' }

        case "whoami":
          return { type: "info", message: resumeData.name }

        case "echo":
          return { type: "info", message: args || "" }

        default:
          return { type: "error", message: `Command not found: ${command}. Type "help" for available commands.` }
      }
    },
    [router, setCommandBarOpen],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    playSound("click")
    const result = executeCommand(input)
    setHistory((prev) => [...prev, { input, result }])
    setInput("")
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex]?.input || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex]?.input || "")
      } else {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  if (!isCommandBarOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
        onClick={() => setCommandBarOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="mx-auto flex min-h-dvh w-full max-w-3xl items-start justify-center overflow-y-auto px-3 py-[max(1rem,5vh)] sm:px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-bar-title"
            className="my-auto w-full overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
            style={{ boxShadow: "var(--glow-primary)" }}
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2 bg-surface-elevated border-b border-border">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-neon-primary" />
                <span id="command-bar-title" className="text-xs font-mono text-muted-foreground">Portfolio command bar</span>
              </div>
              <button
                onClick={() => setCommandBarOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close command bar"
              >
                <X size={14} />
              </button>
            </div>

            {/* Terminal content */}
            <div ref={terminalRef} className="max-h-[min(68dvh,42rem)] overflow-y-auto p-3 font-mono text-sm sm:p-4">
              {/* Welcome message and route discovery */}
              {history.length === 0 && (
                <div className="mb-5">
                  <p className="mb-3 text-xs leading-5 text-muted-foreground">Quick navigation. Search by page or project name, or type <code className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 text-neon-primary">pages</code> / <code className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 text-neon-primary">hidden</code> to reveal every direct and non-header route.</p>
                  <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"><FolderOpen size={14} /> {input.trim() && /^(pages|hidden|routes)(\s|$)/i.test(input.trim()) ? "Complete route directory" : "Quick destinations"}</div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {PAGE_LINKS.filter((page) => {
                      const rawQuery = input.trim().toLowerCase()
                      const showAllRoutes = /^(pages|hidden|routes)(\s|$)/.test(rawQuery)
                      const query = /^(pages|hidden|routes)$/.test(rawQuery) ? "" : rawQuery.replace(/^(jump|goto|cd|pages|hidden|routes)\s+/, "")
                      const inDefaultDirectory = page.group === "Main"
                      const matchesQuery = !query || page.label.toLowerCase().includes(query) || page.href.toLowerCase().includes(query) || page.group.toLowerCase().includes(query)
                      return (showAllRoutes || query ? true : inDefaultDirectory) && matchesQuery
                    }).map((page) => (
                      <button
                        key={`${page.group}:${page.href}:${page.label}`}
                        type="button"
                        onClick={() => { router.push(page.href); setCommandBarOpen(false); playSound("click") }}
                        className="group flex min-w-0 items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 text-left transition-all duration-150 hover:border-neon-primary/60 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="min-w-0">
                          <span className="block break-words text-xs font-semibold text-foreground group-hover:text-neon-primary">{page.label}</span>
                          <span className="mt-1 block break-all text-[10px] leading-4 text-muted-foreground">{page.href}</span>
                          {page.group !== "Main" && <span className="mt-1 inline-flex rounded border border-border bg-surface-elevated px-1.5 py-0.5 text-[9px] leading-3 text-muted-foreground">{page.group}</span>}
                        </span>
                        <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-neon-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* History */}
              {history.map((item, i) => (
                <div key={i} className="mb-3">
                  <div className="flex items-center gap-2 text-neon-primary">
                    <span>&gt;</span>
                    <span>{item.input}</span>
                  </div>
                  {item.result.message && (
                    <pre
                      className={`mt-1 whitespace-pre-wrap ${
                        item.result.type === "error"
                          ? "text-destructive"
                          : item.result.type === "success"
                            ? "text-success"
                            : "text-foreground"
                      }`}
                      aria-live="polite"
                    >
                      {item.result.message}
                    </pre>
                  )}
                </div>
              ))}

              {/* Input line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-neon-primary">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                  placeholder="Try pages, jump skills, or open echa..."
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="w-2 h-4 bg-neon-primary terminal-cursor" />
              </form>
            </div>
          </div>

          <p className="mt-2 text-center text-xs text-muted-foreground">
            <kbd className="rounded bg-surface px-1.5 py-0.5">ESC</kbd> to close · <kbd className="rounded bg-surface px-1.5 py-0.5">Ctrl / ⌘ K</kbd> to toggle
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
