import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { WEDDING_CONFIG } from '../types'

export default function LocationInteractive() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const cityOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0])
  const cityScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.15])
  const mapOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const venueOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1])
  const venueY = useTransform(scrollYProgress, [0.55, 0.75], [16, 0])
  const btnOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1])

  return (
    <section ref={containerRef} id="location" className="relative h-[260vh] bg-ink">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <motion.div style={{ opacity: mapOpacity }} className="absolute inset-0">
          <iframe
            title="موقع قاعة الحفل"
            src={WEDDING_CONFIG.mapsEmbedSrc}
            className="h-full w-full"
            style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(0.9) brightness(0.9)' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-0 bg-ink/35" />
        </motion.div>

        <motion.h2
          style={{ opacity: cityOpacity, scale: cityScale }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-arabic text-7xl text-paper sm:text-9xl"
        >
          {WEDDING_CONFIG.cityName}
        </motion.h2>

        <motion.div
          style={{ opacity: venueOpacity, y: venueY }}
          dir="ltr"
          className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-6"
        >
          <p className="font-display text-3xl tracking-wide text-paper sm:text-5xl">
            {WEDDING_CONFIG.venueName}
          </p>
          <p dir="rtl" className="-mt-4 font-body text-sm text-paper/50">
            {WEDDING_CONFIG.venueNameArabic}
          </p>
          <p dir="rtl" className="font-arabic text-base text-accent-light">
            {WEDDING_CONFIG.dateArabic} — {WEDDING_CONFIG.timeArabic}
          </p>
          {/* Solid, unmistakably-clickable button — not a faint outline */}
          <motion.a
            style={{ opacity: btnOpacity }}
            href={WEDDING_CONFIG.mapsUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="pointer-events-auto flex items-center gap-2 bg-accent px-6 py-3 font-display text-xs font-bold tracking-widest2 text-ink transition-opacity hover:opacity-85"
          >
            TAKE ME THERE <ArrowRight size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
