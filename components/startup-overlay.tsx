"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAudio } from "./audio-provider"
import { useApp } from "./app-provider"
import { useTheme } from "./theme-provider"
import { resumeData } from "@/data"

export function StartupOverlay() {
  const { playBootSound, playTypingSound, stopTypingSound } = useAudio()
  const { isOverlayVisible, setOverlayVisible } = useApp()
  const { theme } = useTheme()
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [showContinue, setShowContinue] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const continueButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOverlayVisible && progress < 100) {
      playTypingSound()
    }
    return () => {
      stopTypingSound()
    }
  }, [isOverlayVisible, playTypingSound, stopTypingSound, progress])

  // Stop typing sound when progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      stopTypingSound()
    }
  }, [progress, stopTypingSound])

  // Trap focus within overlay
  useEffect(() => {
    if (!isOverlayVisible) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleContinue()
        return
      }

      if (e.key !== "Tab") return

      const focusableElements = overlayRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOverlayVisible])

  // Focus continue button when shown
  useEffect(() => {
    if (showContinue) {
      continueButtonRef.current?.focus()
    }
  }, [showContinue])

  // Animate progress
  useEffect(() => {
    if (!isOverlayVisible) return

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setShowContinue(true)
          return 100
        }
        return p + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [isOverlayVisible])

  const handleContinue = useCallback(() => {
    playBootSound()
    setIsExiting(true)
    setTimeout(() => {
      setOverlayVisible(false)
    }, 500)
  }, [playBootSound, setOverlayVisible])

  if (!isOverlayVisible) return null

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          role="dialog"
          aria-modal="true"
          aria-labelledby="overlay-title"
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />

          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(var(--neon-primary) 1px, transparent 1px),
                linear-gradient(90deg, var(--neon-primary) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />

          <div className="relative z-10 max-w-lg w-full px-4 sm:px-6 text-center">
            {/* Terminal window */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-surface border border-border rounded-lg overflow-hidden shadow-2xl"
              style={{ boxShadow: "var(--glow-primary)" }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-surface-elevated border-b border-border">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-warning" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-success" />
                <span className="ml-2 text-[10px] sm:text-xs font-mono text-muted-foreground truncate">
                  blackroom@portfolio:~
                </span>
              </div>

              {/* Terminal content */}
              <div className="p-4 sm:p-6 text-left font-mono">
                <motion.p
                  id="overlay-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-neon-primary text-base sm:text-lg mb-4"
                >
                  {resumeData.greeting}
                </motion.p>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mb-1">
                    <span>Initializing systems...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-neon-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                {/* Log entries */}
                <div className="space-y-1 text-[10px] sm:text-xs text-muted-foreground mb-6">
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: progress > 20 ? 1 : 0, x: progress > 20 ? 0 : -10 }}
                  >
                    [OK] Loading modules...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: progress > 40 ? 1 : 0, x: progress > 40 ? 0 : -10 }}
                  >
                    [OK] Establishing connection...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: progress > 60 ? 1 : 0, x: progress > 60 ? 0 : -10 }}
                  >
                    [OK] Decrypting portfolio data...
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: progress > 80 ? 1 : 0, x: progress > 80 ? 0 : -10 }}
                  >
                    [OK] Ready for handshake...
                  </motion.p>
                </div>

                <AnimatePresence>
                  {showContinue && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <button
                        ref={continueButtonRef}
                        onClick={handleContinue}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neon-primary text-primary-foreground rounded font-semibold transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                      >
                        Enter Portfolio
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Skip button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={handleContinue}
              className="mt-4 text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded px-2 py-1"
            >
              Press ESC or click to skip
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
