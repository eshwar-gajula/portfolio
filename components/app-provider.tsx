"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

interface AppContextType {
  isRecruiterMode: boolean
  toggleRecruiterMode: () => void
  setRecruiterMode: (value: boolean) => void
  isOverlayVisible: boolean
  setOverlayVisible: (visible: boolean) => void
  isCommandBarOpen: boolean
  setCommandBarOpen: (open: boolean) => void
  isLabsUnlocked: boolean
  unlockLabs: (passphrase?: string) => boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const RECRUITER_MODE_KEY = "blackroom-recruiter-mode"
const LABS_UNLOCKED_KEY = "blackroom-labs-unlocked"
const LABS_PASSPHRASE = "eshwar2024"

export function AppProvider({ children }: { children: ReactNode }) {
  const [isRecruiterMode, setRecruiterModeState] = useState(false)
  const [isOverlayVisible, setOverlayVisible] = useState(true)
  const [isCommandBarOpen, setCommandBarOpen] = useState(false)
  const [isLabsUnlocked, setLabsUnlocked] = useState(false)

  // Load persisted state on client
  useEffect(() => {
    const savedRecruiterMode = localStorage.getItem(RECRUITER_MODE_KEY)
    const savedLabsUnlocked = localStorage.getItem(LABS_UNLOCKED_KEY)

    if (savedRecruiterMode === "true") {
      setRecruiterModeState(true)
    }
    if (savedLabsUnlocked === "true") {
      setLabsUnlocked(true)
    }
  }, [])

  const toggleRecruiterMode = useCallback(() => {
    setRecruiterModeState((current) => {
      const newValue = !current
      localStorage.setItem(RECRUITER_MODE_KEY, String(newValue))
      return newValue
    })
  }, [])

  const setRecruiterMode = useCallback((value: boolean) => {
    setRecruiterModeState(value)
    localStorage.setItem(RECRUITER_MODE_KEY, String(value))
  }, [])

  const unlockLabs = useCallback((passphrase?: string) => {
    // If no passphrase provided, just unlock directly
    if (!passphrase) {
      setLabsUnlocked(true)
      localStorage.setItem(LABS_UNLOCKED_KEY, "true")
      return true
    }
    // Check passphrase
    if (passphrase.toLowerCase() === LABS_PASSPHRASE) {
      setLabsUnlocked(true)
      localStorage.setItem(LABS_UNLOCKED_KEY, "true")
      return true
    }
    return false
  }, [])

  return (
    <AppContext.Provider
      value={{
        isRecruiterMode,
        toggleRecruiterMode,
        setRecruiterMode,
        isOverlayVisible,
        setOverlayVisible,
        isCommandBarOpen,
        setCommandBarOpen,
        isLabsUnlocked,
        unlockLabs,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
