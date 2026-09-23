import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY } from '../data/gallery'
import { MEMORY_CONFIG } from '../types'

/**
 * ألبوم صور الذكرى — الصور بتظهر بالتدريج مع السكرول،
 * والضغط على أي صورة بيفتحها كبيرة (مع أسهم للتنقل).
 * لإضافة صور: public/photos/ + src/data/gallery.ts
 */
export default function MemoryGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback((dir: number) => {
    setOpenIndex((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length))
  }, [])

  // Esc يقفل، والأسهم تنقّل بين الصور
  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(-1)
      if (e.key === 'ArrowLeft') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, close, step])

  const current = openIndex === null ? null : GALLERY[openIndex]
  const currentIsArabic = current ? /[\u0600-\u06FF]/.test(current.caption) : false
  const introIsArabic = /[\u0600-\u06FF]/.test(MEMORY_CONFIG.galleryIntro)

  return (
    <section className="relative bg-ink px-6 py-28 sm:px-16 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          dir="ltr"
          className="text-center font-display text-xs tracking-widest2 text-accent"
        >
          {MEMORY_CONFIG.galleryKickerEn}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 text-center font-arabic text-4xl text-paper sm:text-6xl"
        >
          {MEMORY_CONFIG.galleryTitleAr}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          dir={introIsArabic ? 'rtl' : 'ltr'}
          className={
            introIsArabic
              ? 'mx-auto mt-5 max-w-md text-center font-body text-sm leading-relaxed text-paper/50'
              : 'mx-auto mt-5 max-w-md text-center font-display text-xs tracking-[0.25em] leading-loose text-paper/50'
          }
        >
          {MEMORY_CONFIG.galleryIntro}
        </motion.p>

        {/* Masonry عبر CSS columns — كل صورة بتحفظ نسبها الطبيعية */}
        <div className="mt-16 columns-1 gap-8 sm:columns-2">
          {GALLERY.map((photo, i) => {
            const isArabic = /[\u0600-\u06FF]/.test(photo.caption)
            return (
              <motion.figure
                key={`${photo.caption}-${i}`}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, delay: (i % 2) * 0.12 }}
                className="mb-10 break-inside-avoid"
              >
                {photo.src ? (
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    data-cursor-hover
                    aria-label={`تكبير صورة: ${photo.caption}`}
                    className="group block w-full overflow-hidden bg-ink"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt ?? photo.caption}
                      loading="lazy"
                      className="w-full scale-[1.01] object-cover opacity-90 transition duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:opacity-100"
                      style={{ filter: 'saturate(0.8) sepia(0.12)' }}
                    />
                  </button>
                ) : (
                  /* براواز فاضي محجوز للصورة — لحد ما الصور توصل */
                  <div
                    aria-label={photo.alt ?? photo.caption}
                    className="aspect-[4/5] w-full border border-paper/10 bg-paper/[0.02]"
                  />
                )}
                <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-paper/10 pt-3">
                  <span
                    dir={isArabic ? 'rtl' : 'ltr'}
                    className={
                      isArabic
                        ? 'font-arabic text-lg text-paper/90'
                        : 'font-display text-sm tracking-[0.2em] text-paper/90'
                    }
                  >
                    {photo.caption}
                  </span>
                  {photo.sub && (
                    <span dir="ltr" className="shrink-0 font-display text-[10px] tracking-widest2 text-accent">
                      {photo.sub}
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            )
          })}
        </div>

      </div>

      {/* الصورة كبيرة */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-ink/95 px-4 py-16"
          >
            {/* خلفية للإغلاق بالضغط في أي مكان فاضي */}
            <button
              type="button"
              aria-label="إغلاق"
              onClick={close}
              className="absolute inset-0 h-full w-full cursor-default"
              tabIndex={-1}
            />

            <button
              type="button"
              onClick={close}
              data-cursor-hover
              aria-label="إغلاق"
              className="absolute right-5 top-5 z-10 text-paper/50 transition-colors hover:text-accent"
            >
              <X size={22} />
            </button>

            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt ?? current.caption}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="relative z-[1] max-h-[72vh] w-auto max-w-full object-contain shadow-2xl"
            />

            <p
              dir={currentIsArabic ? 'rtl' : 'ltr'}
              className={
                currentIsArabic
                  ? 'relative z-[1] mt-6 font-arabic text-xl text-paper sm:text-2xl'
                  : 'relative z-[1] mt-6 font-display text-lg tracking-[0.2em] text-paper sm:text-xl'
              }
            >
              {current.caption}
            </p>
            <p dir="ltr" className="relative z-[1] mt-2 font-display text-[10px] tracking-widest2 text-accent">
              {(openIndex ?? 0) + 1} / {GALLERY.length}
            </p>

            <div className="relative z-[1] mt-6 flex items-center gap-8">
              <button
                type="button"
                onClick={() => step(-1)}
                data-cursor-hover
                aria-label="الصورة السابقة"
                className="text-paper/50 transition-colors hover:text-accent"
              >
                <ChevronRight size={26} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                data-cursor-hover
                aria-label="الصورة التالية"
                className="text-paper/50 transition-colors hover:text-accent"
              >
                <ChevronLeft size={26} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
