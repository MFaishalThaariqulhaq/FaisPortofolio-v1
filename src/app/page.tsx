"use client"

import { useCallback, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import BottomDock from "@/components/BottomDock"
import AboutSection from "@/components/AboutSection"
import ProjectSection from "@/components/ProjectSection"
import ContactSection from "@/components/ContactSection"
import SplashScreen from "@/components/SplashScreen"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const handleSplashFinish = useCallback(() => {
    setShowSplash(false)
  }, [])

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
