"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

const DEADLINE_SVG = `
<svg width="581" height="158" preserveAspectRatio="none" id="line" viewBox="0 0 581 158" enable-background="new 0 0 581 158">
  <g id="fire">
    <rect id="mask-fire-black" x="511" y="41" width="38" height="34"></rect>
    <g>
      <defs>
        <rect id="mask_fire" x="511" y="41" width="38" height="34"></rect>
      </defs>
      <clipPath id="mask-fire_1_">
        <use xlink:href="#mask_fire" overflow="visible"></use>
      </clipPath>
      <g id="group-fire" clip-path="url(#mask-fire_1_)">
        <path id="red-flame" fill="#B71342" d="M528.377,100.291c6.207,0,10.947-3.272,10.834-8.576c-0.112-5.305-2.934-8.803-8.237-10.383c-5.306-1.581-3.838-7.9-0.79-9.707c-7.337,2.032-7.581,5.891-7.11,8.238c0.789,3.951,7.56,4.402,5.077,9.48c-2.482,5.079-8.012,1.129-6.319-2.257c-2.843,2.233-4.78,6.681-2.259,9.703C521.256,98.809,524.175,100.291,528.377,100.291z"></path>
        <path id="yellow-flame" opacity="0.71" fill="#F7B523" d="M528.837,100.291c4.197,0,5.108-1.854,5.974-5.417c0.902-3.724-1.129-6.207-5.305-9.931c-2.396-2.137-1.581-4.176-0.565-6.32c-4.401,1.918-3.384,5.304-2.482,6.658c1.511,2.267,2.099,2.364,0.42,5.8c-1.679,3.435-5.42,0.764-4.275-1.527c-1.921,1.512-2.373,4.04-1.528,6.563C522.057,99.051,525.994,100.291,528.837,100.291z"></path>
        <path id="white-flame" opacity="0.81" fill="#FFFFFF" d="M529.461,100.291c-2.364,0-4.174-1.322-4.129-3.469c0.04-2.145,1.117-3.56,3.141-4.198c2.022-0.638,1.463-3.195,0.302-3.925c2.798,0.821,2.89,2.382,2.711,3.332c-0.301,1.597-2.883,1.779-1.938,3.834c0.912,1.975,3.286,0.938,2.409-0.913c1.086,0.903,1.826,2.701,0.864,3.924C532.18,99.691,531.064,100.291,529.461,100.291z"></path>
      </g>
    </g>
  </g>
  <g id="progress-trail">
    <path fill="#FFFFFF" d="M491.979,83.878c1.215-0.73-0.62-5.404-3.229-11.044c-2.583-5.584-5.034-10.066-7.229-8.878 c-2.854,1.544-0.192,6.286,2.979,11.628C487.667,80.917,490.667,84.667,491.979,83.878z"></path>
    <path fill="#FFFFFF" d="M571,76v-5h-23.608c0.476-9.951-4.642-13.25-4.642-13.25l-3.125,4c0,0,3.726,2.7,3.625,5.125 c-0.071,1.714-2.711,3.18-4.962,4.125H517v5h10v24h-25v-5.666c0,0,0.839,0,2.839-0.667s6.172-3.667,4.005-6.333 s-7.49,0.333-9.656,0.166s-6.479-1.5-8.146,1.917c-1.551,3.178,0.791,5.25,5.541,6.083l-0.065,4.5H16c-2.761,0-5,2.238-5,5v17 c0,2.762,2.239,5,5,5h549c2.762,0,5-2.238,5-5v-17c0-2.762-2.238-5-5-5h-3V76H571z"></path>
    <path fill="#FFFFFF" d="M535,65.625c1.125,0.625,2.25-1.125,2.25-1.125l11.625-22.375c0,0,0.75-0.875-1.75-2.125 s-3.375,0.25-3.375,0.25s-8.75,21.625-9.875,23.5S533.875,65,535,65.625z"></path>
  </g>
  <g>
    <defs>
      <path id="SVGID_1_" d="M484.5,75.584c-3.172-5.342-5.833-10.084-2.979-11.628c2.195-1.188,4.646,3.294,7.229,8.878 c2.609,5.64,4.444,10.313,3.229,11.044C490.667,84.667,487.667,80.917,484.5,75.584z M571,76v-5h-23.608 c0.476-9.951-4.642-13.25-4.642-13.25l-3.125,4c0,0,3.726,2.7,3.625,5.125c-0.071,1.714-2.711,3.18-4.962,4.125H517v5h10v24h-25 v-5.666c0,0,0.839,0,2.839-0.667s6.172-3.667,4.005-6.333s-7.49,0.333-9.656,0.166s-6.479-1.5-8.146,1.917 c-1.551,3.178,0.791,5.25,5.541,6.083l-0.065,4.5H16c-2.761,0-5,2.238-5,5v17c0,2.762,2.239,5,5,5h549c2.762,0,5-2.238,5-5v-17 c0-2.762-2.238-5-5-5h-3V76H571z M535,65.625c1.125,0.625,2.25-1.125,2.25-1.125l11.625-22.375c0,0,0.75-0.875-1.75-2.125 s-3.375,0.25-3.375,0.25s-8.75,21.625-9.875,23.5S533.875,65,535,65.625z"></path>
    </defs>
    <clipPath id="SVGID_2_">
      <use xlink:href="#SVGID_1_" overflow="visible"></use>
    </clipPath>
    <rect id="progress-time-fill" x="-100%" y="34" clip-path="url(#SVGID_2_)" fill="#BE002A" width="586" height="103"></rect>
  </g>
  <g id="death-group">
    <path id="death" fill="#BE002A" d="M-46.25,40.416c-5.42-0.281-8.349,3.17-13.25,3.918c-5.716,0.871-10.583-0.918-10.583-0.918 C-67.5,49-65.175,50.6-62.083,52c5.333,2.416,4.083,3.5,2.084,4.5c-16.5,4.833-15.417,27.917-15.417,27.917L-75.5,84.75 c-1,12.25-20.25,18.75-20.25,18.75s39.447,13.471,46.25-4.25c3.583-9.333-1.553-16.869-1.667-22.75 c-0.076-3.871,2.842-8.529,6.084-12.334c3.596-4.22,6.958-10.374,6.958-15.416C-38.125,43.186-39.833,40.75-46.25,40.416z"></path>
    <path id="death-arm" fill="#BE002A" d="M-53.375,75.25c0,0,9.375,2.25,11.25,0.25s2.313-2.342,3.375-2.791 c1.083-0.459,4.375-1.75,4.292-4.75c-0.101-3.627,0.271-4.594,1.333-5.043c1.083-0.457,2.75-1.666,2.75-1.666 s0.708-0.291,0.5-0.875s-0.791-2.125-1.583-2.959c-0.792-0.832-2.375-1.874-2.917-1.332c-0.542,0.541-7.875,7.166-7.875,7.166 s-2.667,2.791-3.417,0.125S-49.833,61-49.833,61s-3.417,1.416-3.417,1.541s-1.25,5.834-1.25,5.834l-0.583,5.833L-53.375,75.25z"></path>
    <path id="death-tool" fill="#BE002A" d="M-20.996,26.839l-42.819,91.475l1.812,0.848l38.342-81.909c0,0,8.833,2.643,12.412,7.414 c5,6.668,4.75,14.084,4.75,14.084s4.354-7.732,0.083-17.666C-10,32.75-19.647,28.676-19.647,28.676l0.463-0.988L-20.996,26.839z"></path>
  </g>
  <path id="designer-body" fill="#FEFFFE" d="M514.75,100.334c0,0,1.25-16.834-6.75-16.5c-5.501,0.229-5.583,3-10.833,1.666 c-3.251-0.826-5.084-15.75-0.834-22c4.948-7.277,12.086-9.266,13.334-7.833c2.25,2.583-2,10.833-4.5,14.167 c-2.5,3.333-1.833,10.416,0.5,9.916s8.026-0.141,10,2.25c3.166,3.834,4.916,17.667,4.916,17.667l0.917,2.5l-4,0.167L514.75,100.334z"></path>
  <circle id="designer-head" fill="#FEFFFE" cx="516.083" cy="53.25" r="6.083"></circle>
  <g id="designer-arm-grop">
    <path id="designer-arm" fill="#FEFFFE" d="M505.875,64.875c0,0,5.875,7.5,13.042,6.791c6.419-0.635,11.833-2.791,13.458-4.041s2-3.5,0.25-3.875 s-11.375,5.125-16,3.25c-5.963-2.418-8.25-7.625-8.25-7.625l-2,1.125L505.875,64.875z"></path>
    <path id="designer-pen" fill="#FEFFFE" d="M525.75,59.084c0,0-0.423-0.262-0.969,0.088c-0.586,0.375-0.547,0.891-0.547,0.891l7.172,8.984l1.261,0.453 l-0.104-1.328L525.75,59.084z"></path>
  </g>
</svg>
`

const ANIMATION_TIME = 20
const DAYS = 7

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void
}) {
  const reduceMotion = useReducedMotion()
  const [day, setDay] = useState(DAYS)
  const [armDuration, setArmDuration] = useState("1.5s")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    const cycleMs = ANIMATION_TIME * 1000
    const armTimeouts: number[] = []
    const cycleStart = Date.now()

    const scheduleArmAnimation = () => {
      armTimeouts.push(window.setTimeout(() => setArmDuration("1.5s"), 0))
      armTimeouts.push(window.setTimeout(() => setArmDuration("1s"), 4000))
      armTimeouts.push(window.setTimeout(() => setArmDuration("0.7s"), 8000))
      armTimeouts.push(window.setTimeout(() => setArmDuration("0.3s"), 12000))
      armTimeouts.push(window.setTimeout(() => setArmDuration("0.2s"), 15000))
    }

    scheduleArmAnimation()
    const armCycle = window.setInterval(scheduleArmAnimation, cycleMs)

    const ticker = window.setInterval(() => {
      const elapsed = (Date.now() - cycleStart) % cycleMs
      const nextProgress = elapsed / cycleMs
      setProgress(nextProgress)

      const computedDay = DAYS - Math.floor(nextProgress * DAYS)
      setDay(computedDay <= 0 ? DAYS : computedDay)
    }, 90)

    return () => {
      window.clearInterval(ticker)
      window.clearInterval(armCycle)
      armTimeouts.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: reduceMotion ? 0.2 : 0.42, ease: "easeOut" }}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
      onClick={onFinish}
    >
      <div
        className="splash-deadline"
        style={
          {
            ["--animation-time" as string]: `${ANIMATION_TIME}s`,
            ["--arm-duration" as string]: armDuration,
            ["--progress" as string]: String(progress),
          } as React.CSSProperties
        }
      >
        <div
          className="splash-svg"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: DEADLINE_SVG }}
        />

        <div className="deadline-days" aria-live="polite">
          <div className="mask-red">
            <div className="inner">
              Deadline <span className="day">{day}</span> <span className="days">days</span>
            </div>
          </div>
          <div className="mask-white">
            <div className="inner">
              Deadline <span className="day">{day}</span> <span className="days">days</span>
            </div>
          </div>
        </div>

        

        <p className="skip-hint">Click anywhere to continue</p>
      </div>

      <style jsx global>{`
        .splash-deadline {
          width: 760px;
          max-width: calc(100vw - 2.5rem);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateY(7vh);
        }
        .splash-svg {
          width: 581px;
          max-width: 100%;
          height: 158px;
          filter: drop-shadow(0 10px 32px rgba(190, 0, 42, 0.22));
        }
        .splash-svg svg {
          width: 100%;
          display: block;
        }
        .splash-svg #progress-time-fill {
          transform: translateX(calc(-100% + (var(--progress) * 97%)));
        }
        .splash-svg #death-group {
          transform: translateX(calc(var(--progress) * 520px));
        }
        .splash-svg #death-arm {
          animation: splash-move-arm 3s ease infinite;
          transform-origin: -60px 74px;
        }
        .splash-svg #death-tool {
          animation: splash-move-tool 3s ease infinite;
          transform-origin: -48px center;
        }
        .splash-svg #designer-arm-grop {
          animation: splash-write var(--arm-duration) ease infinite;
          transform-origin: 90% top;
        }
        .splash-svg #red-flame {
          opacity: 0;
          animation: splash-show-flames var(--animation-time) ease infinite, splash-red-flame 120ms ease infinite;
          transform-origin: center bottom;
        }
        .splash-svg #yellow-flame {
          opacity: 0;
          animation: splash-show-flames var(--animation-time) ease infinite, splash-yellow-flame 120ms ease infinite;
          transform-origin: center bottom;
        }
        .splash-svg #white-flame {
          opacity: 0;
          animation: splash-show-flames var(--animation-time) ease infinite, splash-red-flame 100ms ease infinite;
          transform-origin: center bottom;
        }

        .deadline-days {
          color: #fff;
          text-align: center;
          width: 180px;
          margin-top: 16px;
          position: relative;
          height: 34px;
          font-family: "Oswald", sans-serif;
          letter-spacing: 0.015em;
        }
        .deadline-days .inner {
          width: 180px;
          position: relative;
          top: 0;
          left: 0;
          font-size: 34px;
          line-height: 1;
        }
        .deadline-days .day {
          font-weight: 700;
        }
        .mask-red,
        .mask-white {
          position: absolute;
          top: 0;
          width: 100%;
          overflow: hidden;
          height: 100%;
        }
        .mask-red {
          left: 0;
          width: 0;
          color: #be002a;
          animation: splash-text-red var(--animation-time) ease infinite;
          z-index: 2;
          background: #000;
        }
        .mask-white {
          right: 0;
        }

        .skip-btn {
          margin-top: 26px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(255, 255, 255, 0.02);
          color: rgba(255, 255, 255, 0.9);
          padding: 7px 16px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .skip-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }
        .skip-hint {
          margin-top: 8px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .splash-deadline {
            transform: translateY(2vh);
          }
          .splash-svg {
            width: 100%;
            height: auto;
          }
          .deadline-days {
            width: 150px;
            margin-top: 10px;
            height: 28px;
          }
          .deadline-days .inner {
            width: 150px;
            font-size: 28px;
          }
        }

        @keyframes splash-move-arm {
          0% {
            transform: rotate(0);
          }
          5% {
            transform: rotate(0);
          }
          9% {
            transform: rotate(40deg);
          }
          80% {
            transform: rotate(0);
          }
        }
        @keyframes splash-move-tool {
          0% {
            transform: rotate(0);
          }
          5% {
            transform: rotate(0);
          }
          9% {
            transform: rotate(50deg);
          }
          80% {
            transform: rotate(0);
          }
        }
        @keyframes splash-write {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1, 1);
          }
          16% {
            transform: translate(0, 0) rotate(5deg) scale(0.8, 1);
          }
          32% {
            transform: translate(0, 0) rotate(0deg) scale(1, 1);
          }
          48% {
            transform: translate(0, 0) rotate(6deg) scale(0.8, 1);
          }
          65% {
            transform: translate(0, 0) rotate(0deg) scale(1, 1);
          }
          83% {
            transform: translate(0, 0) rotate(4deg) scale(0.8, 1);
          }
        }
        @keyframes splash-text-red {
          0% {
            width: 0%;
          }
          100% {
            width: 98%;
          }
        }
        @keyframes splash-show-flames {
          0% {
            opacity: 0;
          }
          74% {
            opacity: 0;
          }
          80% {
            opacity: 1;
          }
          99% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes splash-red-flame {
          0% {
            transform: translateY(-30px) scale(1, 1);
          }
          25% {
            transform: translateY(-30px) scale(1.1, 1.1);
          }
          75% {
            transform: translateY(-30px) scale(0.8, 0.7);
          }
          100% {
            transform: translateY(-30px) scale(1, 1);
          }
        }
        @keyframes splash-yellow-flame {
          0% {
            transform: translateY(-30px) scale(0.8, 0.7);
          }
          50% {
            transform: translateY(-30px) scale(1.1, 1.2);
          }
          100% {
            transform: translateY(-30px) scale(1, 1);
          }
        }
      `}</style>
    </motion.div>
  )
}
