const STORAGE_KEY = 'tunedup-sounds-enabled'

let soundEnabled = true

export const getSoundEnabled = () => soundEnabled

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0')
  }
}

export const readStoredSoundEnabled = (): boolean => {
  if (typeof window === 'undefined') return true
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === '0') return false
  if (stored === '1') return true
  return true
}

export const initSoundPreferenceFromStorage = () => {
  soundEnabled = readStoredSoundEnabled()
}
