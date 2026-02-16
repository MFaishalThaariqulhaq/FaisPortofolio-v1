"use client"

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react"

const ABOUT_PHOTO = "/about-photo.jpg"
const PHOTO_TILT_X_MAX = 8
const PHOTO_TILT_Y_MAX = 10
const ABOUT_TRANSITION_MS = 780

export default function AboutSection() {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement | null>(null)
  const leftRef = useRef<HTMLDivElement | null>(null)
  const rightRef = useRef<HTMLDivElement | null>(null)
  const photoCardRef = useRef<HTMLDivElement | null>(null)
  const [isDesktopPointer, setIsDesktopPointer] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isAboutLoading, setIsAboutLoading] = useState(false)
  const [isTouchFlipActive, setIsTouchFlipActive] = useState(false)
  const lampX = useMotionValue(0)
  const lampY = useMotionValue(0)
  const lampCardX = useMotionValue(0)
  const lampCardY = useMotionValue(0)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 220, damping: 22, mass: 0.35 })
  const springTiltY = useSpring(tiltY, { stiffness: 220, damping: 22, mass: 0.35 })

  const photoRevealMask = useMotionTemplate`radial-gradient(250px circle at ${lampCardX}px ${lampCardY}px, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.92) 38%, rgba(255, 255, 255, 0.46) 63%, rgba(0, 0, 0, 0) 84%)`
  const isLeftInView = useInView(leftRef, { once: false, amount: 0.45 })
  const isRightInView = useInView(rightRef, { once: false, amount: 0.35 })
  const canRunAmbientAnimation = isRightInView && isDesktopPointer && !reduceMotion

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

    const nx = (clientX - photoRect.left) / photoRect.width - 0.5
    const ny = (clientY - photoRect.top) / photoRect.height - 0.5
    tiltY.set(nx * PHOTO_TILT_Y_MAX)
    tiltX.set(-ny * PHOTO_TILT_X_MAX)
  }, [lampCardX, lampCardY, lampX, lampY, tiltX, tiltY])

  const centerLamp = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    const sectionRect = section.getBoundingClientRect()
    setLampByClient(
      sectionRect.left + section.clientWidth / 2,
      sectionRect.top + section.clientHeight * 0.4
    )
    tiltX.set(0)
    tiltY.set(0)
  }, [setLampByClient, tiltX, tiltY])

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

  const handleAboutNavigation = () => {
    if (isAboutLoading) return
    setIsAboutLoading(true)
    window.setTimeout(() => {
      router.push("/about")
    }, reduceMotion ? 220 : ABOUT_TRANSITION_MS)
  }

  const activateTouchFlip = () => {
    if (isDesktopPointer) return
    setIsTouchFlipActive(true)
  }

  const deactivateTouchFlip = () => {
    if (isDesktopPointer) return
    setIsTouchFlipActive(false)
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
            Website Developer | Mobile Enthusiast | AI Enthusiast.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            I build responsive websites, explore mobile experiences, and experiment with AI-driven products
            to create practical solutions with engaging user experience.
          </p>
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={
              reduceMotion
                ? undefined
                : isLeftInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 14 }
            }
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.12 }}
            className="mt-7"
          >
            <motion.button
              type="button"
              disabled={isAboutLoading}
              onClick={handleAboutNavigation}
              onPointerDown={activateTouchFlip}
              onPointerUp={deactivateTouchFlip}
              onPointerCancel={deactivateTouchFlip}
              onPointerLeave={deactivateTouchFlip}
              initial={false}
              animate={isTouchFlipActive ? "flipped" : "idle"}
              whileHover={isDesktopPointer ? "flipped" : undefined}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="relative inline-grid place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-2)] disabled:pointer-events-none disabled:opacity-65"
              style={{ perspective: "900px" }}
            >
              <motion.span
                variants={{
                  idle: { opacity: 1, rotateX: 0, y: "0%" },
                  flipped: { opacity: 0, rotateX: 90, y: "50%" },
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="col-start-1 row-start-1 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--accent-2)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.2)]"
              >
                <span>About Me</span>
                <span aria-hidden="true">-&gt;</span>
              </motion.span>
              <motion.span
                variants={{
                  idle: { opacity: 0, rotateX: 90, y: "-50%" },
                  flipped: { opacity: 1, rotateX: 0, y: "0%" },
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="col-start-1 row-start-1 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--accent-2)]/90 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.2)]"
              >
                <span>About Me</span>
                <span aria-hidden="true">-&gt;</span>
              </motion.span>
            </motion.button>
          </motion.div>

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
          <motion.div
          ref={photoCardRef}
          initial={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
          animate={
            reduceMotion
              ? undefined
              : isRightInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 18, scale: 0.98 }
          }
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            rotateX: springTiltX,
            rotateY: springTiltY,
            transformStyle: "preserve-3d",
          }}
          whileHover={reduceMotion ? undefined : { scale: 1.015 }}
          className="relative aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-3xl border border-[var(--border-subtle)] shadow-[0_20px_70px_rgba(0,0,0,0.35)] md:aspect-[5/4]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(160deg,var(--bg-surface)_0%,var(--bg-elev)_48%,var(--bg-page)_100%)]" />
            <motion.div
              style={{ backgroundImage: `url('${ABOUT_PHOTO}')` }}
              className="absolute inset-0 bg-cover bg-center"
              animate={
                canRunAmbientAnimation
                  ? {
                      scale: [1.04, 1.08, 1.04],
                      x: [0, -7, 0],
                      y: [0, -4, 0],
                    }
                  : {
                      scale: 1.02,
                      x: 0,
                      y: 0,
                    }
              }
              transition={
                canRunAmbientAnimation
                  ? { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.25, ease: "easeOut" }
              }
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center"
              style={{
                WebkitMaskImage: photoRevealMask,
                maskImage: photoRevealMask,
                backgroundImage: `url('${ABOUT_PHOTO}')`,
              }}
            />
            <div className="absolute inset-0 bg-white/5" />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-y-12 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/28 to-transparent"
              animate={canRunAmbientAnimation ? { x: ["-120%", "290%"] } : { x: "-120%" }}
              transition={
                canRunAmbientAnimation
                  ? { duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.6 }
                  : { duration: 0.2, ease: "linear" }
              }
            />
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isAboutLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[160] flex items-center justify-center bg-[var(--bg-page)]/92"
          >
            <motion.h3
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, letterSpacing: ["0.02em", "0.1em", "0.02em"] }
              }
              transition={reduceMotion ? { duration: 0.14 } : { duration: 0.52, ease: "easeOut" }}
              className="text-[clamp(1.25rem,4vw,2.6rem)] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]"
            >
              faisporto-v1
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

