import { getSoundEnabled } from '@/lib/soundPreference'

const CLICK_SOUND_SRC = '/sounds/click-web.wav'

let clickAudio: HTMLAudioElement | null = null

export const playClickSound = () => {
  if (typeof window === 'undefined') return
  if (!getSoundEnabled()) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  if (!clickAudio) {
    clickAudio = new Audio(CLICK_SOUND_SRC)
    clickAudio.preload = 'auto'
    clickAudio.volume = 0.45
  }

  clickAudio.currentTime = 0
  void clickAudio.play().catch(() => {
    /* Browsers may block playback until a user gesture; ignore silently. */
  })
}
