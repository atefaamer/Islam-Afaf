import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { WEDDING_CONFIG } from '../types'

interface StepProps {
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number, number, number]
  children: React.ReactNode
  className?: string
}

function Step({ progress, range, children, className = '' }: StepProps) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0])
  const y = useTransform(progress, range, [24, 0, 0, -24])
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function DateMorph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <Step progress={scrollYProgress} range={[0, 0.06, 0.16, 0.24]}>
          <span dir="ltr" className="font-display text-[28vw] leading-none text-paper sm:text-[16vw]">
            21
          </span>
        </Step>

        <Step progress={scrollYProgress} range={[0.2, 0.3, 0.42, 0.5]}>
          <span dir="ltr" className="font-display text-[13vw] leading-none tracking-tight text-paper sm:text-8xl">
            {WEDDING_CONFIG.dateFull}
          </span>
          <span className="mt-4 font-body text-sm text-paper/40">{WEDDING_CONFIG.dateArabic}</span>
        </Step>

        <Step progress={scrollYProgress} range={[0.46, 0.56, 0.68, 0.76]}>
          <span dir="ltr" className="font-display text-[16vw] leading-none text-accent sm:text-9xl">
            {WEDDING_CONFIG.timeLabel}
          </span>
          <span className="mt-4 font-body text-sm text-paper/50">{WEDDING_CONFIG.timeArabic}</span>
        </Step>

        <Step progress={scrollYProgress} range={[0.72, 0.82, 0.94, 1]}>
          <span dir="ltr" className="font-display text-[10vw] leading-none tracking-wide text-paper sm:text-7xl">
            {WEDDING_CONFIG.venueName}
          </span>
          <span className="mt-4 font-body text-sm text-paper/40">{WEDDING_CONFIG.venueNameArabic}</span>
        </Step>
      </div>
    </section>
  )
}
