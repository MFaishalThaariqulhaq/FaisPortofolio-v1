"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "@/components/ThemeToggle"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Project", href: "#project" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-8 py-8 md:px-16">
        <h1 className="text-lg font-medium tracking-wider text-[var(--text-primary)]">
          Faishal
        </h1>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Animated Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="relative flex h-10 w-10 flex-col justify-center gap-[6px] rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elev)]/75 px-2.5"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-full origin-left bg-[var(--text-primary)]"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="h-[2px] w-full bg-[var(--text-primary)]"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-full origin-left bg-[var(--text-primary)]"
            />
          </button>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[linear-gradient(140deg,var(--bg-page)_0%,var(--bg-surface)_40%,var(--bg-elev)_100%)]/95 backdrop-blur-xl"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="space-y-10 text-center"
            >
              {menuItems.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group relative text-4xl font-semibold tracking-wide text-[var(--text-primary)] md:text-6xl"
                  >
                    {item.label}

                    {/* Hover underline animation */}
                    <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[var(--accent-1)] transition-all duration-300 group-hover:w-full" />
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
