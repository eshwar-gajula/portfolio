import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Contact | " + siteConfig.name,
  description: "Contact Eshwar Gajula about AI engineering, Python development, software engineering, and security automation opportunities.",
  alternates: { canonical: "/contact" },
}

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
