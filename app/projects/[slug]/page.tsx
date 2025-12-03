"use client"

import { useMemo } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Tag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommandBar } from "@/components/command-bar"
import { useAudio } from "@/components/audio-provider"
import { resumeData } from "@/data"

export default function ProjectDetailPage() {
  const params = useParams()
  const { playSound } = useAudio()

  const project = useMemo(() => {
    return resumeData.projects.find((p) => p.slug === params.slug)
  }, [params.slug])

  if (!project) {
    notFound()
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link
            href="/projects"
            onClick={() => playSound("click")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="max-w-4xl">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 text-sm font-mono bg-neon-primary/10 text-neon-primary rounded">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 text-sm bg-accent/10 text-accent rounded">Featured</span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.name}</h1>
              <p className="text-xl text-muted-foreground">{project.description}</p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="flex items-center gap-2 px-6 py-3 bg-neon-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  <ExternalLink size={18} />
                  View Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="flex items-center gap-2 px-6 py-3 border border-border font-semibold rounded-lg hover:bg-surface transition-colors"
                >
                  <Github size={18} />
                  View Source Code
                </a>
              )}
            </motion.div>

            {/* Content grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="text-neon-primary">&gt;</span> Overview
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
                  </div>
                </motion.section>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <span className="text-neon-primary">&gt;</span> Key Features
                    </h2>
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-neon-primary/10 rounded flex items-center justify-center text-neon-primary text-sm shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                )}

                {/* Code preview */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="text-neon-primary">&gt;</span> Code Sample
                  </h2>
                  <div className="bg-surface border border-border rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 bg-surface-elevated border-b border-border">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                      <div className="w-2 h-2 rounded-full bg-warning" />
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="ml-2 text-xs text-muted-foreground font-mono">example.ts</span>
                    </div>
                    <pre className="p-4 font-mono text-sm overflow-x-auto">
                      <code className="text-muted-foreground">
                        {`// ${project.name} - Sanitized Code Example
// Educational demonstration only

interface Config {
  mode: 'development' | 'production';
  security: {
    level: 'standard' | 'enhanced';
    audit: boolean;
  };
}

export function initialize(config: Config) {
  // Validate configuration
  validateConfig(config);
  
  // Setup secure defaults
  const secureConfig = applySecurityDefaults(config);
  
  // Initialize with proper error handling
  return new ${project.name.replace(/\s/g, "")}(secureConfig);
}`}
                      </code>
                    </pre>
                  </div>
                </motion.section>
              </div>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Tech stack */}
                <div className="p-6 bg-surface border border-border rounded-lg">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Tag size={16} className="text-neon-primary" />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 text-sm bg-surface-elevated border border-border rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project info */}
                <div className="p-6 bg-surface border border-border rounded-lg">
                  <h3 className="font-semibold mb-4">Project Info</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Category</dt>
                      <dd>{project.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Status</dt>
                      <dd className="text-neon-primary">Active</dd>
                    </div>
                  </dl>
                </div>

                {/* Related projects */}
                <div className="p-6 bg-surface border border-border rounded-lg">
                  <h3 className="font-semibold mb-4">Related Projects</h3>
                  <div className="space-y-3">
                    {resumeData.projects
                      .filter((p) => p.id !== project.id && p.category === project.category)
                      .slice(0, 3)
                      .map((p) => (
                        <Link
                          key={p.id}
                          href={`/projects/${p.slug}`}
                          onClick={() => playSound("click")}
                          className="block p-3 bg-surface-elevated rounded hover:bg-border transition-colors"
                        >
                          <p className="font-medium text-sm">{p.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{p.description}</p>
                        </Link>
                      ))}
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CommandBar />
    </>
  )
}
