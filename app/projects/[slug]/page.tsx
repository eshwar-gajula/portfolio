import Link from "next/link"
import { ArrowLeft, ArrowUpRight, CheckCircle2, Code2, Github, Layers3, ShieldCheck, Workflow } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLanguageMatrix } from "@/components/backgrounds"
import { resumeData } from "@/src/data"

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = resumeData.projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <>
        <Header />
        <main id="main-content" className="min-h-[70vh] px-4 py-10 sm:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
            <p className="mb-3 font-mono text-sm text-neon-primary">PROJECT_NOT_FOUND</p>
            <h1 className="mb-4 text-3xl font-bold">That project isn&apos;t listed.</h1>
            <p className="mb-7 text-muted-foreground">Browse the project index to explore the work that is available.</p>
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-lg bg-neon-primary px-5 py-3 font-semibold text-primary-foreground">Browse projects</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const isEcha = project.slug === "echa"
  return (
    <>
      <Header />
      <main id="main-content" className="relative min-h-screen overflow-hidden bg-background pb-8 sm:pb-12">
        <MultiLanguageMatrix opacity={0.07} />
        <div className="container relative z-10 mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:py-16">
          <Link href="/projects" className="mb-8 inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-neon-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <ArrowLeft size={16} /> All projects
          </Link>

          <section className="relative overflow-hidden rounded-3xl border border-neon-primary/30 bg-gradient-to-br from-surface via-surface to-neon-primary/10 p-5 shadow-2xl shadow-black/10 sm:p-8 lg:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-neon-primary/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-neon-primary/30 bg-neon-primary/10 px-3 py-1 font-mono text-xs text-neon-primary">{project.category}</span>
                  {project.featured && <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground">Featured project</span>}
                  {isEcha && <span className="rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs text-warning">In active development</span>}
                </div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-neon-primary">Engineering project / {project.id}</p>
                <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{project.name}</h1>
                <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{project.longDescription || project.description}</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center justify-center gap-2 rounded-lg bg-neon-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Github size={18} /> View source <ArrowUpRight size={16} />
                  </a>}
                  {project.extraLinks?.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-5 py-3 font-semibold transition-colors hover:border-neon-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{link.label} <ArrowUpRight size={16} /></a>)}
                  {project.demoUrl && <a href={project.demoUrl} target={project.demoUrl.startsWith("/") ? undefined : "_blank"} rel="noreferrer noopener" className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-5 py-3 font-semibold transition-colors hover:border-neon-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Live demo <ArrowUpRight size={16} /></a>}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <div className="mb-5 flex items-center gap-3"><div className="rounded-xl bg-neon-primary/10 p-3 text-neon-primary"><Layers3 size={24} /></div><div><p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Project snapshot</p><p className="font-semibold">{isEcha ? "Agent + Desktop Shell" : project.category}</p></div></div>
                <dl className="space-y-4 text-sm">
                  <div className="flex items-start justify-between gap-4 border-b border-border pb-3"><dt className="text-muted-foreground">Status</dt><dd className="text-right font-medium">{project.status || (isEcha ? "Building / iterating" : "Project work")}</dd></div>
                  <div className="flex items-start justify-between gap-4 border-b border-border pb-3"><dt className="text-muted-foreground">Primary focus</dt><dd className="max-w-[65%] text-right font-medium">{isEcha ? "Controlled automation" : project.category}</dd></div>
                  <div><dt className="mb-2 text-muted-foreground">Technology</dt><dd className="flex flex-wrap gap-2">{project.techStack.map((tech) => <span key={tech} className="rounded-md border border-border bg-surface px-2 py-1 text-xs">{tech}</span>)}</dd></div>
                </dl>
              </div>
            </div>
          </section>

          {isEcha ? (
            <>
              <section className="mt-8 grid gap-4 md:grid-cols-2">
                <article className="rounded-2xl border border-border bg-surface/90 p-5 sm:p-7">
                  <div className="mb-4 flex items-center gap-3"><div className="rounded-lg bg-neon-primary/10 p-2 text-neon-primary"><Workflow size={22} /></div><h2 className="text-xl font-bold">ECHA Agent</h2></div>
                  <p className="mb-4 leading-7 text-muted-foreground">The automation layer: a TypeScript-based agent that coordinates model responses, tool selection, execution boundaries, and verification. The design uses a local model route through Ollama/OmniRoute and is being developed incrementally.</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">{["Tool registry for filesystem, terminal, Git, and search workflows", "Permission checks before sensitive tool execution", "Audit trail, memory, and verification-oriented task flow", "Local LLM experiments with Qwen Coder models"].map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-neon-primary" />{item}</li>)}</ul>
                </article>
                <article className="rounded-2xl border border-border bg-surface/90 p-5 sm:p-7">
                  <div className="mb-4 flex items-center gap-3"><div className="rounded-lg bg-neon-secondary/10 p-2 text-neon-secondary"><Code2 size={22} /></div><h2 className="text-xl font-bold">ECHA Shell</h2></div>
                  <p className="mb-4 leading-7 text-muted-foreground">The desktop interface: a modular shell built with Tauri, Rust, React, and TypeScript. It is intended to be the human-facing workspace for agent activity and future security utilities.</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">{["Tauri v2 and Rust backend", "React + TypeScript interface", "System visibility and modular utility panels", "Performance, accessibility, and low-power behavior as design priorities"].map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-neon-secondary" />{item}</li>)}</ul>
                </article>
              </section>
              <section className="mt-8 rounded-2xl border border-border bg-surface/90 p-5 sm:p-8">
                <div className="mb-5 flex items-center gap-3"><ShieldCheck className="text-neon-primary" size={24} /><h2 className="text-2xl font-bold">Engineering principles</h2></div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{ title: "Permissioned tools", text: "Tools should have explicit capabilities and bounded access." }, { title: "Human oversight", text: "Sensitive actions should be visible and require clear authorization." }, { title: "Auditability", text: "Record decisions and tool outcomes for review and debugging." }, { title: "Verification", text: "Check outputs and changes instead of assuming success." }].map((item) => <div key={item.title} className="rounded-xl border border-border bg-background/70 p-4"><h3 className="mb-2 font-semibold text-neon-primary">{item.title}</h3><p className="text-sm leading-6 text-muted-foreground">{item.text}</p></div>)}</div>
                <p className="mt-6 rounded-lg border border-warning/20 bg-warning/5 p-4 text-sm leading-6 text-muted-foreground"><strong className="text-warning">Current status:</strong> ECHA is an active personal engineering project, not a finished commercial product. The architecture and feature list describe the intended design; individual capabilities are being implemented and tested in stages.</p>
              </section>
            </>
          ) : (
            <section className="mt-8 rounded-2xl border border-border bg-surface/90 p-5 sm:p-8">
              <h2 className="mb-5 text-2xl font-bold">Implementation highlights</h2>
              <ul className="grid gap-3 sm:grid-cols-2">{project.highlights.map((item) => <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-background/70 p-4"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-neon-primary" /><span className="leading-6 text-muted-foreground">{item}</span></li>)}</ul>
            </section>
          )}

          <section className="mt-8 rounded-2xl border border-border bg-surface/70 p-5 sm:p-7">
            <h2 className="mb-4 text-xl font-bold">Explore more</h2>
            <div className="flex flex-wrap gap-3"><Link href="/about" className="rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-neon-primary/50">About me</Link><Link href="/resume" className="rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-neon-primary/50">View resume</Link><Link href="/contact" className="rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-neon-primary/50">Contact</Link></div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
