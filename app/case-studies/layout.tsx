import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Case Studies | " + siteConfig.name,
  description: "Engineering case studies covering problems, architecture, implementation, and trade-offs.",
  alternates: { canonical: "/case-studies" },
}

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
