"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (prefersReducedMotion.matches) return

    const lenis = new Lenis({
      duration: 0.95,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
      lerp: 0.08,
    })
    const finePointer = window.matchMedia("(pointer: fine)")
    let lastSnapAt = 0

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
      lenis.scrollTo(section, { duration: 0.95, offset: 0 })
    }

    const onWheel = (event: WheelEvent) => {
      if (!finePointer.matches) return
      if (event.ctrlKey || Math.abs(event.deltaY) < 6) return

      const now = Date.now()
      if (now - lastSnapAt < 650) {
        event.preventDefault()
        return
      }

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section[id]")
      ).sort((a, b) => a.offsetTop - b.offsetTop)
      if (sections.length === 0) return

      const currentY = window.scrollY + 24
      let currentIndex = 0
      for (let i = 0; i < sections.length; i += 1) {
        if (sections[i].offsetTop <= currentY) currentIndex = i
      }

      const nextIndex =
        event.deltaY > 0
          ? Math.min(currentIndex + 1, sections.length - 1)
          : Math.max(currentIndex - 1, 0)
      if (nextIndex === currentIndex) return

      event.preventDefault()
      lastSnapAt = now
      lenis.scrollTo(sections[nextIndex], { duration: 0.85, offset: 0 })
    }

    document.addEventListener("click", onHashLinkClick)
    window.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      window.cancelAnimationFrame(rafId)
      document.removeEventListener("click", onHashLinkClick)
      window.removeEventListener("wheel", onWheel)
      lenis.destroy()
    }
  }, [])

  return null
}
