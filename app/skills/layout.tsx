import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Skills | " + siteConfig.name,
  description: "Technical skills across Python, TypeScript, AI engineering, software development, and cybersecurity.",
  alternates: { canonical: "/skills" },
}

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
