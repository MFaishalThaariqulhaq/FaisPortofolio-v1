"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"

const JOURNEY = [
  {
    title: "Awal Belajar",
    body: "Memulai dari rasa penasaran pada web, membangun fondasi HTML, CSS, dan JavaScript lewat project kecil.",
  },
  {
    title: "Pendalaman Web & Mobile",
    body: "Fokus membuat antarmuka yang responsif dan nyaman dipakai, sambil memahami pola UX lintas perangkat.",
  },
  {
    title: "Eksplorasi AI",
    body: "Menggabungkan AI ke dalam alur produk untuk mempercepat workflow dan memberi pengalaman yang lebih cerdas.",
  },
  {
    title: "Arah Berikutnya",
    body: "Membangun produk yang rapi secara engineering, kuat secara UX, dan berdampak nyata untuk pengguna.",
  },
]

const WORKFLOW = ["Discover", "Design", "Build", "Iterate"]
const STACK = ["Next.js", "TypeScript", "React", "Framer Motion", "GSAP", "Tailwind CSS"]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-page)] px-6 pb-20 pt-28 text-[var(--text-primary)] md:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="mb-5"
          >
            <Link
              href="/#about"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elev)]/75 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-2)]"
            >
              &lt;- Back to home
            </Link>
          </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
        >
          About Detail
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-[clamp(2rem,6vw,4.4rem)] font-semibold leading-[1.02] tracking-tight"
        >
          Website Developer | Mobile Enthusiast | AI Enthusiast
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
          className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg"
        >
          I focus on building practical digital experiences: fast interfaces, clear user flows, and product details
          that feel intentional.
        </motion.p>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Story & Journey</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {JOURNEY.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: index * 0.06, ease: "easeOut" }}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/70 p-5"
              >
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/70 p-5">
            <h2 className="text-base font-semibold">How I Work</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {WORKFLOW.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elev)]/65 px-3 py-1 text-xs text-[var(--text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/70 p-5">
            <h2 className="text-base font-semibold">Core Stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {STACK.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elev)]/65 px-3 py-1 text-xs text-[var(--text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/#project"
            className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--accent-2)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            View Projects
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elev)]/70 px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)]"
          >
            Contact Me
          </Link>
        </section>
        </div>
      </main>
    </>
  )
}
