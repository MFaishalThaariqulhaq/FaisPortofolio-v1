"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const PROJECT_LINK = "#"
const PREFIX = "Tap or click to view"
const EMPHASIS = "my projects"

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const ctaRef = useRef<HTMLAnchorElement | null>(null)
  const reduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [mobileCueTick, setMobileCueTick] = useState(0)
  const isInView = useInView(sectionRef, { once: false, amount: isMobile ? 0.22 : 0.55 })
  const useLiteAnimation = Boolean(reduceMotion || isMobile)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px), (pointer: coarse)")
    const syncMobile = () => setIsMobile(media.matches)
    syncMobile()
    media.addEventListener("change", syncMobile)
    return () => {
      media.removeEventListener("change", syncMobile)
    }
  }, [])

  return (
    <section
      id="project"
      ref={sectionRef}
      className="flex min-h-screen items-center bg-[var(--bg-surface)] px-6 py-24 text-[var(--text-primary)] md:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">Projects</p>
        <motion.a
          ref={ctaRef}
          href={PROJECT_LINK}
          onPointerDown={() => {
            if (isMobile) setMobileCueTick((value) => value + 1)
          }}
          className="group mt-8 inline-block select-none"
          aria-label="Tap or click to view my projects"
          initial={
            useLiteAnimation
              ? { opacity: 0, y: 24, filter: "blur(0px)" }
              : { opacity: 0, y: -60, filter: "blur(6px)" }
          }
          animate={
            isInView
              ? useLiteAnimation
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 1, y: 0, filter: "blur(0px)" }
              : useLiteAnimation
                ? { opacity: 0, filter: "blur(0px)" }
                : { opacity: 0, y: -60, filter: "blur(6px)" }
          }
          transition={
            useLiteAnimation
              ? { duration: 0.28, ease: "easeOut" }
              : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <span className="text-[clamp(2.1rem,7vw,6.5rem)] font-semibold leading-[1.05] tracking-tight text-[var(--text-primary)]/92">
            {isMobile ? (
              <MobileProjectHeading isInView={isInView} cueTick={mobileCueTick} />
            ) : (
              <>
                <AnimatedText text={PREFIX} baseDelay={0} reduceMotion={Boolean(reduceMotion)} isInView={isInView} />
                <span className="inline-block w-[0.45em]" />
                <span className="group/emphasis relative inline-block">
                  <span className="relative z-10 inline-block overflow-hidden">
                    <AnimatedText
                      text={EMPHASIS}
                      baseDelay={180}
                      reduceMotion={Boolean(reduceMotion)}
                      isInView={isInView}
                      expressive
                      className="transition-[filter,opacity,letter-spacing] duration-300 ease-out brightness-100 group-hover:brightness-110 group-hover:tracking-[0.02em]"
                    />
                    <span className="pointer-events-none absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--text-primary)] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <span
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-[var(--text-primary)] to-transparent ${
                          reduceMotion
                            ? ""
                            : "-translate-x-[120%] transition-transform duration-500 ease-out group-hover:translate-x-[120%]"
                        }`}
                      />
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 220 90"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute -left-[10%] -top-[28%] h-[1.7em] w-[125%] opacity-95"
                    style={{ color: "var(--accent-2)" }}
                  >
                    <path
                      d="M15 47 C 40 10, 165 8, 205 40 C 213 48, 214 63, 196 72 C 148 92, 52 86, 23 64"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      className="opacity-0 stroke-dasharray-[560] stroke-dashoffset-[560] transition-all duration-700 ease-out group-hover:opacity-100 group-hover:stroke-dashoffset-0"
                    />
                    <path
                      d="M70 20 C 118 6, 168 14, 184 26"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      className="opacity-0 stroke-dasharray-[200] stroke-dashoffset-[200] transition-all duration-500 delay-100 ease-out group-hover:opacity-100 group-hover:stroke-dashoffset-0"
                    />
                  </svg>
                </span>
              </>
            )}
          </span>
        </motion.a>
      </div>
    </section>
  )
}

function MobileProjectHeading({
  isInView,
  cueTick,
}: {
  isInView: boolean
  cueTick: number
}) {
  return (
    <>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="inline-block"
      >
        {PREFIX}
      </motion.span>
      <span className="inline-block w-[0.45em]" />
      <span className="relative inline-block">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.25, delay: 0.08, ease: "easeOut" }}
          className="relative z-10 inline-block"
        >
          {EMPHASIS}
        </motion.span>
        <svg
          viewBox="0 0 220 90"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -left-[10%] -top-[28%] h-[1.7em] w-[125%]"
          style={{ color: "var(--accent-2)" }}
        >
          <motion.path
            key={`mobile-ring-1-${cueTick}-${isInView ? "in" : "out"}`}
            d="M15 47 C 40 10, 165 8, 205 40 C 213 48, 214 63, 196 72 C 148 92, 52 86, 23 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.path
            key={`mobile-ring-2-${cueTick}-${isInView ? "in" : "out"}`}
            d="M70 20 C 118 6, 168 14, 184 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          />
        </svg>
      </span>
    </>
  )
}

function AnimatedText({
  text,
  baseDelay = 0,
  reduceMotion,
  isInView,
  expressive = false,
  className = "",
}: {
  text: string
  baseDelay?: number
  reduceMotion?: boolean
  isInView?: boolean
  expressive?: boolean
  className?: string
}) {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${text}-${index}`}
          initial={reduceMotion ? { opacity: 0, filter: "blur(0px)" } : { opacity: 0, y: -90, filter: "blur(8px)" }}
          animate={
            isInView
              ? reduceMotion
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 1, y: 0, filter: "blur(0px)" }
              : reduceMotion
                ? { opacity: 0, filter: "blur(0px)" }
                : { opacity: 0, y: -90, filter: "blur(8px)" }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.52,
            ease: [0.22, 1, 0.36, 1],
            delay: (baseDelay + index * 26) / 1000,
          }}
          className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            reduceMotion ? "" : "group-hover:-translate-y-[0.14em]"
          } ${
            expressive && !reduceMotion
              ? index % 2 === 0
                ? "group-hover:rotate-[-2deg]"
                : "group-hover:rotate-[2deg]"
              : ""
          } ${
            char === " " ? "w-[0.34em]" : ""
          }`}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}
