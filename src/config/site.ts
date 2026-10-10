const DEFAULT_SITE_URL = "https://eshwar.xyz"

function normalizeSiteUrl(value: string) {
  return value.replace(/\/$/, "")
}

export const siteConfig = {
  name: "Eshwar Gajula",
  title: "Eshwar Gajula | AI Engineer · Software Engineer · Cybersecurity",
  description:
    "Portfolio of Eshwar Gajula — AI engineering, software engineering, cybersecurity, Python development, and autonomous systems.",
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL),
  email: "eshwargajula31@gmail.com",
  social: {
    github: "https://github.com/eshwar-gajula",
    linkedin: "https://www.linkedin.com/in/gajula-eshwar/",
    tryHackMe: "https://tryhackme.com/p/Agastya0",
    instagram: "https://www.instagram.com/_eshwar_0531/",
  },
} as const
