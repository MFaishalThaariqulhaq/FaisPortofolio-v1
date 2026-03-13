"use client"

import { Moon, Sun } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

const STORAGE_KEY = "fais_theme"
const THEME_TRANSITION_CLASS = "theme-transition"
const THEME_TRANSITION_MS = 300

export default function ThemeToggle() {
  const prefersReducedMotion = useReducedMotion()
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const root = document.documentElement
    const readTheme = () =>
      root.getAttribute("data-theme") === "light" ? "light" : "dark"

    setTheme(readTheme())

    const observer = new MutationObserver(() => {
      setTheme(readTheme())
    })

    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] })
    return () => observer.disconnect()
  }, [])

  const handleToggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    const root = document.documentElement

    if (!prefersReducedMotion) {
      root.classList.add(THEME_TRANSITION_CLASS)
      window.setTimeout(() => {
        root.classList.remove(THEME_TRANSITION_CLASS)
      }, THEME_TRANSITION_MS)
    }

    root.setAttribute("data-theme", next)
    window.localStorage.setItem(STORAGE_KEY, next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle theme"
      title="Toggle dark/light theme"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elev)]/75 text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--bg-elev)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-2)]"
    >
      <AnimatePresence initial={false} mode="wait">
        {theme === "dark" ? (
          <motion.span
            key="dark"
            initial={{ opacity: 0, rotate: -90, scale: 0.65 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.65 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon size={17} />
          </motion.span>
        ) : (
          <motion.span
            key="light"
            initial={{ opacity: 0, rotate: 90, scale: 0.65 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.65 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun size={17} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
