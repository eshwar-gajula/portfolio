import resumeDataJson from "./resume.json"
import projectsDataJson from "./projects.json"
import type { ResumeData, NodeProject } from "../types/resume"

export const resumeData = resumeDataJson as ResumeData
export const projectsData = projectsDataJson as NodeProject[]
