"use client"

import { Moon, Sun } from "lucide-react"

const STORAGE_KEY = "fais_theme"

export default function ThemeToggle() {
  const handleToggle = () => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"
    const next = current === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle theme"
      title="Toggle dark/light theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elev)]/75 text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--bg-elev)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-2)]"
    >
      <Moon size={17} className="theme-icon-dark" />
      <Sun size={17} className="theme-icon-light hidden" />
    </button>
  )
}
