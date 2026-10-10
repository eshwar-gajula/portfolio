import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "About | " + siteConfig.name,
  description: "Engineering background, AI projects, software development, and cybersecurity learning.",
  alternates: { canonical: "/about" },
}

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
