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

const SPLASH_SESSION_KEY = "fais_splash_seen_v1"

export default function Home() {
  const [showSplash, setShowSplash] = useState(false)
  const [isSplashReady, setIsSplashReady] = useState(false)

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
      const isReload = nav?.type === "reload"
      const hasSeenSplash = sessionStorage.getItem(SPLASH_SESSION_KEY) === "1"
      const shouldShowSplash = isReload || !hasSeenSplash

      setShowSplash(shouldShowSplash)
      setIsSplashReady(true)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  const handleSplashFinish = useCallback(() => {
    sessionStorage.setItem(SPLASH_SESSION_KEY, "1")
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
