"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type SplashPhase = "greetings" | "brand" | "exiting"
type ExitReason = "auto" | "skip"
type GreetingItem = { text: string; dir?: "rtl" | "ltr" }

const GREETINGS: GreetingItem[] = [
  { text: "Halo", dir: "ltr" },
  { text: "Hello", dir: "ltr" },
  { text: "こんにちは", dir: "ltr" },
  { text: "안녕하세요", dir: "ltr" },
  { text: "مرحبا", dir: "rtl" },
  { text: "Bonjour", dir: "ltr" },
]

const GREETING_SLOT_MS = 390
const GREETING_GAP_MS = 80
const BRAND_REVEAL_MS = 1020
const EXIT_WIPE_MS = 760
const REDUCED_EXIT_MS = 200

function getGreetingSequence(reduced: boolean) {
  return reduced ? GREETINGS.slice(0, 3) : GREETINGS
}

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void
}) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<SplashPhase>("greetings")
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0)
  const [isSkipping, setIsSkipping] = useState(false)
  const sequenceTimeoutsRef = useRef<number[]>([])
  const finishTimeoutRef = useRef<number | null>(null)

  const greetingSequence = useMemo(
    () => getGreetingSequence(Boolean(reduceMotion)),
    [reduceMotion]
  )

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  const clearSequenceTimers = useCallback(() => {
    sequenceTimeoutsRef.current.forEach((id) => window.clearTimeout(id))
    sequenceTimeoutsRef.current = []
  }, [])

  const clearFinishTimer = useCallback(() => {
    if (finishTimeoutRef.current !== null) {
      window.clearTimeout(finishTimeoutRef.current)
      finishTimeoutRef.current = null
    }
  }, [])

  const startExit = useCallback((reason: ExitReason) => {
    setPhase((prev) => {
      if (prev === "exiting") return prev
      return "exiting"
    })
    setIsSkipping(reason === "skip")
    clearSequenceTimers()
    clearFinishTimer()

    const exitDuration = reduceMotion ? REDUCED_EXIT_MS : EXIT_WIPE_MS
    finishTimeoutRef.current = window.setTimeout(() => {
      onFinish()
    }, exitDuration)
  }, [clearFinishTimer, clearSequenceTimers, onFinish, reduceMotion])

  useEffect(() => {
    if (phase !== "greetings") return

    clearSequenceTimers()

    const step = GREETING_SLOT_MS + GREETING_GAP_MS
    greetingSequence.forEach((_, index) => {
      const id = window.setTimeout(() => {
        setCurrentGreetingIndex(index)
      }, index * step)
      sequenceTimeoutsRef.current.push(id)
    })

    const toBrand = window.setTimeout(() => {
      setPhase("brand")
    }, greetingSequence.length * step)

    const autoExit = window.setTimeout(() => {
      startExit("auto")
    }, greetingSequence.length * step + BRAND_REVEAL_MS)

    sequenceTimeoutsRef.current.push(toBrand, autoExit)

    return () => clearSequenceTimers()
  }, [clearSequenceTimers, greetingSequence, phase, startExit])

  useEffect(() => {
    return () => {
      clearSequenceTimers()
      clearFinishTimer()
    }
  }, [clearFinishTimer, clearSequenceTimers])

  const currentGreeting = greetingSequence[currentGreetingIndex] ?? greetingSequence[0]

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: reduceMotion ? 0.2 : 0.42, ease: "easeOut" }}
      className="fixed inset-0 z-[200] flex cursor-pointer items-center justify-center overflow-hidden bg-black"
      onClick={() => {
        if (phase === "exiting") return
        startExit("skip")
      }}
      role="button"
      tabIndex={0}
      aria-label="Close splash screen"
      onKeyDown={(event) => {
        if (phase === "exiting") return
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          startExit("skip")
        }
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={reduceMotion ? undefined : { opacity: [0.5, 0.85, 0.55], scale: [1, 1.08, 1] }}
          transition={reduceMotion ? undefined : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-[-180px] h-[460px] w-[460px] rounded-full bg-cyan-400/14 blur-3xl"
        />
        <motion.div
          animate={reduceMotion ? undefined : { opacity: [0.46, 0.76, 0.5], scale: [1, 1.06, 1] }}
          transition={reduceMotion ? undefined : { duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="absolute -right-24 bottom-[-210px] h-[520px] w-[520px] rounded-full bg-blue-500/14 blur-3xl"
        />
      </div>

      <div className="relative z-10 px-6 text-center">
        <AnimatePresence mode="wait">
          {phase === "greetings" ? (
            <motion.h1
              key={`greeting-${currentGreetingIndex}`}
              dir={currentGreeting?.dir ?? "ltr"}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: reduceMotion ? 0.16 : 0.22, ease: "easeOut" }}
              className="text-[clamp(2.2rem,9vw,5.6rem)] font-semibold leading-tight tracking-tight text-white/96"
            >
              {currentGreeting?.text}
            </motion.h1>
          ) : (
            <motion.h1
              key="brand"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: [0.985, 1.01, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.44, ease: "easeOut" }}
              className="text-[clamp(2rem,8vw,5.2rem)] font-semibold leading-tight tracking-tight text-white/95"
            >
              <AnimatedText text="FaisPortofolio-v1" reduceMotion={reduceMotion} />
            </motion.h1>
          )}
        </AnimatePresence>

        {phase !== "exiting" && (
          <motion.p
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.45, delay: reduceMotion ? 0.05 : 0.5 }}
            className="mt-4 text-xs uppercase tracking-[0.2em] text-white/55"
          >
            Click anywhere to skip
          </motion.p>
        )}
      </div>

      {phase === "exiting" && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {reduceMotion ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: REDUCED_EXIT_MS / 1000, ease: "easeOut" }}
              className="absolute inset-0 bg-black"
            />
          ) : (
            <>
              <motion.div
                initial={{ scale: 0.25, x: "36%", y: "38%", borderRadius: "45% 55% 62% 38% / 41% 44% 56% 59%", rotate: -12 }}
                animate={{
                  scale: 3.1,
                  x: "2%",
                  y: "5%",
                  borderRadius: [
                    "45% 55% 62% 38% / 41% 44% 56% 59%",
                    "59% 41% 36% 64% / 44% 66% 34% 56%",
                    "52% 48% 44% 56% / 56% 39% 61% 44%",
                  ],
                  rotate: -2,
                }}
                transition={{ duration: EXIT_WIPE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-[36vmax] -right-[34vmax] h-[82vmax] w-[82vmax] bg-[#75d8ff]"
              />
              <motion.div
                initial={{ scale: 0.22, x: "40%", y: "42%", borderRadius: "58% 42% 55% 45% / 44% 55% 45% 56%", rotate: -14 }}
                animate={{
                  scale: 2.6,
                  x: "7%",
                  y: "8%",
                  borderRadius: [
                    "58% 42% 55% 45% / 44% 55% 45% 56%",
                    "42% 58% 48% 52% / 54% 44% 56% 46%",
                    "50% 50% 60% 40% / 45% 60% 40% 55%",
                  ],
                  rotate: 4,
                }}
                transition={{ duration: EXIT_WIPE_MS / 1000, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                className="absolute -bottom-[34vmax] -right-[30vmax] h-[74vmax] w-[74vmax] bg-[#38bdf8]/90 mix-blend-screen"
              />
              <motion.div
                initial={{ scale: 0.14, x: "-20%", y: "58%", borderRadius: "52% 48% 43% 57% / 62% 44% 56% 38%", rotate: 8 }}
                animate={{
                  scale: 2.2,
                  x: "-8%",
                  y: "16%",
                  borderRadius: [
                    "52% 48% 43% 57% / 62% 44% 56% 38%",
                    "40% 60% 56% 44% / 45% 57% 43% 55%",
                    "60% 40% 46% 54% / 52% 48% 52% 48%",
                  ],
                  rotate: -5,
                }}
                transition={{ duration: EXIT_WIPE_MS / 1000, ease: [0.22, 1, 0.36, 1], delay: 0.11 }}
                className="absolute -bottom-[42vmax] -left-[36vmax] h-[70vmax] w-[70vmax] bg-[#22d3ee]/70 mix-blend-screen"
              />
              {isSkipping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.36, 0.08] }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                  className="absolute inset-0 bg-white"
                />
              )}
            </>
          )}
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.95) 0.7px, transparent 0.8px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-white/35">
        {phase === "greetings" ? "Loading Sequence" : "FaisPortofolio-v1"}
      </div>
    </motion.div>
  )
}

function AnimatedText({
  text,
  reduceMotion,
}: {
  text: string
  reduceMotion?: boolean
}) {
  const STAGGER = 0.028

  return (
    <span className="inline-flex">
      {text.split("").map((char, index) => (
        <motion.span
          key={`${text}-${index}`}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -90, filter: "blur(8px)" }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.52,
            ease: [0.22, 1, 0.36, 1],
            delay: index * STAGGER,
          }}
          className={char === " " ? "inline-block w-[0.34em]" : "inline-block"}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}
