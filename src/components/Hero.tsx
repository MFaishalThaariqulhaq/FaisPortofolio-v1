"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.55 })

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-[var(--bg-hero)] text-[var(--text-primary)]"
    >
      <div className="text-center z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Hi, I&apos;m Faishal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-base text-[var(--text-secondary)] md:text-lg"
        >
          Website Developer | Mobile Enthusiast | Ai Enthusiast
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.75, duration: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="/cv/cv-faishal-thariqulhaq.pdf"
            className="inline-flex items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--text-primary)]/70 px-6 py-3 text-sm font-semibold text-[var(--bg-page)]/75 transition-colors duration-200 hover:bg-[var(--text-primary)]/90"
            download
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-[var(--border-subtle)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--accent-soft)]"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

    </section>
  )
}
