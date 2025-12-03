"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

export type Theme = "neon-hacker" | "dark" | "light" | "high-contrast"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  cycleTheme: () => void
  isLowPower: boolean
  toggleLowPower: () => void
  mounted: boolean
}

const defaultContext: ThemeContextType = {
  theme: "neon-hacker",
  setTheme: () => {},
  cycleTheme: () => {},
  isLowPower: false,
  toggleLowPower: () => {},
  mounted: false,
}

const ThemeContext = createContext<ThemeContextType>(defaultContext)

const THEME_KEY = "blackroom-theme"
const LOW_POWER_KEY = "blackroom-low-power"

const themeOrder: Theme[] = ["neon-hacker", "dark", "light", "high-contrast"]

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("neon-hacker")
  const [isLowPower, setIsLowPower] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    const savedLowPower = localStorage.getItem(LOW_POWER_KEY)

    // Check system preference
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (savedTheme && themeOrder.includes(savedTheme)) {
      setThemeState(savedTheme)
    } else if (prefersLight) {
      setThemeState("light")
    } else {
      setThemeState("neon-hacker")
    }

    if (savedLowPower !== null) {
      setIsLowPower(savedLowPower === "true")
    } else if (prefersReducedMotion) {
      setIsLowPower(true)
    }

    setMounted(true)
  }, [])

  // Apply theme class to document
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    // Remove all theme classes
    root.classList.remove("theme-neon-hacker", "theme-dark", "theme-light", "theme-high-contrast")

    // Add current theme class (neon-hacker uses root styles, others use class)
    if (theme !== "neon-hacker") {
      root.classList.add(`theme-${theme}`)
    }

    // Handle low power mode
    if (isLowPower) {
      root.classList.add("low-power")
    } else {
      root.classList.remove("low-power")
    }

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      const colors: Record<Theme, string> = {
        "neon-hacker": "#0b0f12",
        dark: "#0f0f0f",
        light: "#fafafa",
        "high-contrast": "#000000",
      }
      metaThemeColor.setAttribute("content", colors[theme])
    }
  }, [theme, isLowPower, mounted])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(THEME_KEY, newTheme)
  }, [])

  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const currentIndex = themeOrder.indexOf(current)
      const nextIndex = (currentIndex + 1) % themeOrder.length
      const nextTheme = themeOrder[nextIndex]
      localStorage.setItem(THEME_KEY, nextTheme)
      return nextTheme
    })
  }, [])

  const toggleLowPower = useCallback(() => {
    setIsLowPower((current) => {
      const newValue = !current
      localStorage.setItem(LOW_POWER_KEY, String(newValue))
      return newValue
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, isLowPower, toggleLowPower, mounted }}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>{children}</div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
