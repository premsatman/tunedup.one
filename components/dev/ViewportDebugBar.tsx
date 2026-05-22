'use client'

import { useEffect, useState } from 'react'
import { useRobotDebug } from '@/components/dev/RobotDebugContext'
import {
  getCtaRobotLayout,
  getViewportBand,
  VIEWPORT_BANDS,
  type ViewportBand,
} from '@/lib/viewportBands'

const STORAGE_KEY = 'tunedup-viewport-debug-enabled'

export default function ViewportDebugBar() {
  const [enabled, setEnabled] = useState(true)
  const [band, setBand] = useState<ViewportBand>('mobile')
  const [width, setWidth] = useState(0)
  const {
    manual,
    vw,
    rightPct,
    setManual,
    setVw,
    setRightPct,
    loadPresetForWidth,
  } = useRobotDebug()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'off') setEnabled(false)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off')
    document.documentElement.style.setProperty(
      '--viewport-debug-offset',
      enabled ? '4.5rem' : '2rem',
    )
  }, [enabled])

  useEffect(() => {
    const handleResize = () => {
      const nextWidth = window.innerWidth
      setWidth(nextWidth)
      setBand(getViewportBand(nextWidth))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggle = () => setEnabled((prev) => !prev)

  const { label, range, bg } = VIEWPORT_BANDS[band]
  const robot = getCtaRobotLayout(band)
  const strategyLabel = 'robot'
  const accentClass = enabled ? bg : 'bg-[var(--ink-mid)]'

  const handleVwChange = (value: string) => {
    const next = Number.parseFloat(value)
    if (Number.isFinite(next)) setVw(next)
  }

  const handleRightChange = (value: string) => {
    const next = Number.parseFloat(value)
    if (Number.isFinite(next)) setRightPct(next)
  }

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[100] flex flex-col border-b border-white/10 bg-[var(--dark)] font-mono text-[11px] uppercase tracking-wider text-[var(--canvas)] shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-md"
      role="region"
      aria-label="Viewport debug"
    >
      <div
        className={`h-1 w-full shrink-0 transition-colors duration-200 ${accentClass}`}
        aria-hidden
      />

      <div className="flex h-8 items-center justify-between gap-2 bg-[var(--dark)]/95 px-3">
        {enabled ? (
          <div
            className="flex min-w-0 flex-1 items-center justify-center gap-1.5 sm:gap-2"
            role="status"
            aria-live="polite"
          >
            <span className="truncate font-semibold">{label}</span>
            <span className="shrink-0 opacity-70">·</span>
            <span className="hidden shrink-0 normal-case opacity-80 sm:inline">
              {strategyLabel}
            </span>
            <span className="hidden shrink-0 opacity-70 sm:inline">·</span>
            <span className="shrink-0 font-semibold normal-case">
              {manual ? `${vw}vw · −${rightPct}%` : robot.display}
            </span>
            <span className="hidden shrink-0 opacity-70 lg:inline">·</span>
            <span className="hidden shrink-0 normal-case tracking-normal opacity-90 lg:inline">
              {range}
            </span>
            <span className="shrink-0 opacity-70">·</span>
            <span className="shrink-0 tabular-nums">{width > 0 ? `${width}px` : '—'}</span>
          </div>
        ) : (
          <span className="flex-1 text-center normal-case tracking-normal opacity-70">
            Viewport debug off
          </span>
        )}

        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={enabled}
          className="shrink-0 rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--canvas)]"
        >
          {enabled ? 'Off' : 'On'}
        </button>
      </div>

      {enabled && (
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 border-t border-white/10 bg-[var(--dark-mid)]/90 px-3 py-2 normal-case tracking-normal">
          <label className="flex cursor-pointer items-center gap-1.5 text-[10px] font-semibold uppercase">
            <input
              type="checkbox"
              checked={manual}
              onChange={(e) => setManual(e.target.checked)}
              className="h-3 w-3 accent-[var(--accent)]"
            />
            Manual robot
          </label>

          <label className="flex items-center gap-1 text-[10px]">
            <span className="opacity-80">vw</span>
            <input
              type="number"
              min={30}
              max={100}
              step={1}
              value={vw}
              disabled={!manual}
              onChange={(e) => handleVwChange(e.target.value)}
              className="w-12 rounded border border-white/20 bg-white/10 px-1 py-0.5 text-center text-[11px] text-[var(--canvas)] tabular-nums disabled:opacity-40"
              aria-label="Robot width in vw"
            />
          </label>

          <label className="flex items-center gap-1 text-[10px]">
            <span className="opacity-80">right</span>
            <input
              type="number"
              min={0}
              max={80}
              step={1}
              value={rightPct}
              disabled={!manual}
              onChange={(e) => handleRightChange(e.target.value)}
              className="w-12 rounded border border-white/20 bg-white/10 px-1 py-0.5 text-center text-[11px] text-[var(--canvas)] tabular-nums disabled:opacity-40"
              aria-label="Robot right bleed percent"
            />
            <span className="opacity-80">%</span>
          </label>

          <button
            type="button"
            onClick={() => loadPresetForWidth(width)}
            className="rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase transition-colors hover:bg-white/20"
          >
            Load band preset
          </button>
        </div>
      )}
    </div>
  )
}
