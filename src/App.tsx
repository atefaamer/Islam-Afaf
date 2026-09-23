import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import { useSoundEngine } from './hooks/useSoundEngine'
import Opening from './components/Opening'
import CustomCursor from './components/CustomCursor'
import CursorGlow from './components/CursorGlow'
import FallingPetals from './components/FallingPetals'
import SoundToggle from './components/SoundToggle'
import SecretTrigger from './components/SecretTrigger'
import ScrollHint from './components/ScrollHint'
import HeroSplit from './components/HeroSplit'
import VerseScene from './components/VerseScene'
import MemoryGallery from './components/MemoryGallery'
import MessageWall from './components/MessageWall'
import MemoriesHuge from './components/MemoriesHuge'
import FinalScene from './components/FinalScene'

/**
 * النسخة المختصرة — ذكرى بس:
 *   الاسمين ← الآية ← الصور ← كلام الضيوف ← بقالنا كام يوم ← الختام
 * الافتتاحية بقت التاريخ 21.09 بس (ظهور + glitch خفيف) وبعدها دخول مباشر —
 * التسلسل القديم (إسلام ← ∞ ← عفاف) اتشال وهو في تاريخ الجيت لو حبيت ترجّعها.
 */
export default function App() {
  const [openingDone, setOpeningDone] = useState(false)
  const sound = useSoundEngine()

  useLenis()

  return (
    <div className="relative bg-ink">
      <div className="film-grain" />
      <CursorGlow />
      <CustomCursor />

      <Opening onComplete={() => setOpeningDone(true)} />

      {openingDone && (
        <main>
          <FallingPetals />
          <SoundToggle enabled={sound.enabled} onToggle={sound.toggle} />
          <SecretTrigger />
          <ScrollHint />

          <HeroSplit />
          <VerseScene />
          <MemoryGallery />
          <MessageWall />
          <MemoriesHuge />
          <FinalScene />
        </main>
      )}
    </div>
  )
}
