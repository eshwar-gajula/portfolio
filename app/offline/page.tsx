"use client"

import { WifiOff, RefreshCw } from "lucide-react"

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-surface border border-border">
          <WifiOff size={32} className="text-muted-foreground" />
        </div>

        <h1 className="text-3xl font-bold mb-4">You're Offline</h1>

        <p className="text-muted-foreground mb-8">
          It looks like you've lost your internet connection. Some features may be unavailable until you're back online.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-neon-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      </div>
    </main>
  )
}
