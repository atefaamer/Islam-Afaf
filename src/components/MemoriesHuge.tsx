import { AnimatePresence, motion } from 'framer-motion'
import { useTimeSince } from '../hooks/useTimeSince'
import { MEMORY_CONFIG, WEDDING_CONFIG } from '../types'

/**
 * كان العدّ التنازلي للفرح — بقى عدّاد بيعدّ *من* يوم الفرح:
 * رقم واحد ضخم = عدد الأيام اللي بقالهم مع بعض.
 * (لو التاريخ لسه مجاش، بيتصرّف تلقائياً كعدّ تنازلي زي الأول.)
 */
export default function MemoriesHuge() {
  const time = useTimeSince(WEDDING_CONFIG.isoDateTime)
  const dayCount = time.totalDays
  const isFuture = time.isFuture

  const arabicLine = isFuture
    ? MEMORY_CONFIG.untilDaysAr.replace('{n}', String(dayCount))
    : dayCount === 0
    ? MEMORY_CONFIG.sinceDaysZeroAr
    : dayCount === 1
    ? MEMORY_CONFIG.sinceDaysOneAr
    : MEMORY_CONFIG.sinceDaysAr.replace('{n}', String(dayCount))

  // الرقم بيكبر مع الوقت — بنصغّر الخط أوتوماتيك كل ما يزيد عدد الأرقام
  const sizeClass = isFuture
    ? 'text-[38vw] sm:text-[22vw]'
    : dayCount >= 1000
    ? 'text-[16vw] sm:text-[10vw]'
    : dayCount >= 100
    ? 'text-[24vw] sm:text-[14vw]'
    : 'text-[34vw] sm:text-[19vw]'

  return (
    <section className="relative flex h-[100svh] flex-col items-center justify-center bg-ink px-6 text-center">
      <p dir="ltr" className="mb-2 font-display text-[10px] tracking-widest2 text-paper/40">
        {isFuture ? MEMORY_CONFIG.untilKickerEn : MEMORY_CONFIG.sinceKickerEn}{' '}
        {WEDDING_CONFIG.dateShort}.20{WEDDING_CONFIG.yearShort}
      </p>

      <AnimatePresence mode="popLayout">
        <motion.span
          key={dayCount}
          dir="ltr"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`${sizeClass} font-display leading-none text-paper`}
        >
          {dayCount}
        </motion.span>
      </AnimatePresence>

      <p dir="ltr" className="mt-3 font-display text-sm tracking-widest2 text-accent sm:text-base">
        {isFuture ? MEMORY_CONFIG.untilLabelEn : MEMORY_CONFIG.daysLabelEn}
      </p>

      <p className="mt-6 font-arabic text-2xl text-paper sm:text-3xl">{arabicLine}</p>

      {/* Small H:M:S — least prominent line, tucked at the very bottom */}
      <p dir="ltr" className="mt-6 font-display text-[11px] tracking-wider text-paper/30">
        {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:
        {String(time.seconds).padStart(2, '0')}
      </p>
      <p className="mt-1 font-body text-[10px] text-paper/20">ساعة : دقيقة : ثانية</p>
    </section>
  )
}
