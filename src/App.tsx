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
import ImageSequence from './components/ImageSequence'
import DateMorph from './components/DateMorph'
import InfoEditorial from './components/InfoEditorial'
import LocationInteractive from './components/LocationInteractive'
import MessageWall from './components/MessageWall'
import MemoriesHuge from './components/MemoriesHuge'
import MemoryGallery from './components/MemoryGallery'
import FinalScene from './components/FinalScene'

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
          <ImageSequence />
          <DateMorph />
          <InfoEditorial />
          <LocationInteractive />
          <MemoryGallery />
          <MessageWall />
          <MemoriesHuge />
          <FinalScene />
        </main>
      )}
    </div>
  )
}
