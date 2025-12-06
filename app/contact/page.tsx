"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle, Radio, Shield, Terminal } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { useAudio } from "@/components/audio-provider"
import { resumeData } from "@/src/data"

export default function ContactPage() {
  const { playSound } = useAudio()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    playSound("beep")

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    playSound("success")
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-16 bg-background relative overflow-hidden">
        <MultiLanguageMatrix opacity={0.5} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-primary/10 border border-neon-primary/30 rounded-full mb-3 sm:mb-4">
              <Radio className="w-3 h-3 text-neon-primary" />
              <span className="text-neon-primary font-mono text-xs">CHANNEL_OPEN</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="text-neon-primary">&gt;</span> Let's Collaborate
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              I'm open to front-end roles, security-focused work, red-team aligned projects, and collaborations where UI
              engineering and adversarial thinking meet.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
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
                    href="https://tryhackme.com/p/eshwar"
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

                  <a
                    href="https://app.hackthebox.com/profile/eshwar"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg hover:border-neon-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center group-hover:bg-warning/20 transition-colors">
                      <Terminal className="text-warning" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">HackTheBox</p>
                      <p className="text-sm text-muted-foreground">Offensive practice</p>
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
                  Currently <span className="text-neon-primary">available</span> for frontend development,
                  security-focused projects, and red-team collaborations.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <div className="p-6 bg-surface border border-border rounded-lg">
                <h2 className="text-xl font-semibold mb-6">Send a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle size={48} className="mx-auto mb-4 text-neon-primary" />
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
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
      <CommandBar />
    </>
  )
}
