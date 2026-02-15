"use client"

import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion"
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const leftRef = useRef<HTMLDivElement | null>(null)
  const rightRef = useRef<HTMLDivElement | null>(null)
  const photoCardRef = useRef<HTMLDivElement | null>(null)
  const [isDesktopPointer, setIsDesktopPointer] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const lampX = useMotionValue(0)
  const lampY = useMotionValue(0)
  const lampCardX = useMotionValue(0)
  const lampCardY = useMotionValue(0)

  const photoRevealMask = useMotionTemplate`radial-gradient(250px circle at ${lampCardX}px ${lampCardY}px, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.92) 38%, rgba(255, 255, 255, 0.46) 63%, rgba(0, 0, 0, 0) 84%)`
  const isLeftInView = useInView(leftRef, { once: false, amount: 0.45 })
  const isRightInView = useInView(rightRef, { once: false, amount: 0.35 })

  const setLampByClient = useCallback((clientX: number, clientY: number) => {
    const section = sectionRef.current
    if (!section) return
    const sectionRect = section.getBoundingClientRect()
    lampX.set(clientX - sectionRect.left)
    lampY.set(clientY - sectionRect.top)

    const photoCard = photoCardRef.current
    if (!photoCard) return
    const photoRect = photoCard.getBoundingClientRect()
    lampCardX.set(clientX - photoRect.left)
    lampCardY.set(clientY - photoRect.top)
  }, [lampCardX, lampCardY, lampX, lampY])

  const centerLamp = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    const sectionRect = section.getBoundingClientRect()
    setLampByClient(
      sectionRect.left + section.clientWidth / 2,
      sectionRect.top + section.clientHeight * 0.4
    )
  }, [setLampByClient])

  useEffect(() => {
    const pointerMedia = window.matchMedia("(pointer: fine)")
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)")

    const sync = () => {
      setIsDesktopPointer(pointerMedia.matches)
      setReduceMotion(motionMedia.matches)
    }

    sync()
    pointerMedia.addEventListener("change", sync)
    motionMedia.addEventListener("change", sync)

    return () => {
      pointerMedia.removeEventListener("change", sync)
      motionMedia.removeEventListener("change", sync)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    centerLamp()
    window.addEventListener("resize", centerLamp)
    return () => {
      window.removeEventListener("resize", centerLamp)
    }
  }, [centerLamp])

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!isDesktopPointer) return
    setLampByClient(event.clientX, event.clientY)
  }

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (isDesktopPointer) return
    setLampByClient(event.clientX, event.clientY)
  }

  const handlePointerLeave = () => {
    centerLamp()
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--bg-surface)] px-6 py-24 text-[var(--text-primary)] md:px-16"
    >
      <div className="relative z-0 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        <motion.div
          ref={leftRef}
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          animate={
            reduceMotion
              ? undefined
              : isLeftInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">About Me</p>
          <h2 className="mt-3 text-4xl md:text-6xl font-bold leading-tight">
            Building clean UI and smooth interaction.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            I am a frontend developer focused on crafting responsive, performant,
            and user-centered web experiences with modern JavaScript and TypeScript.
          </p>
        </motion.div>

        <motion.div
          ref={rightRef}
          initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
          animate={
            reduceMotion
              ? undefined
              : isRightInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 22 }
          }
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        >
          <div
          ref={photoCardRef}
          className="relative aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-3xl border border-[var(--border-subtle)] shadow-[0_20px_70px_rgba(0,0,0,0.35)] md:aspect-[5/4]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(160deg,var(--bg-surface)_0%,var(--bg-elev)_48%,var(--bg-page)_100%)]" />
            <div className="absolute inset-0 bg-[url('/about-photo.jpg')] bg-cover bg-center" />
            <motion.div
              aria-hidden="true"
              style={{ WebkitMaskImage: photoRevealMask, maskImage: photoRevealMask }}
              className="absolute inset-0 bg-[url('/about-photo.jpg')] bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-white/5" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
