import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ImagePanelProps {
  src: string
  number: string
  label: string
}

export default function ImagePanel({ src, number, label }: ImagePanelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.35, 1])
  const blur = useTransform(scrollYProgress, [0, 1], [14, 0])
  const brightness = useTransform(scrollYProgress, [0, 1], [0.35, 0.85])
  const filter = useTransform(
    [blur, brightness],
    ([b, br]) => `blur(${b}px) brightness(${br}) saturate(0.55) sepia(0.18)`
  )
  const textOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1])
  const textY = useTransform(scrollYProgress, [0.5, 1], [24, 0])

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.img
        src={src}
        alt={label}
        loading="lazy"
        style={{ scale, filter }}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/20" />
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute bottom-14 left-0 right-0 flex flex-col items-center gap-2 px-6 text-center sm:bottom-20"
      >
        <span className="font-display text-xs tracking-widest2 text-accent" dir="ltr">
          {number}
        </span>
        <span className="font-display text-2xl tracking-wide text-paper sm:text-3xl" dir="ltr">
          {label}
        </span>
      </motion.div>
    </div>
  )
}
