"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (prefersReducedMotion.matches) return

    const lenis = new Lenis({
      duration: 0.72,
      smoothWheel: true,
      wheelMultiplier: 0.86,
      touchMultiplier: 1,
      lerp: 0.11,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    rafId = window.requestAnimationFrame(raf)

    const onHashLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const link = target?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return

      const hash = link.getAttribute("href")
      if (!hash || hash === "#") return

      const id = hash.slice(1)
      const section = document.getElementById(id)
      if (!section) return

      event.preventDefault()
      lenis.scrollTo(section, { duration: 0.7, offset: 0 })
    }

    document.addEventListener("click", onHashLinkClick)

    return () => {
      window.cancelAnimationFrame(rafId)
      document.removeEventListener("click", onHashLinkClick)
      lenis.destroy()
    }
  }, [])

  return null
}
