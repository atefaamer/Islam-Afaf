import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

/**
 * A quiet "SWIPE UP" cue that appears once the opening sequence ends, and
 * disappears the moment the visitor actually scrolls (or after a few
 * seconds, whichever comes first) — so it never lingers or gets in the way.
 */
export default function ScrollHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setVisible(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    const timer = setTimeout(() => setVisible(false), 4500)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none fixed inset-x-0 bottom-9 z-40 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronUp size={18} className="text-paper/50" strokeWidth={1.5} />
          </motion.div>
          <span dir="ltr" className="font-display text-[10px] tracking-widest2 text-paper/40">
            SWIPE UP
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
