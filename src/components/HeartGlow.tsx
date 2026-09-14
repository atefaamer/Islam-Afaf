interface HeartGlowProps {
  className?: string
  opacity?: number
  color?: string // as "r,g,b"
}

const HEART_PATH =
  'M50 88 C20 65, 0 45, 0 25 C0 10, 15 0, 30 0 C40 0, 48 8, 50 20 ' +
  'C52 8, 60 0, 70 0 C85 0, 100 10, 100 25 C100 45, 80 65, 50 88 Z'

/**
 * A soft, blurred heart-shaped glow used behind key text moments (names,
 * the verse). Blurred enough to read as gentle ambient light rather than a
 * literal heart icon, while still being recognizably heart-shaped. Color
 * is configurable so different sections can break from the default gold.
 */
export default function HeartGlow({ className = '', opacity = 0.2, color = '15,63,46' }: HeartGlowProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ filter: 'blur(28px)', overflow: 'visible' }}
      aria-hidden="true"
    >
      <path d={HEART_PATH} fill={`rgba(${color},${opacity})`} />
    </svg>
  )
}