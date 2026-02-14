import { useEffect, useRef, useState } from 'react'

const MAGNETIC_STRENGTH = 0.05
const SPRING_EASE = 0.06
const PROXIMITY = 400
const MD_BREAKPOINT = 768

function SixPointStar({ className, size = 68, style }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 68 68" fill="none">
      <path d="M39.4476 27.6167L39.383 28.2313L39.9979 28.1666L64.518 25.578L41.9882 35.597L41.4236 35.8481L41.7871 36.3479L56.2891 56.2885L36.3481 41.7876L35.848 41.4241L35.5966 41.9887L25.5791 64.5161L28.1673 39.998L28.2319 39.3834L27.617 39.4481L3.09622 42.0356L25.6267 32.0177L26.1914 31.7666L25.8279 31.2668L11.3251 11.325L31.2668 25.8271L31.7669 26.1906L32.0183 25.6261L42.0361 3.0977L39.4476 27.6167Z" stroke="var(--color-secondary)" />
    </svg>
  )
}

function FourPointStar({ className, size = 48, style }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d={`M24 0L27 21L48 24L27 27L24 48L21 27L0 24L21 21Z`} stroke="var(--color-secondary)" strokeWidth="1" fill="none" />
    </svg>
  )
}

const STAR_CONFIG = [
  // Card 0: 6-point TL, 4-point BR
  [
    { Star: SixPointStar, position: '-top-6 -left-6', size: 52, rotate: 15 },
    { Star: FourPointStar, position: '-bottom-4 -right-4', size: 36, rotate: -22 },
  ],
  // Card 1: 6-point middle-right edge
  [
    { Star: SixPointStar, position: 'top-1/2 -right-8 -translate-y-1/2', size: 56, rotate: 30 },
  ],
  // Card 2: 4-point BL
  [
    { Star: FourPointStar, position: '-bottom-5 -left-5', size: 40, rotate: 12 },
  ],
  // Card 3: 4-point TR, 4-point BL
  [
    { Star: FourPointStar, position: '-top-4 -right-4', size: 36, rotate: -18 },
    { Star: FourPointStar, position: '-bottom-5 -left-5', size: 40, rotate: 25 },
  ],
]

export default function ExperienceCard({ image, title, description, date, index }) {
  const ref = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const raf = useRef(null)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= MD_BREAKPOINT)
  const reversed = index % 2 !== 0
  const stars = STAR_CONFIG[index] || []

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= MD_BREAKPOINT)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const handleMouse = (e) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < PROXIMITY) {
        const falloff = 1 - dist / PROXIMITY
        target.current = {
          x: dx * MAGNETIC_STRENGTH * falloff,
          y: dy * MAGNETIC_STRENGTH * falloff,
        }
      } else {
        target.current = { x: 0, y: 0 }
      }
    }

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * SPRING_EASE
      pos.current.y += (target.current.y - pos.current.y) * SPRING_EASE
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x.toFixed(2)}px, ${pos.current.y.toFixed(2)}px)`
      }
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouse)
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(raf.current)
      if (ref.current) ref.current.style.transform = ''
      pos.current = { x: 0, y: 0 }
      target.current = { x: 0, y: 0 }
    }
  }, [isDesktop])

  const imageWithStars = (imgClass) => (
    <div className="relative">
      <img
        src={image}
        alt={title}
        className={imgClass}
      />
      {isDesktop && stars.map((s, i) => (
        <s.Star key={i} className={`absolute pointer-events-none ${s.position}`} size={s.size} style={{ transform: `rotate(${s.rotate}deg)` }} />
      ))}
    </div>
  )

  if (!isDesktop) {
    return (
      <div className="flex flex-col items-center text-center gap-4">
        {imageWithStars("w-52 h-52 rounded-2xl object-cover shadow-lg transition-transform duration-300 hover:scale-105")}
        <h3 className="text-primary text-2xl font-semibold">{title}</h3>
        <p className="text-primary text-sm leading-relaxed max-w-xs">{description}</p>
        <p className="text-secondary text-sm font-semibold">{date}</p>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`flex items-center gap-8 ${reversed ? 'flex-row-reverse' : ''}`}
      style={{ willChange: 'transform' }}
    >
      {imageWithStars("w-72 h-72 rounded-2xl object-cover shadow-lg transition-transform duration-300 hover:scale-105")}
      <div className={`max-w-xs ${reversed ? 'text-right' : 'text-left'}`}>
        <h3 className="text-primary text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-primary text-sm leading-relaxed">{description}</p>
        <p className="text-secondary text-sm font-semibold leading-relaxed">{date}</p>
      </div>
    </div>
  )
}
