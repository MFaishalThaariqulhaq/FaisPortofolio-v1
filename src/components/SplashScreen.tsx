"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect } from "react"

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void
}) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: reduceMotion ? 0.2 : 0.42, ease: "easeOut" }}
      className="fixed inset-0 z-[200] flex cursor-pointer items-center justify-center bg-black"
      onClick={onFinish}
      role="button"
      tabIndex={0}
      aria-label="Close splash screen"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onFinish()
        }
      }}
    >
      <div className="px-6 text-center">
        <h1 className="text-[clamp(2rem,8vw,5.2rem)] font-semibold leading-tight tracking-tight text-white/95">
          <AnimatedText text="FaisPortofolio-v1" reduceMotion={reduceMotion} />
        </h1>
        <motion.p
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.45, delay: reduceMotion ? 0.05 : 0.5 }}
          className="mt-4 text-xs uppercase tracking-[0.2em] text-white/55"
        >
          Click anywhere to continue
        </motion.p>
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
            delay: index * 0.03,
          }}
          className={char === " " ? "inline-block w-[0.34em]" : "inline-block"}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}
