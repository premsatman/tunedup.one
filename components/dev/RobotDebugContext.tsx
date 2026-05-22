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
  CTA_ROBOT_BY_BAND,
  getViewportBand,
  type ViewportBand,
} from '@/lib/viewportBands'

const STORAGE_KEY = 'tunedup-robot-debug-manual'
const VW_KEY = 'tunedup-robot-debug-vw'
const RIGHT_KEY = 'tunedup-robot-debug-right'

type RobotDebugContextValue = {
  manual: boolean
  vw: number
  rightPct: number
  setManual: (value: boolean) => void
  setVw: (value: number) => void
  setRightPct: (value: number) => void
  loadPresetForBand: (band: ViewportBand) => void
  loadPresetForWidth: (width: number) => void
}

const RobotDebugContext = createContext<RobotDebugContextValue | null>(null)

const parseStoredNumber = (key: string, fallback: number) => {
  if (typeof window === 'undefined') return fallback
  const stored = localStorage.getItem(key)
  if (!stored) return fallback
  const parsed = Number(stored)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const RobotDebugProvider = ({ children }: { children: ReactNode }) => {
  const [manual, setManualState] = useState(false)
  const [vw, setVwState] = useState(85)
  const [rightPct, setRightPctState] = useState(45)

  useEffect(() => {
    setManualState(localStorage.getItem(STORAGE_KEY) === 'on')
    setVwState(parseStoredNumber(VW_KEY, 85))
    setRightPctState(parseStoredNumber(RIGHT_KEY, 45))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, manual ? 'on' : 'off')
    localStorage.setItem(VW_KEY, String(vw))
    localStorage.setItem(RIGHT_KEY, String(rightPct))
  }, [manual, vw, rightPct])

  const setManual = useCallback((value: boolean) => setManualState(value), [])

  const setVw = useCallback((value: number) => {
    setVwState(Math.min(100, Math.max(30, value)))
  }, [])

  const setRightPct = useCallback((value: number) => {
    setRightPctState(Math.min(80, Math.max(0, value)))
  }, [])

  const loadPresetForBand = useCallback((band: ViewportBand) => {
    const preset = CTA_ROBOT_BY_BAND[band]
    const vwNum = Number.parseFloat(preset.width.replace('vw', ''))
    const rightNum = Number.parseFloat(preset.right.replace(/[^0-9.]/g, ''))
    setVwState(Number.isFinite(vwNum) ? vwNum : 85)
    setRightPctState(Number.isFinite(rightNum) ? rightNum : 45)
  }, [])

  const loadPresetForWidth = useCallback(
    (width: number) => loadPresetForBand(getViewportBand(width)),
    [loadPresetForBand],
  )

  const value = useMemo(
    () => ({
      manual,
      vw,
      rightPct,
      setManual,
      setVw,
      setRightPct,
      loadPresetForBand,
      loadPresetForWidth,
    }),
    [manual, vw, rightPct, setManual, setVw, setRightPct, loadPresetForBand, loadPresetForWidth],
  )

  return (
    <RobotDebugContext.Provider value={value}>{children}</RobotDebugContext.Provider>
  )
}

export const useRobotDebug = () => {
  const context = useContext(RobotDebugContext)
  if (!context) {
    throw new Error('useRobotDebug must be used within RobotDebugProvider')
  }
  return context
}

/** Safe hook for components that may render outside provider during tests */
export const useRobotDebugOptional = () => useContext(RobotDebugContext)
