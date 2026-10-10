import { siteConfig } from "@/src/config/site"
import type { Metadata } from "next"
import type { ReactNode } from "react"

import { resumeData } from "@/src/data"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = resumeData.projects.find((item) => item.slug === slug)
  const title = project?.name ?? "Project"
  const description = project?.description ?? "Project details and engineering work by Eshwar Gajula."
  return { title: `${title} | ${siteConfig.name}`, description, alternates: { canonical: `/projects/${slug}` } }
}

export default function DetailLayout({ children }: Readonly<{ children: ReactNode }>) { return children }
