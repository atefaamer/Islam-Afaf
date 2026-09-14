import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WEDDING_CONFIG } from '../types'

export default function SecretTrigger() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-cursor-hover
        aria-label="؟"
        className="fixed bottom-6 right-6 z-50 font-display text-sm text-paper/20 transition-colors hover:text-accent"
      >
        +
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[95] flex cursor-pointer items-center justify-center bg-ink/95 px-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="max-w-xs text-center font-arabic text-3xl leading-relaxed text-paper sm:text-4xl"
            >
              {WEDDING_CONFIG.secretMessage}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
