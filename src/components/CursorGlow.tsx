import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [isFinePointer, setIsFinePointer] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 40, stiffness: 90, mass: 0.6 })
  const springY = useSpring(y, { damping: 40, stiffness: 90, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setIsFinePointer(mq.matches)
    const onChange = () => setIsFinePointer(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (!isFinePointer) return
    x.set(window.innerWidth / 2)
    y.set(window.innerHeight / 2)
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinePointer])

  if (!isFinePointer) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[52vw] w-[52vw] max-h-[700px] max-w-[700px] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(185,144,95,0.16) 0%, rgba(185,144,95,0) 70%)',
      }}
    />
  )
}
