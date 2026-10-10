import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Projects | " + siteConfig.name,
  description: "Selected AI engineering, software development, and security automation projects.",
  alternates: { canonical: "/projects" },
}

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
