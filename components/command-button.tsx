"use client"

import { Terminal } from "lucide-react"
import { useApp } from "./app-provider"
import { useAudio } from "./audio-provider"

export function CommandButton() {
  const { setCommandBarOpen } = useApp()
  const { playSound } = useAudio()

  const handleClick = () => {
    playSound("beep")
    setCommandBarOpen(true)
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-surface border border-border rounded-full shadow-lg hover:border-neon-primary/50 hover:shadow-neon-primary/20 transition-all group"
      aria-label="Open command palette"
    >
      <Terminal size={18} className="text-neon-primary" />
      <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline">
        Cmd+K
      </span>
    </button>
  )
}
