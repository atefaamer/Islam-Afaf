import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Petal {
  id: number
  left: number // vw percent
  size: number
  delay: number
  duration: number
  drift: number
  rotateStart: number
  color: string
}

// A family of blue tones matching the new palette — variety without clashing.
const COLORS = ['#B9905F', '#8B4A52', '#C79B8E', '#5C7A5E']

/**
 * A sparse, elegant scatter of falling petals, each in one of a small set
 * of blue tones. Fixed to the viewport so it drifts continuously over
 * whatever section is currently in view, across the whole site.
 */
export default function FallingPetals({ count = 10 }: { count?: number }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 10,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 80,
        rotateStart: Math.random() * 360,
        color: COLORS[i % COLORS.length],
      })),
    [count]
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: '-10vh', x: 0, opacity: 0, rotate: p.rotateStart }}
          animate={{
            y: '110vh',
            x: [0, p.drift, 0],
            opacity: [0, 0.6, 0.6, 0],
            rotate: p.rotateStart + 200,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.3,
          }}
        >
          <svg viewBox="0 0 20 26" fill="none">
            <path
              d="M10 1C15 6 19 11 15 18C13 22 7 22 5 18C1 11 5 6 10 1Z"
              fill={p.color}
              fillOpacity="0.75"
            />
            <path d="M10 3V22" stroke="#150F0A" strokeOpacity="0.3" strokeWidth="0.5" />
          </svg>
        </motion.span>
      ))}
    </div>
  )
}
