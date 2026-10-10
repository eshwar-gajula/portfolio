import resumeDataJson from "./resume.json"
import projectsDataJson from "./projects.json"
import { siteConfig } from "../config/site"
import type { ResumeData, NodeProject } from "../types/resume"

export const resumeData: ResumeData = {
  ...resumeDataJson,
  email: siteConfig.email,
  thm: siteConfig.social.tryHackMe,
  instagram: siteConfig.social.instagram,
  website: siteConfig.siteUrl,
  linkedin: siteConfig.social.linkedin,
  github: siteConfig.social.github,
}

export const projectsData = projectsDataJson as NodeProject[]
export const projects = projectsData
