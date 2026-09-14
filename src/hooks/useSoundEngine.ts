import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Tiny sound design system for the experience:
 * - Short synthesized tones for clicks/transitions (no audio files needed)
 * - A soft ambient loop (public/music.mp3)
 *
 * True autoplay before any interaction is blocked by every browser, with no
 * workaround — so instead we start the ambient loop on the very first tap,
 * click, or key press anywhere on the page (see the effect below), which is
 * as close to "automatic" as the platform allows.
 *
 * `enabled` always mirrors the audio element's real play/pause state (via
 * its native events), rather than a hand-tracked flag — so toggling off and
 * back on repeatedly always works correctly.
 */
export function useSoundEngine() {
  const [enabled, setEnabled] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const ambientRef = useRef<HTMLAudioElement | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      ctxRef.current = new AudioCtx()
    }
    return ctxRef.current
  }, [])

  const getAmbient = useCallback(() => {
    if (!ambientRef.current) {
      const audio = new Audio('./music.mp3')
      audio.loop = true
      audio.volume = 0.18
      audio.addEventListener('play', () => setEnabled(true))
      audio.addEventListener('pause', () => setEnabled(false))
      ambientRef.current = audio
    }
    return ambientRef.current
  }, [])

  const start = useCallback(() => {
    getCtx().resume?.()
    getAmbient().play().catch(() => {
      // Still blocked (e.g. truly no user gesture yet) — safe to ignore,
      // the next real interaction or a manual toggle tap will retry.
    })
  }, [getCtx, getAmbient])

  const stop = useCallback(() => {
    getAmbient().pause()
  }, [getAmbient])

  const toggle = useCallback(() => {
    if (getAmbient().paused) start()
    else stop()
  }, [getAmbient, start, stop])

  // Unlock audio the moment the visitor first interacts with the page,
  // whatever that interaction is — this is the earliest point browsers
  // allow sound to begin. Skipped if it lands on the sound button itself,
  // which already handles the click through `toggle`.
  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'touchstart', 'keydown']
    const onFirstInteraction = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-sound-toggle]')) start()
      events.forEach((evt) => window.removeEventListener(evt, onFirstInteraction))
    }
    events.forEach((evt) => window.addEventListener(evt, onFirstInteraction, { once: true, passive: true }))
    return () => events.forEach((evt) => window.removeEventListener(evt, onFirstInteraction))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tick = useCallback(
    (freq = 880, duration = 0.045, gainLevel = 0.05) => {
      if (!enabled) return
      try {
        const ctx = getCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = freq
        gain.gain.setValueAtTime(gainLevel, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + duration)
      } catch {
        // Audio not available — fail silently.
      }
    },
    [enabled, getCtx]
  )

  const click = useCallback(() => tick(720, 0.05, 0.06), [tick])
  const transition = useCallback(() => tick(340, 0.12, 0.04), [tick])
  const reveal = useCallback(() => tick(1100, 0.08, 0.035), [tick])

  return { enabled, toggle, click, transition, reveal }
}
