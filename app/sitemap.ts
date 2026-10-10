import type { MetadataRoute } from "next"
import { resumeData } from "@/src/data"
import { siteConfig } from "@/src/config/site"

const securityNoteSlugs = ["web-app-recon", "auth-bypass-concepts", "xss-fundamentals", "sql-injection-theory", "privilege-escalation"]
const staticRoutes = ["", "/about", "/projects", "/case-studies", "/security-notes", "/skills", "/timeline", "/contact", "/resume", "/labs", "/changelog"]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl
  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/projects" || route === "/case-studies" ? 0.9 : 0.6,
  }))
  const projects: MetadataRoute.Sitemap = resumeData.projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: project.slug === "echa" ? 0.9 : 0.7 }))
  const caseStudies: MetadataRoute.Sitemap = resumeData.projects.map((project) => ({ url: `${base}/case-studies/${project.slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: project.slug === "echa" ? 0.8 : 0.6 }))
  const notes: MetadataRoute.Sitemap = securityNoteSlugs.map((slug) => ({ url: `${base}/security-notes/${slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 }))
  return [...staticPages, ...projects, ...caseStudies, ...notes]
}
