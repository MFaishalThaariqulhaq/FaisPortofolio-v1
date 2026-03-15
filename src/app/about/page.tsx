"use client"

import Image from "next/image"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import Navbar from "@/components/Navbar"

type StackId = "laravel" | "php" | "nextjs" | "mysql" | "firebase" | "supabase" | "dart" | "flutter"

type StackItem = {
  id: StackId
  name: string
  role: string
  icon: {
    slug: string
    alt: string
  }
}

const STACK_ITEMS: StackItem[] = [
  {
    id: "laravel",
    name: "Laravel",
    role: "Framework",
    icon: { slug: "laravel", alt: "Laravel logo" },
  },
  {
    id: "php",
    name: "PHP",
    role: "Language",
    icon: { slug: "php", alt: "PHP logo" },
  },
  {
    id: "nextjs",
    name: "Next.js",
    role: "Framework",
    icon: { slug: "nextdotjs", alt: "Next.js logo" },
  },
  {
    id: "mysql",
    name: "MySQL",
    role: "Database",
    icon: { slug: "mysql", alt: "MySQL logo" },
  },
  {
    id: "firebase",
    name: "Firebase",
    role: "Backend Service",
    icon: { slug: "firebase", alt: "Firebase logo" },
  },
  {
    id: "supabase",
    name: "Supabase",
    role: "Backend Service",
    icon: { slug: "supabase", alt: "Supabase logo" },
  },
  {
    id: "dart",
    name: "Dart",
    role: "Language",
    icon: { slug: "dart", alt: "Dart logo" },
  },
  {
    id: "flutter",
    name: "Flutter",
    role: "Mobile",
    icon: { slug: "flutter", alt: "Flutter logo" },
  },
]

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion()
  const skillsRef = useRef<HTMLDivElement | null>(null)
  const skillsInView = useInView(skillsRef, { once: false, amount: 0.25 })
  const enableMotion = !prefersReducedMotion

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.08,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-page)] px-6 pb-20 pt-28 text-[var(--text-primary)] md:px-16 md:pt-32">
        <div className="mx-auto w-full max-w-6xl space-y-12 md:space-y-16">
          <section className="flex min-h-[calc(100svh-7rem)] items-start pb-8 pt-2 md:pb-12 md:pt-6">
            <div className="w-full space-y-8">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center md:text-left"
              >
                <h1 className="relative inline-block pb-4 text-4xl font-bold tracking-tight md:text-5xl">
                  About Me
                  <span className="absolute bottom-0 left-0 h-1.5 w-1/3 rounded-full bg-[var(--text-primary)]" />
                </h1>
              </motion.div>

              <div className="grid items-center gap-10 md:grid-cols-12">
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
                  className="md:col-span-4 lg:col-span-4"
                >
                  <div className="flex justify-center md:justify-start">
                    <div className="group relative h-80 w-72 overflow-hidden rounded-2xl bg-[var(--bg-surface)] shadow-xl">
                      <Image
                        src="/about-photo.jpg"
                        alt="Portrait of M. Faishal Thariqulhaq"
                        fill
                        sizes="(min-width: 1024px) 260px, (min-width: 768px) 240px, 75vw"
                        className="object-cover grayscale transition duration-500 ease-out group-hover:grayscale-0 scale-[1.01]"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
                  className="md:col-span-8 lg:col-span-8"
                >
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                    M. Faishal Thariqulhaq
                  </h2>
                  <div className="mt-4 max-w-2xl space-y-4 text-justify text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                    <p>
                      I am a Software Developer who builds modern digital products for web and mobile platforms.
                      I specialize in developing web applications using Laravel, PHP, and MySQL, and creating
                      cross-platform mobile apps with Flutter.
                    </p>
                    <p>
                      I enjoy turning ideas into functional products, from web-based systems and admin dashboards
                      to user-friendly mobile applications, with a focus on clean architecture and intuitive design.
                    </p>
                    <p>
                      I am also interested in the growing role of Artificial Intelligence and how it can be
                      integrated into modern applications to build smarter digital solutions.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="space-y-10 pb-8">
            <motion.div
              ref={skillsRef}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={
                prefersReducedMotion || skillsInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 18 }
              }
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative overflow-hidden"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-10 hidden select-none text-[9rem] font-black uppercase leading-none text-[var(--text-primary)]/5 md:block lg:text-[12rem]"
                aria-hidden="true"
              >
                Tools
              </div>

              <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
                <div className="space-y-6">
                  <p className="w-full text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Skills & Expertise
                  </p>
                  <h3 className="w-full text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                    TECH <span className="text-[var(--text-muted)]">STACK</span>
                  </h3>
                  <p className="w-full max-w-none text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                    A curated collection of modern technologies I use to build robust, scalable, and beautiful
                    digital experiences.
                  </p>
                </div>

                <motion.div
                  className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                  variants={gridVariants}
                  initial={enableMotion ? "hidden" : "show"}
                  animate={enableMotion ? (skillsInView ? "show" : "hidden") : "show"}
                >
                  {STACK_ITEMS.map((stack, index) => (
                    <motion.div
                      key={stack.id}
                      className="border-t border-[var(--border-subtle)] pt-6"
                      variants={cardVariants}
                      whileHover={enableMotion ? { y: -6 } : undefined}
                      transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <motion.span
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
                          whileHover={enableMotion ? { scale: 1.08, rotate: 4 } : undefined}
                          transition={{ type: "spring", stiffness: 220, damping: 14 }}
                        >
                          <img
                            src={`https://cdn.simpleicons.org/${stack.icon.slug}/ffffff`}
                            alt={stack.icon.alt}
                            className="tech-icon h-4 w-4"
                            loading="lazy"
                          />
                        </motion.span>
                      </div>
                      <h4 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">{stack.name}</h4>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">{stack.role}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
      <style jsx global>{`
        :root {
          --tech-icon-filter: none;
          --tech-icon-opacity: 0.85;
        }

        html[data-theme="light"] {
          --tech-icon-filter: invert(1);
          --tech-icon-opacity: 0.72;
        }

        .tech-icon {
          filter: var(--tech-icon-filter);
          opacity: var(--tech-icon-opacity);
        }
      `}</style>
    </>
  )
}
