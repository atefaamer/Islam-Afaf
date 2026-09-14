interface SoundToggleProps {
  enabled: boolean
  onToggle: () => void
}

export default function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      dir="ltr"
      data-cursor-hover
      data-sound-toggle
      className="fixed bottom-6 left-6 z-50 font-display text-[10px] tracking-widest2 text-paper/50 transition-colors hover:text-paper"
      aria-label={enabled ? 'إيقاف الصوت' : 'تشغيل الصوت'}
    >
      SOUND {enabled ? 'ON' : 'OFF'}
    </button>
  )
}
