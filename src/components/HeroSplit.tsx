import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { WEDDING_CONFIG } from '../types'

export default function HeroSplit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 0 -> 0.45: names sit together, forming the hero composition.
  // 0.45 -> 1: names slide apart, opening a window between them.
  const islamX = useTransform(scrollYProgress, [0.4, 0.95], ['0vw', '-38vw'])
  const afafX = useTransform(scrollYProgress, [0.4, 0.95], ['0vw', '38vw'])
  const heroMetaOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 1, 0])
  const chapterOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1])
  const chapterY = useTransform(scrollYProgress, [0.55, 0.85], [16, 0])

  return (
    <section ref={containerRef} className="relative h-[230vh]">
      <div className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[65vw] w-[65vw] max-h-[650px] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(185,144,95,0.12) 0%, rgba(185,144,95,0) 70%)' }}
        />

        <motion.h1
          style={{ x: islamX }}
          className="font-arabic text-[19vw] leading-[0.95] text-paper sm:text-[15vw]"
        >
          {WEDDING_CONFIG.groomName}
        </motion.h1>

        <motion.h1
          style={{ x: afafX }}
          className="font-arabic text-[19vw] leading-[0.95] text-paper sm:text-[15vw]"
        >
          {WEDDING_CONFIG.brideName}
        </motion.h1>

        {/* Hero meta: date + venue, visible only in the initial composed state */}
        <motion.div
          style={{ opacity: heroMetaOpacity }}
          dir="ltr"
          className="pointer-events-none absolute inset-x-0 bottom-16 flex flex-col items-center gap-3 sm:bottom-20"
        >
          <p className="font-display text-xs tracking-widest2 text-accent-light">
            {WEDDING_CONFIG.dateFull} / {WEDDING_CONFIG.yearShort}
          </p>
          <p className="font-display text-[10px] tracking-widest2 text-paper/40">
            {WEDDING_CONFIG.venueName}
          </p>
        </motion.div>

        {/* Revealed inside the widening gap between the names */}
        <motion.div
          style={{ opacity: chapterOpacity, y: chapterY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4"
        >
          <p className="font-display text-[11px] tracking-widest2 text-paper/60" dir="ltr">
            A NEW CHAPTER
          </p>
          <p className="font-display text-2xl text-accent sm:text-3xl" dir="ltr">
            {WEDDING_CONFIG.dateNumeric}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
