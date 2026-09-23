import { motion } from 'framer-motion'
import { MEMORY_CONFIG, WEDDING_CONFIG } from '../types'

export default function FinalScene() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-ink px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        dir="ltr"
        className="max-w-xs font-display text-xs tracking-widest2 text-paper/50 sm:text-sm"
      >
        {MEMORY_CONFIG.finalKickerEn}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="font-arabic text-5xl text-paper sm:text-7xl"
      >
        {WEDDING_CONFIG.groomName} & {WEDDING_CONFIG.brideName}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        dir="ltr"
        className="font-display text-sm tracking-widest2 text-accent"
      >
        {WEDDING_CONFIG.dateNumeric}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-6 font-arabic text-3xl leading-relaxed text-paper sm:text-4xl"
      >
        {MEMORY_CONFIG.finalLineAr}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="font-arabic text-base text-paper/60 sm:text-lg"
      >
        {MEMORY_CONFIG.finalThanksAr}
      </motion.p>
    </section>
  )
}
