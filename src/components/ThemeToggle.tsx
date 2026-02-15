"use client"

import { Laptop, Moon, Sun } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

type ThemeMode = "dark" | "light" | "system"
type AppliedTheme = "dark" | "light"

const STORAGE_KEY = "fais_theme"

function getAppliedTheme(mode: ThemeMode): AppliedTheme {
  if (mode === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  return mode
}

function applyTheme(mode: ThemeMode) {
  const applied = getAppliedTheme(mode)
  document.documentElement.setAttribute("data-theme", applied)
}

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") return "dark"
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (raw === "light" || raw === "dark" || raw === "system") return raw
  return "dark"
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)

  useEffect(() => {
    applyTheme(mode)
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const sync = () => {
      if (mode !== "system") return
      applyTheme("system")
    }
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [mode])

  const nextMode = useMemo<ThemeMode>(() => {
    if (mode === "dark") return "light"
    if (mode === "light") return "system"
    return "dark"
  }, [mode])

  return (
    <button
      type="button"
      onClick={() => setMode(nextMode)}
      aria-label={`Theme mode ${mode}. Switch to ${nextMode}`}
      title={`Theme: ${mode} (click for ${nextMode})`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elev)]/75 text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--bg-elev)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-2)]"
    >
      {mode === "dark" && <Moon size={17} />}
      {mode === "light" && <Sun size={17} />}
      {mode === "system" && <Laptop size={17} />}
    </button>
  )
}
