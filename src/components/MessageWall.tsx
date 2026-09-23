import { notifyNewMessage } from '../lib/notify'
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogIn, LogOut, Trash2, Star, Heart, Sparkles, Crown } from 'lucide-react'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore'
import { db, ensureAnonymousAuth, auth, signInGroom, signOutGroom } from '../firebase'
import type { WishMessage } from '../types'
import { MEMORY_CONFIG, WEDDING_CONFIG } from '../types'
import { containsBlockedWords } from '../lib/moderation'

type Role = 'groom' | 'bride' | null

const SIZES = ['text-lg', 'text-2xl', 'text-xl', 'text-3xl', 'text-base']
const ROTATIONS = [-3, 2, -1.5, 3, 0, -2]

export default function MessageWall() {
  const [messages, setMessages] = useState<WishMessage[]>([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // --- Couple auth state: which of the two (if either) is signed in ---
  const [role, setRole] = useState<Role>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loggingIn, setLoggingIn] = useState(false)

  // --- Reply UI state ---
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [sendingReply, setSendingReply] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: WishMessage[] = snapshot.docs.map((d) => {
          const data = d.data() as {
            name: string
            message: string
            createdAt: number | Timestamp
            likes: number
            reply?: string
            repliedAt?: number | Timestamp
            repliedBy?: 'groom' | 'bride'
            role?: string
            tier?: 1 | 2 | 3 | 4
          }
          const createdAt =
            typeof data.createdAt === 'number' ? data.createdAt : data.createdAt?.toMillis?.() ?? Date.now()
          const repliedAt =
            typeof data.repliedAt === 'number' ? data.repliedAt : data.repliedAt?.toMillis?.() ?? undefined
          return {
            id: d.id,
            name: data.name,
            message: data.message,
            likes: data.likes ?? 0,
            createdAt,
            reply: data.reply,
            repliedAt,
            repliedBy: data.repliedBy,
            role: data.role,
            tier: data.tier,
          }
        })
        setMessages(items)
      },
      () => setError('تعذر تحميل الرسائل حالياً.')
    )
    return () => unsubscribe()
  }, [])

  // Figure out which member of the couple (if any) is signed in — never an
  // anonymous guest account, which has no email at all.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email === WEDDING_CONFIG.groomEmail) setRole('groom')
      else if (user?.email === WEDDING_CONFIG.brideEmail) setRole('bride')
      else setRole(null)
    })
    return () => unsubscribe()
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!name.trim() || !text.trim() || submitting) return
      if (containsBlockedWords(name) || containsBlockedWords(text)) {
        setError('برجاء الحفاظ على لغة لائقة في رسالتك 🤍')
        return
      }
      setSubmitting(true)
      setError(null)
      try {
        await ensureAnonymousAuth()
        await addDoc(collection(db, 'wishes'), {
          name: name.trim().slice(0, 60),
          message: text.trim().slice(0, 300),
          likes: 0,
          createdAt: Date.now(),
        })
        notifyNewMessage(name.trim(), text.trim())
        setName('')
        setText('')
      } catch {
        setError('حدث خطأ أثناء الإرسال. حاول مرة أخرى.')
      } finally {
        setSubmitting(false)
      }
    },
    [name, text, submitting]
  )

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!loginEmail.trim() || !loginPassword || loggingIn) return
      setLoggingIn(true)
      setLoginError(null)
      try {
        await signInGroom(loginEmail.trim(), loginPassword)
        setShowLogin(false)
        setLoginEmail('')
        setLoginPassword('')
      } catch {
        setLoginError('بيانات الدخول غير صحيحة.')
      } finally {
        setLoggingIn(false)
      }
    },
    [loginEmail, loginPassword, loggingIn]
  )

  const handleSendReply = useCallback(
    async (wishId: string) => {
      if (!replyText.trim() || sendingReply || !role) return
      setSendingReply(true)
      try {
        await updateDoc(doc(db, 'wishes', wishId), {
          reply: replyText.trim().slice(0, 300),
          repliedAt: Date.now(),
          repliedBy: role,
        })
        setReplyingTo(null)
        setReplyText('')
      } catch {
        setError('تعذر إرسال الرد. حاول مرة أخرى.')
      } finally {
        setSendingReply(false)
      }
    },
    [replyText, sendingReply, role]
  )

  const handleDelete = useCallback(async (wishId: string) => {
    if (!role) return
    if (!window.confirm('متأكد إنك عايز تمسح الرسالة دي؟')) return
    try {
      await deleteDoc(doc(db, 'wishes', wishId))
    } catch {
      setError('تعذر حذف الرسالة.')
    }
  }, [role])

  return (
    <section className="relative min-h-screen bg-ink px-6 py-28 sm:px-16 sm:py-40">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        dir="ltr"
        className="text-center font-display text-xs tracking-widest2 text-accent"
      >
        {MEMORY_CONFIG.wallKickerEn}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto mt-6 max-w-md text-center font-arabic text-xl text-paper/70"
      >
        {MEMORY_CONFIG.wallIntroAr}
      </motion.p>

      <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-lg flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          required
          placeholder="اسمك"
          className="w-full border-b border-paper/25 bg-transparent pb-2 font-arabic text-base text-paper placeholder:text-paper/30 focus:outline-none focus:border-accent"
        />
        <div className="flex items-end gap-4 border-b border-paper/25 pb-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={300}
            required
            placeholder={MEMORY_CONFIG.wallPlaceholder}
            className="w-full bg-transparent font-arabic text-lg text-paper placeholder:text-paper/30 focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            data-cursor-hover
            dir="ltr"
            className="shrink-0 font-display text-xs tracking-widest2 text-paper transition-colors hover:text-accent disabled:opacity-40"
          >
            SEND →
          </button>
        </div>
      </form>
      {error && <p className="mt-3 text-center font-display text-xs text-paper/40">{error}</p>}

      {/* Evolving wall of floating typography */}
      <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-start justify-center gap-x-6 gap-y-8">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => {
            const replierName = m.repliedBy === 'bride' ? WEDDING_CONFIG.brideName : WEDDING_CONFIG.groomName
            const cardClass =
              m.tier === 1
                ? 'rounded-xl border-2 border-accent bg-accent/15 px-6 py-5'
                : m.tier === 2
                ? 'rounded-lg border border-accent/50 bg-accent/5 px-5 py-4'
                : m.tier === 3
                ? 'rounded-2xl border-2 border-accent-light bg-accent-light/20 px-6 py-5 shadow-[0_0_0_4px_rgba(185,144,95,0.15)]'
                : m.tier === 4
                ? 'rounded-xl border-2 border-[#8B4A52] bg-[#8B4A52]/15 px-6 py-5'
                : ''
            return (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, rotate: ROTATIONS[i % ROTATIONS.length] }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className={`relative flex max-w-xs flex-col items-center text-center ${cardClass}`}
              >
                {role && (
                  <button
                    onClick={() => handleDelete(m.id)}
                    data-cursor-hover
                    aria-label="حذف الرسالة"
                    className="absolute -top-2 -left-2 text-paper/20 hover:text-red-400"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
                {m.tier === 1 && <Sparkles size={16} className="mb-1.5 fill-accent text-accent" />}
                {m.tier === 3 && <Heart size={16} className="mb-1.5 fill-accent-light text-accent-light" />}
                {m.tier === 4 && <Crown size={16} className="mb-1.5 fill-[#8B4A52] text-[#8B4A52]" />}
                {m.role && (
                  <span className={`mb-2 font-arabic text-xs tracking-wide ${m.tier === 4 ? 'text-[#8B4A52]' : 'text-accent'}`}>
                    {m.role}
                  </span>
                )}
                <span
                  className={`${m.tier ? 'text-xl' : SIZES[i % SIZES.length]} font-arabic text-paper/85`}
                >
                  {m.message}
                </span>
                <span className={`mt-2 font-arabic text-xs ${m.tier === 4 ? 'text-[#8B4A52]/80' : 'text-accent/70'}`}>
                  — {m.name}
                </span>

                {m.reply && (
                  <div className="mt-3 border-r-2 border-accent/50 pr-3 text-right">
                    <p className="font-arabic text-sm text-accent-light">{m.reply}</p>
                    <p className="mt-1 font-arabic text-xs text-paper/35">— {replierName}</p>
                  </div>
                )}

                {role && !m.reply && (
                  <div className="mt-3 w-full">
                    {replyingTo === m.id ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          maxLength={300}
                          rows={2}
                          placeholder={`اكتب رد ${role === 'bride' ? WEDDING_CONFIG.brideName : WEDDING_CONFIG.groomName}...`}
                          className="w-full resize-none border border-accent/30 bg-transparent p-2 font-arabic text-sm text-paper placeholder:text-paper/30 focus:outline-none"
                        />
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleSendReply(m.id)}
                            disabled={sendingReply}
                            data-cursor-hover
                            dir="ltr"
                            className="font-display text-[10px] tracking-widest2 text-accent"
                          >
                            {sendingReply ? '...' : 'SEND REPLY'}
                          </button>
                          <button
                            onClick={() => setReplyingTo(null)}
                            data-cursor-hover
                            dir="ltr"
                            className="font-display text-[10px] tracking-widest2 text-paper/40"
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReplyingTo(m.id)}
                        data-cursor-hover
                        dir="ltr"
                        className="font-display text-[10px] tracking-widest2 text-paper/30 hover:text-accent"
                      >
                        REPLY
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>

        {messages.length === 0 && !error && (
          <p className="font-body text-sm text-paper/30">{MEMORY_CONFIG.wallEmptyAr}</p>
        )}
      </div>

      {/* Discreet couple login, tucked away — not meant for guests */}
      <div className="mt-24 flex justify-center">
        {role ? (
          <button
            onClick={() => signOutGroom()}
            data-cursor-hover
            dir="ltr"
            className="flex items-center gap-1.5 font-display text-[10px] tracking-widest2 text-paper/25 hover:text-paper/60"
          >
            <LogOut size={11} /> {role === 'bride' ? 'BRIDE' : 'GROOM'} SIGNED IN — LOG OUT
          </button>
        ) : (
          <button
            onClick={() => setShowLogin((s) => !s)}
            data-cursor-hover
            dir="ltr"
            className="flex items-center gap-1.5 font-display text-[10px] tracking-widest2 text-paper/15 hover:text-paper/40"
          >
            <LogIn size={11} /> COUPLE LOGIN
          </button>
        )}
      </div>

      <AnimatePresence>
        {showLogin && !role && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleLogin}
            className="mx-auto mt-6 flex max-w-xs flex-col gap-3 overflow-hidden"
          >
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Email"
              dir="ltr"
              className="border-b border-paper/25 bg-transparent pb-2 font-display text-sm text-paper placeholder:text-paper/30 focus:outline-none focus:border-accent"
            />
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
              dir="ltr"
              className="border-b border-paper/25 bg-transparent pb-2 font-display text-sm text-paper placeholder:text-paper/30 focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={loggingIn}
              data-cursor-hover
              dir="ltr"
              className="self-center font-display text-[10px] tracking-widest2 text-accent disabled:opacity-40"
            >
              {loggingIn ? '...' : 'SIGN IN'}
            </button>
            {loginError && <p className="text-center font-display text-[10px] text-paper/40">{loginError}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  )
}
