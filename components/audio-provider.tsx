"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react"

interface AudioContextType {
  hasConsent: boolean
  isMuted: boolean
  setMuted: (muted: boolean) => void
  toggleMute: () => void
  volume: number
  setVolume: (volume: number) => void
  playSound: (soundId: SoundId) => void
  playBootSound: () => void
  playTypingSound: () => void
  stopTypingSound: () => void
  isReady: boolean
}

type SoundId = "click" | "beep" | "boot" | "nodeSelect" | "success" | "error" | "typing"

const AudioContext = createContext<AudioContextType | undefined>(undefined)

const MUTED_KEY = "blackroom-audio-muted"
const VOLUME_KEY = "blackroom-audio-volume"

const soundConfig: Record<SoundId, { freq: number; duration: number; type: OscillatorType; volume?: number }> = {
  click: { freq: 800, duration: 0.06, type: "square", volume: 0.3 },
  beep: { freq: 1000, duration: 0.12, type: "sine", volume: 0.35 },
  boot: { freq: 440, duration: 0.3, type: "sawtooth", volume: 0.3 },
  nodeSelect: { freq: 600, duration: 0.18, type: "triangle", volume: 0.5 }, // Louder and longer
  success: { freq: 520, duration: 0.15, type: "sine", volume: 0.3 },
  error: { freq: 200, duration: 0.2, type: "square", volume: 0.3 },
  typing: { freq: 1200, duration: 0.03, type: "square", volume: 0.15 },
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setMutedState] = useState(false)
  const [volume, setVolumeState] = useState(0.6) // Increased default volume
  const [isReady, setIsReady] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load persisted state
  useEffect(() => {
    const savedMuted = localStorage.getItem(MUTED_KEY)
    const savedVolume = localStorage.getItem(VOLUME_KEY)

    if (savedMuted !== null) {
      setMutedState(savedMuted === "true")
    }
    if (savedVolume !== null) {
      setVolumeState(Number.parseFloat(savedVolume))
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setMutedState(true)
    }

    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      setIsReady(true)
    } catch (e) {
      console.warn("Web Audio API not supported")
    }

    return () => {
      audioContextRef.current?.close()
    }
  }, [])

  // Persist settings
  useEffect(() => {
    localStorage.setItem(MUTED_KEY, String(isMuted))
    localStorage.setItem(VOLUME_KEY, String(volume))
  }, [isMuted, volume])

  const setMuted = useCallback((muted: boolean) => {
    setMutedState(muted)
  }, [])

  const toggleMute = useCallback(() => {
    setMutedState((m) => !m)
  }, [])

  const setVolume = useCallback((vol: number) => {
    setVolumeState(Math.max(0, Math.min(1, vol)))
  }, [])

  const playSynthSound = useCallback(
    (freq: number, duration: number, type: OscillatorType, soundVolume?: number) => {
      if (!audioContextRef.current || isMuted) return

      try {
        const ctx = audioContextRef.current

        // Resume context if suspended (autoplay policy)
        if (ctx.state === "suspended") {
          ctx.resume()
        }

        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.type = type
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime)

        // Use per-sound volume if provided, otherwise use default
        const finalVolume = (soundVolume ?? 0.25) * volume
        gainNode.gain.setValueAtTime(finalVolume, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + duration)
      } catch (e) {
        // Silently fail
      }
    },
    [isMuted, volume],
  )

  const playSound = useCallback(
    (soundId: SoundId) => {
      if (isMuted || !isReady) return
      const config = soundConfig[soundId]
      if (config) {
        playSynthSound(config.freq, config.duration, config.type, config.volume)
      }
    },
    [isMuted, isReady, playSynthSound],
  )

  const playBootSound = useCallback(() => {
    if (isMuted) return

    // Play a sequence of tones for boot sound
    const playSequence = async () => {
      const notes = [440, 554, 659, 880]
      for (let i = 0; i < notes.length; i++) {
        setTimeout(() => {
          playSynthSound(notes[i], 0.15, "sine", 0.3)
        }, i * 100)
      }
    }
    playSequence()
  }, [isMuted, playSynthSound])

  const playTypingSound = useCallback(() => {
    if (isMuted) return

    // Clear any existing interval
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
    }

    // Play typing sound at intervals
    typingIntervalRef.current = setInterval(() => {
      // Randomize frequency slightly for more realistic typing
      const freq = 1000 + Math.random() * 400
      playSynthSound(freq, 0.025, "square", 0.15)
    }, 60)
  }, [isMuted, playSynthSound])

  const stopTypingSound = useCallback(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
      typingIntervalRef.current = null
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
    }
  }, [])

  return (
    <AudioContext.Provider
      value={{
        hasConsent: true,
        isMuted,
        setMuted,
        toggleMute,
        volume,
        setVolume,
        playSound,
        playBootSound,
        playTypingSound,
        stopTypingSound,
        isReady,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider")
  }
  return context
}
