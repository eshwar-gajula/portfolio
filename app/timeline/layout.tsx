import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Timeline | " + siteConfig.name,
  description: "Education, projects, and engineering milestones.",
  alternates: { canonical: "/timeline" },
}

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
