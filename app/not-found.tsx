import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Terminal, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-24 pb-16 bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-surface border border-border">
            <Terminal size={32} className="text-neon-primary" />
          </div>

          <h1 className="text-6xl font-bold mb-4">
            <span className="text-neon-primary">404</span>
          </h1>

          <div className="bg-surface border border-border rounded-lg p-4 max-w-md mx-auto mb-8 font-mono text-left">
            <p className="text-neon-primary mb-2">$ locate page</p>
            <p className="text-destructive">Error: Page not found in filesystem</p>
            <p className="text-muted-foreground text-sm mt-2">The requested resource could not be located.</p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={18} />
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
