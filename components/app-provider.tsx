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
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const RECRUITER_MODE_KEY = "blackroom-recruiter-mode"

export function AppProvider({ children }: { children: ReactNode }) {
  const [isRecruiterMode, setRecruiterModeState] = useState(false)
  const [isOverlayVisible, setOverlayVisible] = useState(false)
  const [isCommandBarOpen, setCommandBarOpen] = useState(false)

  // Load persisted preferences on the client and expose recruiter mode to global styles.
  useEffect(() => {
    const savedRecruiterMode = localStorage.getItem(RECRUITER_MODE_KEY)
    if (savedRecruiterMode === "true") setRecruiterModeState(true)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("recruiter-mode", isRecruiterMode)
    return () => document.documentElement.classList.remove("recruiter-mode")
  }, [isRecruiterMode])

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
