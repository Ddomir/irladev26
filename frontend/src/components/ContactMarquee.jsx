import { useRef, useEffect, useCallback } from 'react'
import { Instagram, Linkedin, Github, Mail } from 'lucide-react'

const LINKS = [
  { label: 'Instagram', url: 'https://www.instagram.com/irladom/', icon: Instagram },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/dominic-irla/', icon: Linkedin },
  { label: 'GitHub', url: 'https://github.com/Ddomir', icon: Github },
  { label: 'Email', url: 'mailto:irladominic@gmail.com', icon: Mail },
]

const ITEMS = [...LINKS, ...LINKS, ...LINKS, ...LINKS, ...LINKS, ...LINKS, ...LINKS, ...LINKS, ...LINKS, ...LINKS]

const SPEED = 0.5
const BASE_PX = 24
const MAX_EXTRA_PX = 32
const INFLUENCE_RADIUS = 200
const LERP_SPEED = 0.08

export default function ContactMarquee() {
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const pillRefs = useRef([])

  const pillExtras = useRef([])

  const animate = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    offsetRef.current -= SPEED

    const halfWidth = track.scrollWidth / 2
    if (Math.abs(offsetRef.current) >= halfWidth) {
      offsetRef.current += halfWidth
    }

    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`

    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    pillRefs.current.forEach((pill, i) => {
      if (!pill) return

      if (pillExtras.current[i] === undefined) pillExtras.current[i] = 0

      const rect = pill.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2)

      let target = 0
      if (dist < INFLUENCE_RADIUS) {
        const t = 1 - dist / INFLUENCE_RADIUS
        target = MAX_EXTRA_PX * (t * t * (3 - 2 * t))
      }

      pillExtras.current[i] += (target - pillExtras.current[i]) * LERP_SPEED

      if (pillExtras.current[i] < 0.1) pillExtras.current[i] = 0

      const px = BASE_PX + pillExtras.current[i]
      pill.style.paddingLeft = `${px}px`
      pill.style.paddingRight = `${px}px`
    })

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  const handleMouseMove = (e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 }
  }

  return (
    <div
      className="w-screen overflow-hidden pt-0 pb-16 -ml-[calc((100vw-100%)/2)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="flex gap-3 w-max" style={{ willChange: 'transform' }}>
        {ITEMS.map((item, i) => {
          const Icon = item.icon
          return (
            <a
              key={i}
              ref={(el) => (pillRefs.current[i] = el)}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 py-3 rounded-full bg-primary text-background font-semibold text-sm whitespace-nowrap hover:no-underline"
              style={{ paddingLeft: `${BASE_PX}px`, paddingRight: `${BASE_PX}px`, willChange: 'padding' }}
            >
              <Icon size={18} strokeWidth={2.5} />
              {item.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}
