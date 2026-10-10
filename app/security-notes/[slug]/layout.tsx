import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"


const notes: Record<string, string> = {
  "web-app-recon": "Web Application Reconnaissance",
  "auth-bypass-concepts": "Authentication Bypass Concepts",
  "xss-fundamentals": "Cross-Site Scripting Fundamentals",
  "sql-injection-theory": "SQL Injection Theory",
  "privilege-escalation": "Privilege Escalation Concepts",
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const name = notes[slug] ?? "Security Note"
  return { title: `${name} | ${siteConfig.name}`, description: "Educational security concepts, testing methodology, and defensive mitigations.", alternates: { canonical: `/security-notes/${slug}` } }
}

export default function DetailLayout({ children }: Readonly<{ children: ReactNode }>) { return children }
