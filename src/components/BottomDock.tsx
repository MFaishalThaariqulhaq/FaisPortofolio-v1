"use client"

import { Home, User, Folder, Mail } from "lucide-react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

type DockItemConfig = {
  id: string
  href: string
  label: string
  icon: ReactNode
}

const ITEMS: DockItemConfig[] = [
  { id: "home", href: "#home", label: "Home", icon: <Home size={28} /> },
  { id: "about", href: "#about", label: "About", icon: <User size={28} /> },
  { id: "project", href: "#project", label: "Project", icon: <Folder size={28} /> },
  { id: "contact", href: "#contact", label: "Contact", icon: <Mail size={28} /> },
]

export default function BottomDock() {
  const [activeSection, setActiveSection] = useState("home")
  const [isHoveringDock, setIsHoveringDock] = useState(false)
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)
  const lampX = useMotionValue(0)
  const lampY = useMotionValue(0)
  const lampBg = useMotionTemplate`radial-gradient(140px circle at ${lampX}px ${lampY}px, rgba(34, 211, 238, 0.34), rgba(59, 130, 246, 0.13) 48%, rgba(59, 130, 246, 0) 74%)`

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35

      const visible = ITEMS.filter((item) => document.getElementById(item.id)).findLast(
        (item) => {
          const section = document.getElementById(item.id)
          if (!section) return false
          return section.offsetTop <= scrollY
        }
      )

      setActiveSection(visible?.id ?? "home")
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          mouseX.set(event.clientX)
          lampX.set(event.clientX - rect.left)
          lampY.set(event.clientY - rect.top)
        }}
        onMouseEnter={() => setIsHoveringDock(true)}
        onMouseLeave={() => {
          mouseX.set(Number.POSITIVE_INFINITY)
          setIsHoveringDock(false)
        }}
        className="relative flex items-end gap-12 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elev)]/80 px-11 py-5 shadow-2xl backdrop-blur-xl"
      >
        <motion.div
          aria-hidden="true"
          style={{ background: lampBg }}
          animate={{ opacity: isHoveringDock ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0"
        />
        {ITEMS.map((item) => (
          <DockItem
            key={item.id}
            mouseX={mouseX}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={activeSection === item.id}
          />
        ))}
      </motion.div>
    </div>
  )
}

function DockItem({
  mouseX,
  href,
  label,
  icon,
  active,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>
  href: string
  label: string
  icon: ReactNode
  active: boolean
}) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return Number.POSITIVE_INFINITY
    return value - bounds.left - bounds.width / 2
  })

  const scale = useSpring(useTransform(distance, [-140, 0, 140], [1, 1.8, 1]), {
    stiffness: 280,
    damping: 20,
    mass: 0.2,
  })
  const y = useSpring(useTransform(distance, [-140, 0, 140], [0, -12, 0]), {
    stiffness: 280,
    damping: 20,
    mass: 0.2,
  })
  const iconOpacity = useTransform(scale, [1, 1.8], [0.75, 1])
  const glowOpacity = useSpring(useTransform(distance, [-140, 0, 140], [0.15, 0.65, 0.15]), {
    stiffness: 260,
    damping: 24,
    mass: 0.25,
  })

  const dotScale = useMemo(() => (active ? 1 : 0.4), [active])
  const dotOpacity = useMemo(() => (active ? 1 : 0.3), [active])

  return (
    <a
      ref={ref}
      href={href}
      aria-label={label}
      title={label}
      className="relative z-10 block text-[var(--text-primary)]"
    >
      <motion.span
        aria-hidden="true"
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute -inset-3 rounded-full bg-[var(--glow-accent)] blur-lg"
      />
      <motion.div
        style={{ scale, y, opacity: iconOpacity }}
        whileTap={{ scale: 0.9 }}
        className="relative cursor-pointer"
      >
        {icon}
        <motion.span
          animate={{ scale: dotScale, opacity: dotOpacity }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--accent-1)]"
        />
      </motion.div>
    </a>
  )
}
