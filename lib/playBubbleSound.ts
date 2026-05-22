import { getSoundEnabled } from '@/lib/soundPreference'

const BUBBLE_SOUND_SRC = '/sounds/bubble.wav'

let bubbleAudio: HTMLAudioElement | null = null
let lastPlayedAt = 0
const HOVER_COOLDOWN_MS = 140

export const playBubbleSound = () => {
  if (typeof window === 'undefined') return
  if (!getSoundEnabled()) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const now = Date.now()
  if (now - lastPlayedAt < HOVER_COOLDOWN_MS) return
  lastPlayedAt = now

  if (!bubbleAudio) {
    bubbleAudio = new Audio(BUBBLE_SOUND_SRC)
    bubbleAudio.preload = 'auto'
    bubbleAudio.volume = 0.3
  }

  bubbleAudio.currentTime = 0
  void bubbleAudio.play().catch(() => {
    /* Browsers may block playback until a user gesture; ignore silently. */
  })
}
