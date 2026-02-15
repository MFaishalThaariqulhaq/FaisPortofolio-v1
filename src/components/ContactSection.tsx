"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, useState } from "react"

type SocialIconType = "mail" | "github" | "instagram" | "linkedin" | "discord"

type SocialItem = {
  label: string
  href: string
  value: string
  type: SocialIconType
}

const CONTACT_EMAIL = "your.email@example.com"
const CONTACT_IMAGE_SRC = "/contact-placeholder.jpg"

const SOCIAL_LINKS: SocialItem[] = [
  {
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    value: CONTACT_EMAIL,
    type: "mail",
  },
  {
    label: "GitHub",
    href: "https://github.com/your-username",
    value: "@your-username",
    type: "github",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/your-handle",
    value: "@your-handle",
    type: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-profile",
    value: "your-profile",
    type: "linkedin",
  },
  {
    label: "Discord",
    href: "https://discord.com/users/your-id",
    value: "your-tag",
    type: "discord",
  },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const leftRef = useRef<HTMLDivElement | null>(null)
  const rightRef = useRef<HTMLDivElement | null>(null)
  const reduceMotion = useReducedMotion()
  const isLeftInView = useInView(leftRef, { once: false, amount: 0.45 })
  const isRightInView = useInView(rightRef, { once: false, amount: 0.35 })

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen bg-[#070b14] text-white px-6 md:px-16 py-24 flex items-center"
    >
      <div className="mx-auto w-full max-w-6xl grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
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
          <h2 className="text-[clamp(2.3rem,7vw,6rem)] leading-[1.03] font-semibold tracking-tight text-white/95">
            Get In Touch
          </h2>

          <div className="mt-5">
            <span className="block h-[4px] w-20 rounded-full bg-[#2f405e]" />
            <span className="mt-2 ml-8 block h-[4px] w-24 rounded-full bg-[#2f405e]" />
          </div>

          <p className="mt-9 max-w-xl text-[clamp(1rem,2.1vw,1.9rem)] leading-relaxed text-white/65">
            Feel free to contact me if you have any questions or just want to say hi.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-9 inline-block text-xl md:text-3xl text-white/78 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-md"
          >
            {CONTACT_EMAIL}
          </a>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {SOCIAL_LINKS.map((item) => (
              <SocialIconButton key={item.label} item={item} reduceMotion={Boolean(reduceMotion)} />
            ))}
          </div>
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
          className="relative"
        >
          <div className="aspect-[4/3] w-full overflow-hidden border border-white/12 bg-[#111827]">
            <div
              className="h-full w-full bg-cover bg-center grayscale contrast-125"
              style={{ backgroundImage: `url('${CONTACT_IMAGE_SRC}')` }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.14),transparent_45%),linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.22))]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SocialIconButton({
  item,
  reduceMotion,
}: {
  item: SocialItem
  reduceMotion: boolean
}) {
  const [hovered, setHovered] = useState(false)

  const iconStrokeClass =
    "fill-none stroke-current stroke-[1.9] transition-transform duration-300 ease-out"

  const baseAnimation = reduceMotion
    ? undefined
    : {
        y: hovered ? -13 : 0,
        scale: hovered ? 1.18 : 1,
      }

  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={item.label}
      title={`${item.label}: ${item.value}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group inline-flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#334155] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85"
    >
      <motion.span
        animate={baseAnimation}
        transition={{ type: "spring", stiffness: 420, damping: 14, mass: 0.42 }}
        className="relative inline-flex h-9 w-9 items-center justify-center"
      >
        <motion.span
          aria-hidden="true"
          animate={reduceMotion ? undefined : { scale: hovered ? [1, 1.28, 1] : 1, opacity: hovered ? [0.25, 0.55, 0.3] : 0.18 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none absolute -inset-4 rounded-full border border-white/35"
        />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        {item.type === "mail" && (
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-white">
            <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" className={iconStrokeClass} />
            <path d="M4.5 7l7.5 6 7.5-6" className={iconStrokeClass} />
          </svg>
        )}
        {item.type === "github" && (
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-white">
            <path
              d="M12 3.8a8.3 8.3 0 0 0-2.6 16.2c.4.1.5-.2.5-.4v-1.6c-2.1.5-2.6-.9-2.6-.9-.4-.9-.9-1.1-.9-1.1-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.3 2.1 1 2.6.8.1-.6.3-1 .6-1.2-1.7-.2-3.6-.9-3.6-3.9 0-.8.3-1.5.8-2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.8 7.8 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2 0 3-1.9 3.6-3.7 3.8.3.3.6.8.6 1.7v2.4c0 .2.1.5.5.4A8.3 8.3 0 0 0 12 3.8Z"
              className={iconStrokeClass}
            />
          </svg>
        )}
        {item.type === "instagram" && (
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-white">
            <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.6" className={iconStrokeClass} />
            <circle cx="12" cy="12" r="3.5" className={iconStrokeClass} />
            <circle cx="17.2" cy="6.8" r="0.9" className={iconStrokeClass} />
          </svg>
        )}
        {item.type === "linkedin" && (
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-white">
            <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="2.2" className={iconStrokeClass} />
            <path d="M8.3 10.3v5.8M8.3 7.8v.1M11.7 16.1v-3.2a2 2 0 0 1 4 0v3.2" className={iconStrokeClass} />
          </svg>
        )}
        {item.type === "discord" && (
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-white">
            <path
              d="M7.1 8.4c1.4-1 2.8-1.1 2.8-1.1l.3.7c-1 .2-1.5.5-1.5.5m5.1-.1c-1-.4-2-.4-2-.4l.3-.7s1.4.1 2.8 1.1M7.1 15.8c1.8 1.4 3.7 1.4 4.9 1.4 1.2 0 3.1 0 4.9-1.4.5-1.8.8-3.5.8-3.5-.7-.6-1.4-.9-1.4-.9-.6.4-1.3.7-1.3.7-.6.2-1.2.4-3 .4s-2.4-.2-3-.4c0 0-.7-.3-1.3-.7 0 0-.7.3-1.4.9 0 0 .3 1.7.8 3.5Z"
              className={iconStrokeClass}
            />
            <circle cx="10" cy="12.6" r="1" className={iconStrokeClass} />
            <circle cx="14" cy="12.6" r="1" className={iconStrokeClass} />
          </svg>
        )}
      </motion.span>
    </a>
  )
}
