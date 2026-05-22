'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  initSoundPreferenceFromStorage,
  readStoredSoundEnabled,
  setSoundEnabled,
} from '@/lib/soundPreference'

type SoundEnabledContextValue = {
  soundEnabled: boolean
  setSoundEnabledState: (enabled: boolean) => void
  toggleSound: () => void
}

const SoundEnabledContext = createContext<SoundEnabledContextValue | null>(null)

export const SoundEnabledProvider = ({ children }: { children: ReactNode }) => {
  const [soundEnabled, setSoundEnabledState] = useState(true)

  useEffect(() => {
    initSoundPreferenceFromStorage()
    setSoundEnabledState(readStoredSoundEnabled())
  }, [])

  const setSoundEnabledWithPersist = useCallback((enabled: boolean) => {
    setSoundEnabled(enabled)
    setSoundEnabledState(enabled)
  }, [])

  const toggleSound = useCallback(() => {
    setSoundEnabledState((prev) => {
      const next = !prev
      setSoundEnabled(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      soundEnabled,
      setSoundEnabledState: setSoundEnabledWithPersist,
      toggleSound,
    }),
    [soundEnabled, setSoundEnabledWithPersist, toggleSound]
  )

  return (
    <SoundEnabledContext.Provider value={value}>{children}</SoundEnabledContext.Provider>
  )
}

export const useSoundEnabled = () => {
  const context = useContext(SoundEnabledContext)
  if (!context) {
    throw new Error('useSoundEnabled must be used within SoundEnabledProvider')
  }
  return context
}
