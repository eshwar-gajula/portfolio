import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Resume | " + siteConfig.name,
  description: "ATS-friendly resume for Eshwar Gajula, covering AI engineering, software development, cybersecurity, technical skills, experience, education, and projects.",
  alternates: { canonical: "/resume" },
}

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
