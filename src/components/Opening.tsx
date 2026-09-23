import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MEMORY_CONFIG, WEDDING_CONFIG } from '../types'

type Phase = 'digits' | 'distort' | 'done'

interface OpeningProps {
  onComplete: () => void
  onFirstSound?: () => void
}

const DURATIONS: Record<Phase, number> = {
  digits: 1100,
  distort: 750,
  done: 0,
}

/**
 * الافتتاحية المختصرة — بناءً على طلب العريس:
 * التاريخ 21.09 بس (ظهور هادي ثم الـ glitch الخفيف زي ما كان) وتحتة سطر
 * إنجليزي صغير بيظهر بهدوء (من MEMORY_CONFIG.openingLineEn في types.ts)،
 * وبعدها الموقع يفتح مباشرة على مشهد الاسمين.
 * التسلسل القديم (إسلام ← ∞ ← عفاف) اتشال — موجود في تاريخ الجيت لو رجعته.
 */
export default function Opening({ onComplete }: OpeningProps) {
  const [phase, setPhase] = useState<Phase>('digits')

  useEffect(() => {
    const order: Phase[] = ['digits', 'distort', 'done']
    const index = order.indexOf(phase)
    if (phase === 'done') {
      const t = setTimeout(onComplete, 500)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase(order[index + 1]), DURATIONS[phase])
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-h-[600px] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(185,144,95,0.14) 0%, rgba(185,144,95,0) 70%)' }}
          />
          <div className="relative flex flex-col items-center gap-5">
            <motion.p
              dir="ltr"
              initial={{ opacity: 0 }}
              animate={
                phase === 'distort'
                  ? { opacity: 1, x: [0, -3, 4, -2, 1, 0], skewX: [0, 3, -4, 2, 0] }
                  : { opacity: 1 }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: phase === 'distort' ? 0.7 : 0.5 }}
              className="font-display text-sm tracking-widest2 text-paper/70"
            >
              {WEDDING_CONFIG.dateShort}
            </motion.p>

            {/* السطر البسيط تحت التاريخ — يظهر بهدوء بعد لحظة ويمشي مع الشاشة */}
            <motion.p
              dir="ltr"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-display text-[11px] tracking-[0.25em] text-paper/60 sm:text-xs"
            >
              {MEMORY_CONFIG.openingLineEn}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
