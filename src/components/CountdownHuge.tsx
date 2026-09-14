import { AnimatePresence, motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'
import { WEDDING_CONFIG } from '../types'

export default function CountdownHuge() {
  const time = useCountdown(WEDDING_CONFIG.isoDateTime)

  return (
    <section className="relative flex h-[100svh] flex-col items-center justify-center bg-ink px-6 text-center">
      {time.isComplete ? (
        <>
          <span className="font-arabic text-[26vw] leading-none text-paper sm:text-[14vw]">اليوم</span>
          <p dir="ltr" className="mt-4 font-display text-xs tracking-widest2 text-accent">
            {WEDDING_CONFIG.dateShort}
          </p>
        </>
      ) : (
        <>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={time.days}
              dir="ltr"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-display text-[38vw] leading-none text-paper sm:text-[22vw]"
            >
              {time.days}
            </motion.span>
          </AnimatePresence>
          <p dir="ltr" className="mt-2 font-display text-sm tracking-widest2 text-accent sm:text-base">
            DAYS
          </p>

          <p dir="ltr" className="mt-6 font-display text-xs tracking-widest2 text-paper/40">
            UNTIL {WEDDING_CONFIG.dateShort}
          </p>

          {/* Small H:M:S — least prominent line, tucked at the very bottom */}
          <p dir="ltr" className="mt-3 font-display text-[11px] tracking-wider text-paper/30">
            {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:
            {String(time.seconds).padStart(2, '0')}
          </p>
        </>
      )}
    </section>
  )
}
