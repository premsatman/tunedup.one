'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { useSoundEnabled } from '@/components/layout/SoundEnabledContext'

export default function SoundToggle() {
  const { soundEnabled, toggleSound } = useSoundEnabled()

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={soundEnabled ? 'Turn website sounds off' : 'Turn website sounds on'}
      aria-pressed={!soundEnabled}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--ink)] transition-colors duration-150 hover:bg-black/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      {soundEnabled ? (
        <Volume2 size={18} strokeWidth={2} aria-hidden />
      ) : (
        <VolumeX size={18} strokeWidth={2} aria-hidden />
      )}
    </button>
  )
}
