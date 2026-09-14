import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { doc, onSnapshot, updateDoc, setDoc, increment } from 'firebase/firestore'
import { db, ensureAnonymousAuth } from '../firebase'

const STATS_DOC = 'stats/visitors'

/**
 * Small fixed corner badge (same idea as the sound toggle / secret trigger)
 * rather than being tacked onto any one scene — stays quietly visible the
 * whole time, counts each page load once.
 */
export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, STATS_DOC), (snap) => {
      setCount(snap.exists() ? (snap.data().count as number) : null)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const bump = async () => {
      try {
        await ensureAnonymousAuth()
        try {
          await updateDoc(doc(db, STATS_DOC), { count: increment(1) })
        } catch {
          await setDoc(doc(db, STATS_DOC), { count: 1 })
        }
      } catch {
        // Fail silently — nice-to-have, not critical.
      }
    }
    bump()
  }, [])

  return (
    <AnimatePresence>
      {count !== null && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          dir="ltr"
          className="fixed left-6 top-6 z-40 font-display text-[10px] tracking-widest2 text-paper/35"
        >
          VISITOR #{count}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
