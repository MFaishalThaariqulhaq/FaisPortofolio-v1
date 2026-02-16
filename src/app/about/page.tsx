"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import Navbar from "@/components/Navbar"

const PHOTO_COLUMNS = [
  {
    id: "photo-1",
    src: "/about-photo.jpg",
    alt: "Faishal collaborating with teammates during a development session",
    className: "mt-4 md:mt-7",
    floatOffset: -8,
    tilt: -1.8,
  },
  {
    id: "photo-2",
    src: "/about-photo.jpg",
    alt: "Faishal standing on stage in an event setting",
    className: "-mt-3 md:-mt-6",
    floatOffset: -11,
    tilt: 1.2,
  },
  {
    id: "photo-3",
    src: "/about-photo.jpg",
    alt: "Formal portrait of Faishal in a suit",
    className: "mt-7 md:mt-11",
    floatOffset: -7,
    tilt: -1.1,
  },
]

export default function AboutPage() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-page)] px-6 pb-16 pt-28 text-[var(--text-primary)] md:px-16 md:pt-32">
        <div className="mx-auto w-full max-w-6xl">

        <motion.section
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">About</p>
          <span className="mt-4 block h-[3px] w-24 rounded-full bg-[var(--text-secondary)]/70" />
          <motion.h1 className="mt-3 text-[clamp(2rem,7vw,4.25rem)] font-semibold leading-[1.04] tracking-tight">
            Who Am I
          </motion.h1>
        </motion.section>

          <section className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="grid grid-cols-3 gap-3 md:gap-4"
          >
            {PHOTO_COLUMNS.map((photo, index) => (
              <motion.figure
                key={photo.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 + index * 0.06, ease: "easeOut" }}
                whileHover={reduceMotion ? undefined : { scaleX: 1.055, y: -8, rotate: 0, zIndex: 8 }}
                className={`relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[0_20px_45px_rgba(0,0,0,0.24)] ${photo.className}`}
                style={{ rotate: reduceMotion ? 0 : photo.tilt }}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, photo.floatOffset, 0] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 5.2 + index * 0.55, repeat: Infinity, ease: "easeInOut" }
                  }
                  className="relative h-full w-full"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 28vw, 30vw"
                    className="object-cover transition duration-500 ease-out hover:scale-[1.06]"
                    priority={index === 0}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
                </motion.div>
              </motion.figure>
            ))}
          </motion.div>
          <motion.article
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
            className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/70 p-6 md:p-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Pengenalan</p>
            <h2 className="mt-3 text-[clamp(1.5rem,4vw,2.4rem)] font-semibold leading-tight tracking-tight">
              M. Faishal Thariqulhaq
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
              Product-driven Fullstack Developer with expertise in Laravel and TypeScript, building modern web
              systems that balance performance, scalability, and maintainability. I work across backend architectures
              and interactive frontend applications while expanding into mobile development with Kotlin and AI-powered
              solutions.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
              My goal is to bridge fullstack engineering with intelligent technologies to create adaptable and
              future-ready digital products.
            </p>
          </motion.article>
          </section>
        </div>
      </main>
    </>
  )
}
