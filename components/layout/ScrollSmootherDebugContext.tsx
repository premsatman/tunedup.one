'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type ScrollSmootherDebugContextValue = {
  smoothScrollEnabled: boolean
  setSmoothScrollEnabled: (enabled: boolean) => void
  toggleSmoothScroll: () => void
}

const ScrollSmootherDebugContext = createContext<ScrollSmootherDebugContextValue | null>(
  null,
)

export const ScrollSmootherDebugProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [smoothScrollEnabled, setSmoothScrollEnabled] = useState(true)

  const toggleSmoothScroll = useCallback(() => {
    setSmoothScrollEnabled((current) => !current)
  }, [])

  const value = useMemo(
    () => ({
      smoothScrollEnabled,
      setSmoothScrollEnabled,
      toggleSmoothScroll,
    }),
    [smoothScrollEnabled, toggleSmoothScroll],
  )

  return (
    <ScrollSmootherDebugContext.Provider value={value}>
      {children}
    </ScrollSmootherDebugContext.Provider>
  )
}

export const useScrollSmootherDebug = () => {
  const context = useContext(ScrollSmootherDebugContext)
  if (!context) {
    throw new Error('useScrollSmootherDebug must be used within ScrollSmootherDebugProvider')
  }
  return context
}

export const useScrollSmootherDebugOptional = () => useContext(ScrollSmootherDebugContext)
