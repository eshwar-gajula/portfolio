import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Security Labs | " + siteConfig.name,
  description: "Public educational security labs and learning notes.",
  alternates: { canonical: "/labs" },
}

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
