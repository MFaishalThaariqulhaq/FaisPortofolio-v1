"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 md:px-16 py-8 z-50">
        <h1 className="text-lg font-medium tracking-wider text-white">
          Faishal
        </h1>

        {/* Animated Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="relative w-8 h-6 flex flex-col justify-between"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-[2px] w-full bg-white origin-left"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="h-[2px] w-full bg-white"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-[2px] w-full bg-white origin-left"
          />
        </button>
      </nav>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#111827] backdrop-blur-xl"
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
                    className="group relative text-4xl md:text-6xl font-semibold text-white tracking-wide"
                  >
                    {item.label}

                    {/* Hover underline animation */}
                    <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
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
