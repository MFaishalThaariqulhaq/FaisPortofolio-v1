"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import BottomDock from "@/components/BottomDock"
import AboutSection from "@/components/AboutSection"
import ProjectSection from "@/components/ProjectSection"
import ContactSection from "@/components/ContactSection"
import SplashScreen from "@/components/SplashScreen"

const SKIP_SPLASH_ONCE_FLAG = "__faisSkipSplashOnce"
const LANDING_SPLASH_SHOWN_FLAG = "__faisLandingSplashShown"
const HASH_SCROLL_RETRY_MAX = 12
const HASH_SCROLL_RETRY_MS = 60

export default function Home() {
  const [showSplash, setShowSplash] = useState(false)
  const [isSplashReady, setIsSplashReady] = useState(false)

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
      const isReload = nav?.type === "reload"
      const skipSplashOnce = window.sessionStorage.getItem(SKIP_SPLASH_ONCE_FLAG) === "1"
      const landingSplashShown = window.sessionStorage.getItem(LANDING_SPLASH_SHOWN_FLAG) === "1"

      if (skipSplashOnce) {
        window.sessionStorage.removeItem(SKIP_SPLASH_ONCE_FLAG)
        setShowSplash(false)
      } else if (isReload) {
        window.sessionStorage.setItem(LANDING_SPLASH_SHOWN_FLAG, "1")
        setShowSplash(true)
      } else if (!landingSplashShown) {
        window.sessionStorage.setItem(LANDING_SPLASH_SHOWN_FLAG, "1")
        setShowSplash(true)
      } else {
        setShowSplash(false)
      }
      setIsSplashReady(true)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    if (!isSplashReady) return

    const hash = window.location.hash
    if (!hash || hash === "#home") return

    const targetId = decodeURIComponent(hash.slice(1))

    const scrollToHashTarget = () => {
      const target = document.getElementById(targetId)
      if (!target) return false

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      })
      return true
    }

    if (scrollToHashTarget()) return

    let attempts = 0
    const timer = window.setInterval(() => {
      attempts += 1
      if (scrollToHashTarget() || attempts >= HASH_SCROLL_RETRY_MAX) {
        window.clearInterval(timer)
      }
    }, HASH_SCROLL_RETRY_MS)

    return () => {
      window.clearInterval(timer)
    }
  }, [isSplashReady])

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false)
  }, [])

  if (!isSplashReady) {
    return <div className="min-h-screen bg-[var(--bg-page)]" />
  }

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      </AnimatePresence>
      <Navbar />
      <Hero />
      <AboutSection />
      <ProjectSection />
      <ContactSection />

      <BottomDock />
    </>
  )
}
