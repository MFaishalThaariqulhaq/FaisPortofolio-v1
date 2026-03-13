"use client"

import { motion, useReducedMotion } from "framer-motion"
import Navbar from "@/components/Navbar"

const MEDIA_ASSETS = {
  videoSrc: "/miniatur.mp4",
  videoAlt: "Video profil",
  videoPoster: "/Miniatur.png",
}

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
            className="w-full max-w-xs md:max-w-sm lg:max-w-xs xl:max-w-sm mx-auto lg:mx-0"
          >
            <motion.figure
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12, ease: "easeOut" }}
              whileHover={reduceMotion ? undefined : { scale: 1.01 }}
              className="relative aspect-[4/5] w-full max-h-[420px] overflow-hidden rounded-3xl border border-transparent bg-transparent shadow-none"
            >
              <video
                className="h-full w-full object-contain"
                autoPlay
                loop
                muted
                playsInline
                poster={MEDIA_ASSETS.videoPoster}
                aria-label={MEDIA_ASSETS.videoAlt}
              >
                <source src={MEDIA_ASSETS.videoSrc} type="video/mp4" />
              </video>
            </motion.figure>
          </motion.div>
          <motion.article
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
            className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/70 p-6 md:p-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Pengenalan</p>
            <h2 className="mt-3 text-[clamp(1.5rem,4vw,2.4rem)] font-semibold leading-tight tracking-tight">
              Nama Lengkap Anda
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
              Perkenalkan, saya seorang profesional di bidang teknologi yang fokus membangun produk digital dari ide
              hingga rilis. Saat ini saya banyak bekerja pada web apps modern, API yang rapi, dan pengalaman pengguna
              yang sederhana.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
              Saya menikmati kolaborasi lintas tim, bereksperimen dengan teknologi baru, dan selalu mencari cara agar
              produk lebih cepat, stabil, dan mudah digunakan.
            </p>
          </motion.article>
          </section>
        </div>
      </main>
    </>
  )
}
