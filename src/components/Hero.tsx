"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react"

type Point = { x: number; y: number }
type StickerState = {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotate: number
  rotateSpeed: number
  lastEscapeAt: number
}

const STICKER_IMAGES = [
  "/stickers/sticker1.png",
  "/stickers/sticker2.png",
  "/stickers/sticker3.png",
  "/stickers/sticker4.png",
]
const STICKER_COUNT = STICKER_IMAGES.length
const STICKER_SIZES = [76, 88, 100]
const BASE_SPEED_MIN = 95
const BASE_SPEED_MAX = 165
const ESCAPE_RADIUS = 120
const ESCAPE_BOOST = 240
const ESCAPE_COOLDOWN_MS = 200
const MAX_FRAME_DELTA = 0.035

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)
const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const prevTimeRef = useRef<number | null>(null)
  const stickersRef = useRef<StickerState[]>([])
  const pointerRef = useRef<Point | null>(null)

  const [isDesktopPointer, setIsDesktopPointer] = useState(false)
  const [stickers, setStickers] = useState<StickerState[]>([])
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.55 })
  const reduceMotion = useReducedMotion()
  const isStickerAnimationEnabled = Boolean(isHeroInView && !reduceMotion)

  const pushStickerAway = (stickerId: number, source: Point, timestamp: number) => {
    stickersRef.current = stickersRef.current.map((sticker) => {
      if (sticker.id !== stickerId) return sticker
      if (timestamp - sticker.lastEscapeAt < ESCAPE_COOLDOWN_MS) return sticker

      const centerX = sticker.x + sticker.size / 2
      const centerY = sticker.y + sticker.size / 2
      let dx = centerX - source.x
      let dy = centerY - source.y
      const distance = Math.hypot(dx, dy) || 1

      if (distance < 1) {
        dx = Math.random() - 0.5
        dy = Math.random() - 0.5
      }

      const nx = dx / distance
      const ny = dy / distance

      return {
        ...sticker,
        vx: sticker.vx + nx * ESCAPE_BOOST,
        vy: sticker.vy + ny * ESCAPE_BOOST,
        lastEscapeAt: timestamp,
      }
    })
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(pointer: fine)")
    const syncPointerCapability = () => {
      setIsDesktopPointer(mediaQuery.matches)
    }

    syncPointerCapability()
    mediaQuery.addEventListener("change", syncPointerCapability)

    return () => {
      mediaQuery.removeEventListener("change", syncPointerCapability)
    }
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const createStickers = () => {
      const width = hero.clientWidth
      const height = hero.clientHeight
      const generated: StickerState[] = []

      for (let i = 0; i < STICKER_COUNT; i += 1) {
        const size = STICKER_SIZES[i] ?? STICKER_SIZES[STICKER_SIZES.length - 1]
        const maxX = Math.max(0, width - size)
        const maxY = Math.max(0, height - size)
        const angle = randomBetween(0, Math.PI * 2)
        const speed = randomBetween(BASE_SPEED_MIN, BASE_SPEED_MAX)

        generated.push({
          id: i,
          x: randomBetween(0, maxX),
          y: randomBetween(0, maxY),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          rotate: randomBetween(-12, 12),
          rotateSpeed: randomBetween(-50, 50),
          lastEscapeAt: 0,
        })
      }

      stickersRef.current = generated
      setStickers(generated)
    }

    createStickers()

    const handleResize = () => {
      const width = hero.clientWidth
      const height = hero.clientHeight

      stickersRef.current = stickersRef.current.map((sticker) => {
        const maxX = Math.max(0, width - sticker.size)
        const maxY = Math.max(0, height - sticker.size)
        return {
          ...sticker,
          x: clamp(sticker.x, 0, maxX),
          y: clamp(sticker.y, 0, maxY),
        }
      })

      setStickers([...stickersRef.current])
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (!isStickerAnimationEnabled) return

    const tick = (now: number) => {
      const hero = heroRef.current
      if (!hero) return

      const prev = prevTimeRef.current ?? now
      const dt = Math.min((now - prev) / 1000, MAX_FRAME_DELTA)
      prevTimeRef.current = now

      const pointer = pointerRef.current
      const width = hero.clientWidth
      const height = hero.clientHeight

      stickersRef.current = stickersRef.current.map((sticker) => {
        let { x, y, vx, vy, rotate, lastEscapeAt } = sticker
        const { size, rotateSpeed } = sticker

        if (pointer) {
          const centerX = x + size / 2
          const centerY = y + size / 2
          const dx = centerX - pointer.x
          const dy = centerY - pointer.y
          const distance = Math.hypot(dx, dy)

          if (distance < ESCAPE_RADIUS && now - lastEscapeAt >= ESCAPE_COOLDOWN_MS) {
            const force = (ESCAPE_RADIUS - distance) / ESCAPE_RADIUS
            const nx = dx / (distance || 1)
            const ny = dy / (distance || 1)
            vx += nx * ESCAPE_BOOST * force
            vy += ny * ESCAPE_BOOST * force
            lastEscapeAt = now
          }
        }

        x += vx * dt
        y += vy * dt
        rotate += rotateSpeed * dt

        const maxX = Math.max(0, width - size)
        const maxY = Math.max(0, height - size)

        if (x <= 0) {
          x = 0
          vx = Math.abs(vx)
        } else if (x >= maxX) {
          x = maxX
          vx = -Math.abs(vx)
        }

        if (y <= 0) {
          y = 0
          vy = Math.abs(vy)
        } else if (y >= maxY) {
          y = maxY
          vy = -Math.abs(vy)
        }

        return { ...sticker, x, y, vx, vy, rotate, lastEscapeAt }
      })

      setStickers([...stickersRef.current])
      frameRef.current = window.requestAnimationFrame(tick)
    }

    frameRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
      prevTimeRef.current = null
      frameRef.current = null
    }
  }, [isStickerAnimationEnabled])

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const hero = heroRef.current
    if (!hero || !isStickerAnimationEnabled || !isDesktopPointer) return
    const heroRect = hero.getBoundingClientRect()
    pointerRef.current = {
      x: event.clientX - heroRect.left,
      y: event.clientY - heroRect.top,
    }
  }

  const handlePointerLeave = () => {
    pointerRef.current = null
  }

  const handleStickerClick = (
    stickerId: number,
    event: MouseEvent<HTMLImageElement>
  ) => {
    const sticker = stickersRef.current.find((item) => item.id === stickerId)
    if (!sticker) return

    pushStickerAway(stickerId, {
      x: sticker.x + sticker.size / 2,
      y: sticker.y + sticker.size / 2,
    }, event.timeStamp)
  }

  const handleStickerPointerDown = (stickerId: number, event: PointerEvent<HTMLImageElement>) => {
    const hero = heroRef.current
    const sticker = stickersRef.current.find((item) => item.id === stickerId)
    if (!hero || !sticker) return

    const heroRect = hero.getBoundingClientRect()
    pushStickerAway(
      stickerId,
      {
        x: event.clientX - heroRect.left,
        y: event.clientY - heroRect.top,
      },
      event.timeStamp
    )
  }

  return (
    <section
      id="home"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
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
            href="/cv-petershaan.pdf"
            download
            className="inline-flex items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--text-primary)] px-6 py-3 text-sm font-semibold text-[var(--bg-page)] transition-transform duration-200 hover:scale-[1.03]"
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

      {stickers.map((sticker) => (
        <motion.img
          key={sticker.id}
          src={STICKER_IMAGES[sticker.id] ?? STICKER_IMAGES[0]}
          alt={`sticker-${sticker.id + 1}`}
          className="absolute top-0 left-0 select-none pointer-events-auto will-change-transform"
          style={{
            width: `${sticker.size}px`,
            height: `${sticker.size}px`,
            transform: `translate3d(${sticker.x}px, ${sticker.y}px, 0) rotate(${sticker.rotate}deg)`,
          }}
          animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={(event) => handleStickerClick(sticker.id, event)}
          onPointerDown={(event) => handleStickerPointerDown(sticker.id, event)}
        />
      ))}
    </section>
  )
}
