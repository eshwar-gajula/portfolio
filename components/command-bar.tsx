"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Terminal } from "lucide-react"
import { useApp } from "./app-provider"
import { useAudio } from "./audio-provider"
import { resumeData } from "@/src/data"

interface CommandResult {
  type: "success" | "error" | "info"
  message: string
}

const COMMANDS = [
  { cmd: "help", desc: "Show available commands" },
  { cmd: "jump <page>", desc: "Navigate to page (about, projects, skills, contact, timeline)" },
  { cmd: "open <project>", desc: "Open project details" },
  { cmd: "resume", desc: "View resume" },
  { cmd: "clear", desc: "Clear terminal" },
  { cmd: "labs_unlock <phrase>", desc: "Unlock labs section" },
]

export function CommandBar() {
  const router = useRouter()
  const { isCommandBarOpen, setCommandBarOpen, unlockLabs, isLabsUnlocked } = useApp()
  const { playSound } = useAudio()
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Array<{ input: string; result: CommandResult }>>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

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

  // Focus input when opened
  useEffect(() => {
    if (isCommandBarOpen) {
      inputRef.current?.focus()
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
            message: COMMANDS.map((c) => `  ${c.cmd.padEnd(20)} - ${c.desc}`).join("\n"),
          }

        case "jump":
        case "goto":
        case "cd":
          const pages: Record<string, string> = {
            home: "/",
            about: "/about",
            projects: "/projects",
            skills: "/skills",
            contact: "/contact",
            timeline: "/timeline",
            resume: "/resume",
            labs: isLabsUnlocked ? "/labs" : "",
          }
          if (pages[args]) {
            router.push(pages[args])
            setCommandBarOpen(false)
            return { type: "success", message: `Navigating to ${args}...` }
          }
          return { type: "error", message: `Unknown page: ${args}. Try: ${Object.keys(pages).join(", ")}` }

        case "open":
          const project = resumeData.projects.find(
            (p) => p.slug.toLowerCase() === args || p.name.toLowerCase().includes(args),
          )
          if (project) {
            router.push(`/projects/${project.slug}`)
            setCommandBarOpen(false)
            return { type: "success", message: `Opening ${project.name}...` }
          }
          return { type: "error", message: `Project not found: ${args}` }

        case "resume":
          router.push("/resume")
          setCommandBarOpen(false)
          return { type: "success", message: "Opening resume..." }

        case "clear":
          setHistory([])
          return { type: "success", message: "" }

        case "labs_unlock":
          if (unlockLabs(args)) {
            return { type: "success", message: '🔓 Labs unlocked! Use "jump labs" to enter.' }
          }
          return { type: "error", message: "Incorrect passphrase." }

        case "whoami":
          return { type: "info", message: resumeData.name }

        case "echo":
          return { type: "info", message: args || "" }

        default:
          return { type: "error", message: `Command not found: ${command}. Type "help" for available commands.` }
      }
    },
    [router, setCommandBarOpen, isLabsUnlocked, unlockLabs],
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
          className="container mx-auto mt-20 max-w-2xl px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-surface border border-border rounded-lg overflow-hidden shadow-2xl"
            style={{ boxShadow: "var(--glow-primary)" }}
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2 bg-surface-elevated border-b border-border">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-neon-primary" />
                <span className="text-xs font-mono text-muted-foreground">blackroom terminal</span>
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
            <div ref={terminalRef} className="max-h-80 overflow-y-auto p-4 font-mono text-sm">
              {/* Welcome message */}
              {history.length === 0 && (
                <p className="text-muted-foreground mb-4">Type &quot;help&quot; for available commands.</p>
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
                  placeholder="Enter command..."
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="w-2 h-4 bg-neon-primary terminal-cursor" />
              </form>
            </div>
          </div>

          <p className="mt-2 text-center text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 bg-surface rounded">ESC</kbd> to close
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
