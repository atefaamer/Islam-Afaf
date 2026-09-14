import { motion } from 'framer-motion'
import { WEDDING_CONFIG } from '../types'

export default function VerseScene() {
  return (
    <section className="relative flex min-h-[30vh] flex-col items-center justify-center bg-ink px-6 py-10 text-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        className="max-w-md font-arabic text-xl leading-[1.9] text-paper sm:max-w-xl sm:text-3xl sm:leading-[1.9]"
      >
        {WEDDING_CONFIG.verseText}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 font-arabic text-sm tracking-[0.15em] text-accent"
      >
        {WEDDING_CONFIG.verseRef}
      </motion.p>
    </section>
  )
}
