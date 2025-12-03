"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Moon, Sun, Zap, ZapOff, Briefcase, Check } from "lucide-react"
import { useTheme, type Theme } from "./theme-provider"
import { useAudio } from "./audio-provider"
import { useApp } from "./app-provider"
import { cn } from "@/lib/utils"

export function ToolbarButtons() {
  const { theme, setTheme, cycleTheme, isLowPower, toggleLowPower } = useTheme()
  const { isMuted, toggleMute, volume, setVolume, playSound, hasConsent } = useAudio()
  const { isRecruiterMode, toggleRecruiterMode } = useApp()

  const [showAudioPrefs, setShowAudioPrefs] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)

  const audioPrefsRef = useRef<HTMLDivElement>(null)
  const themeMenuRef = useRef<HTMLDivElement>(null)

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (audioPrefsRef.current && !audioPrefsRef.current.contains(e.target as Node)) {
        setShowAudioPrefs(false)
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setShowThemeMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleThemeMouseDown = () => {
    const timer = setTimeout(() => {
      setShowThemeMenu(true)
      playSound("beep")
    }, 500)
    setLongPressTimer(timer)
  }

  const handleThemeMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
  }

  const handleThemeClick = () => {
    if (!showThemeMenu) {
      // Simple toggle between night and day
      if (theme === "neon-hacker" || theme === "dark") {
        setTheme("light")
      } else {
        setTheme("neon-hacker")
      }
      playSound("click")
    }
  }

  const themeOptions: { value: Theme; label: string }[] = [
    { value: "neon-hacker", label: "Neon Hacker" },
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
    { value: "high-contrast", label: "High Contrast" },
  ]

  const isDarkTheme = theme === "neon-hacker" || theme === "dark" || theme === "high-contrast"

  return (
    <div className="flex items-center gap-1">
      {/* Audio toggle */}
      <div className="relative" ref={audioPrefsRef}>
        <button
          onClick={() => {
            if (hasConsent === false) {
              // Can't use audio if consent denied
              return
            }
            toggleMute()
            playSound("click")
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            setShowAudioPrefs(!showAudioPrefs)
          }}
          className={cn(
            "p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
            hasConsent === false
              ? "text-muted-foreground cursor-not-allowed"
              : "text-foreground hover:text-neon-primary hover:bg-surface",
          )}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          title="Click to toggle, right-click for preferences"
          disabled={hasConsent === false}
        >
          {isMuted || hasConsent === false ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Audio preferences dropdown */}
        <AnimatePresence>
          {showAudioPrefs && hasConsent !== false && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 p-4 bg-surface border border-border rounded-lg shadow-xl min-w-[200px] z-50"
            >
              <h3 className="text-sm font-semibold mb-3">Audio Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Volume</span>
                    <span>{Math.round(volume * 100)}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                    className="w-full accent-neon-primary"
                  />
                </div>

                <button
                  onClick={() => playSound("beep")}
                  className="w-full py-2 text-xs bg-surface-elevated hover:bg-border rounded transition-colors"
                >
                  Test Sound
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme toggle */}
      <div className="relative" ref={themeMenuRef}>
        <button
          onClick={handleThemeClick}
          onMouseDown={handleThemeMouseDown}
          onMouseUp={handleThemeMouseUp}
          onMouseLeave={handleThemeMouseUp}
          onTouchStart={handleThemeMouseDown}
          onTouchEnd={handleThemeMouseUp}
          className="p-2 text-foreground hover:text-neon-primary hover:bg-surface rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label={`Current theme: ${theme}. Click to toggle, long press for options`}
          title="Click to toggle day/night, hold for more themes"
        >
          {isDarkTheme ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Theme menu */}
        <AnimatePresence>
          {showThemeMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 py-2 bg-surface border border-border rounded-lg shadow-xl min-w-[160px] z-50"
            >
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value)
                    playSound("click")
                    setShowThemeMenu(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-surface-elevated transition-colors",
                    theme === option.value && "text-neon-primary",
                  )}
                >
                  {theme === option.value && <Check size={14} />}
                  <span className={theme !== option.value ? "ml-5" : ""}>{option.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Low power toggle */}
      <button
        onClick={() => {
          toggleLowPower()
          playSound("beep")
        }}
        className={cn(
          "p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
          isLowPower ? "text-accent bg-surface" : "text-foreground hover:text-neon-primary hover:bg-surface",
        )}
        aria-label={isLowPower ? "Disable low power mode" : "Enable low power mode"}
        title={isLowPower ? "Low power mode ON - animations reduced" : "Enable low power mode"}
      >
        {isLowPower ? <ZapOff size={18} /> : <Zap size={18} />}
      </button>

      {/* Recruiter mode toggle */}
      <button
        onClick={() => {
          toggleRecruiterMode()
          playSound("success")
        }}
        className={cn(
          "px-3 py-1.5 text-xs font-bold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
          isRecruiterMode
            ? "bg-accent text-primary-foreground"
            : "bg-surface text-foreground hover:bg-surface-elevated border border-border",
        )}
        aria-label={isRecruiterMode ? "Disable recruiter mode" : "Enable recruiter mode"}
        aria-pressed={isRecruiterMode}
      >
        <span className="hidden sm:inline">RECRUITER</span>
        <Briefcase size={14} className="sm:hidden" />
      </button>
    </div>
  )
}
