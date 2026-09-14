import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 28, stiffness: 400, mass: 0.4 })
  const springY = useSpring(y, { damping: 28, stiffness: 400, mass: 0.4 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setIsFinePointer(mq.matches)
    const onChange = () => setIsFinePointer(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (!isFinePointer) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
      const target = e.target as HTMLElement
      setExpanded(!!target.closest('a, button, [role="button"], input, textarea, [data-cursor-hover]'))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinePointer, visible])

  if (!isFinePointer) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background: '#F6F1E5',
      }}
      animate={{
        width: expanded ? 44 : 8,
        height: expanded ? 44 : 8,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    />
  )
}
