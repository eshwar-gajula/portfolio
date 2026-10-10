import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Security Notes | " + siteConfig.name,
  description: "Educational cybersecurity notes focused on methodology and defensive learning.",
  alternates: { canonical: "/security-notes" },
}

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
