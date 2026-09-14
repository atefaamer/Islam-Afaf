import { motion } from 'framer-motion'
import { WEDDING_CONFIG } from '../types'

function Row({
  label,
  value,
  sub,
  delay,
}: {
  label: string
  value: string
  sub?: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay }}
      className="border-t border-paper/15 py-10 sm:py-14"
    >
      <p dir="ltr" className="font-display text-xs tracking-widest2 text-accent">
        {label}
      </p>
      <p dir="ltr" className="mt-4 font-display text-4xl leading-tight text-paper sm:text-6xl">
        {value}
      </p>
      {sub && <p className="mt-2 font-body text-sm text-paper/40">{sub}</p>}
    </motion.div>
  )
}

export default function InfoEditorial() {
  return (
    <section className="relative min-h-screen bg-ink px-6 py-28 sm:px-16 sm:py-40">
      <div className="mx-auto max-w-3xl">
        <Row
          label="WHEN"
          value={`${WEDDING_CONFIG.dateFull} 20${WEDDING_CONFIG.yearShort}`}
          sub={WEDDING_CONFIG.dateArabic}
          delay={0}
        />
        <Row label="AT" value={WEDDING_CONFIG.timeLabel} sub={WEDDING_CONFIG.timeArabic} delay={0.1} />
        {/* WHERE — plain, no button (the button lives on the map page only) */}
        <Row
          label="WHERE"
          value={WEDDING_CONFIG.venueName}
          sub={`${WEDDING_CONFIG.cityName} — ${WEDDING_CONFIG.venueNameArabic}`}
          delay={0.2}
        />
        <div className="border-t border-paper/15" />
      </div>
    </section>
  )
}
