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

function waveY(i, t, phase) {
  const normalized = i / POINTS
  return WAVE_CENTER + Math.sin(normalized * Math.PI * FREQUENCY + t + phase) * AMPLITUDE
}

function generateFill(t, phase) {
  let d = ''
  // Top edge of ribbon
  for (let i = 0; i <= POINTS; i++) {
    const x = (i / POINTS) * WIDTH
    const y = waveY(i, t, phase) - GAP
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(2)} `
  }
  // Extend to bottom-right, bottom-left, close
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

  useEffect(() => {
    let animationId
    const animate = (time) => {
      const t1 = time * SPEED1
      const t2 = time * SPEED2
      if (fill1Ref.current) fill1Ref.current.setAttribute('d', generateFill(t1, 0))
      if (top1Ref.current) top1Ref.current.setAttribute('d', generateLine(t1, 0, -GAP))
      if (bot1Ref.current) bot1Ref.current.setAttribute('d', generateLine(t1, 0, GAP))
      if (fill2Ref.current) fill2Ref.current.setAttribute('d', generateFill(t2, Math.PI))
      if (top2Ref.current) top2Ref.current.setAttribute('d', generateLine(t2, Math.PI, -GAP))
      if (bot2Ref.current) bot2Ref.current.setAttribute('d', generateLine(t2, Math.PI, GAP))
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="relative w-full h-16 -mt-16">
      <svg
        className="absolute left-0 w-full h-full"
        viewBox={`0 0 ${WIDTH} ${SVG_HEIGHT}`}
        fill="none"
        preserveAspectRatio="none"
      >
        <path ref={fill1Ref} fill="var(--color-background)" />
        <path ref={top1Ref} stroke="var(--color-primary)" strokeWidth="2" fill="none" />
        <path ref={bot1Ref} stroke="var(--color-primary)" strokeWidth="2" fill="none" />
        <path ref={fill2Ref} fill="var(--color-background)" />
        <path ref={top2Ref} stroke="var(--color-primary)" strokeWidth="2" fill="none" />
        <path ref={bot2Ref} stroke="var(--color-primary)" strokeWidth="2" fill="none" />
      </svg>
    </div>
  )
}
