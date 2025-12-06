export interface Skill {
  name: string
  category: string
  proficiency: number
  years: number
  icon: string
  projects: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  description: string
  highlights: string[]
}

export interface Education {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  highlights: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
}

export interface Project {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  techStack: string[]
  category: string
  featured: boolean
  demoUrl: string | null
  githubUrl: string
  image: string
  highlights: string[]
}

export interface About {
  bio: string
  interests: string[]
  currentFocus: string
}

export interface ResumeData {
  name: string
  title: string
  greeting: string
  summary: string
  email: string
  phone?: string
  location: string
  website: string
  linkedin: string
  github: string
  instagram: string
  thm: string
  about: About
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  certifications: Certification[]
  projects: Project[]
  labsPassphrase: string
}

export interface NodeProject {
  id: string
  name: string
  slug: string
  description: string
  category: string
  connections: string[]
}
