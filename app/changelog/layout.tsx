import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = { title: "Changelog | " + siteConfig.name, description: "Portfolio updates, engineering changes, and project milestones.", alternates: { canonical: "/changelog" } }
export default function ChangelogLayout({ children }: Readonly<{ children: ReactNode }>) { return children }
