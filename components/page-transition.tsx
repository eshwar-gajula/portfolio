"use client"

import type { ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"

/**
 * Persistent route wrapper: the root layout stays mounted while the pathname
 * changes, allowing AnimatePresence to run an exit and enter transition.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const { isLowPower } = useTheme()
  const reduce = Boolean(shouldReduceMotion || isLowPower)

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0, y: -4 }}
        transition={{
          duration: reduce ? 0 : 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="min-h-[60vh] w-full min-w-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
