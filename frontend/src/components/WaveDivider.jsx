import { useEffect, useRef } from 'react'

const WIDTH = 1287
const WAVE_CENTER = 30
const SVG_HEIGHT = 120
const POINTS = 200
const SPEED1 = 0.0002
const SPEED2 = 0.0006
const AMPLITUDE = 20
const FREQUENCY = 3
const GAP = 6

// Gradient stops matching App.jsx: #060B44 → #040933
const TOP_COLOR = [6, 11, 68]
const BOT_COLOR = [4, 9, 51]

function lerpColor(a, b, t) {
  const r = Math.round(a[0] + (b[0] - a[0]) * t)
  const g = Math.round(a[1] + (b[1] - a[1]) * t)
  const bl = Math.round(a[2] + (b[2] - a[2]) * t)
  return `rgb(${r},${g},${bl})`
}

function waveY(i, t, phase) {
  const normalized = i / POINTS
  return WAVE_CENTER + Math.sin(normalized * Math.PI * FREQUENCY + t + phase) * AMPLITUDE
}

function generateFill(t, phase) {
  let d = ''
  for (let i = 0; i <= POINTS; i++) {
    const x = (i / POINTS) * WIDTH
    const y = waveY(i, t, phase) - GAP
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(2)} `
  }
  d += `L${WIDTH} ${SVG_HEIGHT} L0 ${SVG_HEIGHT} Z`
  return d
}

function generateLine(t, phase, offset) {
  let d = ''
  for (let i = 0; i <= POINTS; i++) {
    const x = (i / POINTS) * WIDTH
    const y = waveY(i, t, phase) + offset
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(2)} `
  }
  return d
}

export default function WaveDivider() {
  const fill1Ref = useRef(null)
  const fill2Ref = useRef(null)
  const top1Ref = useRef(null)
  const bot1Ref = useRef(null)
  const top2Ref = useRef(null)
  const bot2Ref = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    let animationId

    const updateFillColor = () => {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const pageHeight = document.documentElement.scrollHeight
      const elemTop = rect.top + window.scrollY
      const t = Math.min(Math.max(elemTop / pageHeight, 0), 1)
      const color = lerpColor(TOP_COLOR, BOT_COLOR, t)
      fill1Ref.current?.setAttribute('fill', color)
      fill2Ref.current?.setAttribute('fill', color)
    }

    const animate = (time) => {
      const t1 = time * SPEED1
      const t2 = time * SPEED2
      if (fill1Ref.current) fill1Ref.current.setAttribute('d', generateFill(t1, 0))
      if (top1Ref.current) top1Ref.current.setAttribute('d', generateLine(t1, 0, -GAP))
      if (bot1Ref.current) bot1Ref.current.setAttribute('d', generateLine(t1, 0, GAP))
      if (fill2Ref.current) fill2Ref.current.setAttribute('d', generateFill(t2, Math.PI))
      if (top2Ref.current) top2Ref.current.setAttribute('d', generateLine(t2, Math.PI, -GAP))
      if (bot2Ref.current) bot2Ref.current.setAttribute('d', generateLine(t2, Math.PI, GAP))
      updateFillColor()
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div ref={wrapperRef} className="relative w-full h-16 -mt-16">
      <svg
        className="absolute left-0 w-full h-full"
        viewBox={`0 0 ${WIDTH} ${SVG_HEIGHT}`}
        fill="none"
        preserveAspectRatio="none"
      >
        <path ref={fill1Ref} />
        <path ref={top1Ref} stroke="var(--color-primary)" strokeWidth="2" fill="none" />
        <path ref={bot1Ref} stroke="var(--color-primary)" strokeWidth="2" fill="none" />
        <path ref={fill2Ref} />
        <path ref={top2Ref} stroke="var(--color-primary)" strokeWidth="2" fill="none" />
        <path ref={bot2Ref} stroke="var(--color-primary)" strokeWidth="2" fill="none" />
      </svg>
    </div>
  )
}
