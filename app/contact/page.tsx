"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle, Radio, Shield } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { resumeData } from "@/src/data"

type ContactFormState = {
  name: string
  email: string
  message: string
  website: string
}

export default function ContactPage() {
  const { playSound } = useAudio()
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
    website: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    playSound("beep")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.error || "The message could not be sent.")
      }

      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "", website: "" })
      playSound("success")
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "The message could not be sent. Please email me directly.")
      playSound("beep")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-8 sm:pt-12 pb-8 sm:pb-12 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.08} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-primary/10 border border-neon-primary/30 rounded-full mb-3 sm:mb-4">
              <Radio className="w-3 h-3 text-neon-primary" />
              <span className="text-neon-primary font-mono text-xs">CHANNEL_OPEN</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="text-neon-primary">&gt;</span> Let&apos;s Collaborate
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              I&apos;m interested in AI engineering, Python/software development, local-LLM applications, and security-minded engineering. I welcome thoughtful collaborations that value reliable implementation, clear interfaces, and responsible security research.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <a
                    href={`mailto:${resumeData.email}`}
                    onClick={() => playSound("click")}
                    className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg hover:border-neon-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-neon-primary/10 rounded-lg flex items-center justify-center group-hover:bg-neon-primary/20 transition-colors">
                      <Mail className="text-neon-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{resumeData.email}</p>
                    </div>
                  </a>

                  <a
                    href={resumeData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg hover:border-neon-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Github className="text-accent" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-muted-foreground">View my code</p>
                    </div>
                  </a>

                  <a
                    href={resumeData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg hover:border-neon-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-neon-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-neon-secondary/20 transition-colors">
                      <Linkedin className="text-neon-secondary" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Connect with me</p>
                    </div>
                  </a>

                  <a
                    href={resumeData.thm}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg hover:border-neon-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center group-hover:bg-success/20 transition-colors">
                      <Shield className="text-success" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">TryHackMe</p>
                      <p className="text-sm text-muted-foreground">Security learning</p>
                    </div>
                  </a>



                  <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg">
                    <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center">
                      <MapPin className="text-muted-foreground" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{resumeData.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal style message */}
              <div className="p-4 bg-surface border border-border rounded-lg font-mono text-sm">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <span className="text-neon-primary">$</span>
                  <span>status</span>
                </div>
                <p className="text-foreground">
                  Currently exploring opportunities in <span className="text-neon-primary">AI engineering and Python development</span>, alongside software engineering and responsible cybersecurity projects.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-lg shadow-black/5 sm:p-6">
                <h2 className="text-xl font-semibold mb-6">Send a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-7 sm:py-10"
                  >
                    <CheckCircle size={48} className="mx-auto mb-4 text-neon-primary" />
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" onChange={(e) => setFormState((current) => ({ ...current, website: e.target.value }))} />
                    </div>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-neon-primary transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-neon-primary transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-neon-primary transition-colors resize-none"
                        placeholder="Your message..."
                      />
                    </div>

                    {error && (
                      <p role="alert" className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neon-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⚡</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
