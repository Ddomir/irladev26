import { useEffect, useRef, useState } from 'react'

const DASH_LENGTH = 1500
const LETTER_PROXIMITY = 300
const MAX_SCALE_X = 1.4
const SCALE_EASE = 0.08
const MD = 768
const LETTERS = 'DOMINIC'.split('')

export default function HeroTitle() {
  const [animate, setAnimate] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= MD)
  const letterRefs = useRef([])
  const letterScales = useRef(LETTERS.map(() => 1))
  const letterTargets = useRef(LETTERS.map(() => 1))
  const letterRaf = useRef(null)

  useEffect(() => {
    requestAnimationFrame(() => setAnimate(true))
    const handleResize = () => setIsDesktop(window.innerWidth >= MD)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const handleMouse = (e) => {
      letterRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < LETTER_PROXIMITY) {
          const falloff = 1 - dist / LETTER_PROXIMITY
          letterTargets.current[i] = 1 + (MAX_SCALE_X - 1) * falloff
        } else {
          letterTargets.current[i] = 1
        }
      })
    }

    const tick = () => {
      letterRefs.current.forEach((el, i) => {
        if (!el) return
        letterScales.current[i] += (letterTargets.current[i] - letterScales.current[i]) * SCALE_EASE
        el.style.transform = `scaleX(${letterScales.current[i].toFixed(3)})`
      })
      letterRaf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouse)
    letterRaf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(letterRaf.current)
      letterRefs.current.forEach((el) => {
        if (el) el.style.transform = ''
      })
      letterScales.current = LETTERS.map(() => 1)
      letterTargets.current = LETTERS.map(() => 1)
    }
  }, [isDesktop])

  return (
    <div className="relative flex items-center justify-center p-10 -mt-10">
      <h1 className="font-literata text-6xl md:text-9xl text-primary z-2 flex">
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            ref={(el) => (letterRefs.current[i] = el)}
            className="inline-block"
            style={{
              letterSpacing: animate ? '0em' : '0.5em',
              opacity: animate ? 1 : 0,
              transition: 'letter-spacing 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1s cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform',
            }}
          >
            {letter}
          </span>
        ))}
      </h1>
      <svg
        className="absolute translate-y-3 pointer-events-none z-1 w-100 h-40 md:w-170 md:h-60"
        viewBox="0 0 500 200"
        style={{ overflow: 'visible' }}
      >
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="font-mrdafoe"
          pathLength={DASH_LENGTH}
          style={{
            fontSize: '200px',
            fill: 'none',
            stroke: 'var(--color-primary)',
            strokeWidth: 1,
            strokeDasharray: DASH_LENGTH,
            strokeDashoffset: animate ? 0 : -DASH_LENGTH,
            transition: 'stroke-dashoffset 3s cubic-bezier(0.22, 1, 0.36, 1) 0.5s',
          }}
        >
          Irla
        </text>
      </svg>
    </div>
  )
}
