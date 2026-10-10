import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = { title: "Offline | Eshwar Gajula", description: "Offline fallback page.", robots: { index: false, follow: false } }
export default function OfflineLayout({ children }: Readonly<{ children: ReactNode }>) { return children }
