'use client'

import { useScrollSmootherDebugOptional } from '@/components/layout/ScrollSmootherDebugContext'

const isDev = process.env.NODE_ENV === 'development'

export default function ScrollSmootherDebugBar() {
  const debug = useScrollSmootherDebugOptional()

  if (!isDev || !debug) return null

  const { smoothScrollEnabled, toggleSmoothScroll } = debug

  return (
    <div
      className="fixed inset-x-0 top-0 z-[9999] flex h-9 items-center justify-between border-b border-black/20 bg-amber-300 px-4 font-mono text-[11px] uppercase tracking-wider text-black"
      role="toolbar"
      aria-label="Scroll debug toolbar"
    >
      <span className="font-semibold">Debug · GSAP ScrollSmoother</span>

      <button
        type="button"
        onClick={toggleSmoothScroll}
        aria-pressed={smoothScrollEnabled}
        aria-label={
          smoothScrollEnabled
            ? 'Turn GSAP smooth scroll off'
            : 'Turn GSAP smooth scroll on'
        }
        className={`rounded-full px-3 py-1 text-[10px] font-bold transition-colors ${
          smoothScrollEnabled
            ? 'bg-black text-amber-300'
            : 'bg-white text-black ring-1 ring-black/30'
        }`}
      >
        {smoothScrollEnabled ? 'Smooth ON' : 'Smooth OFF'}
      </button>
    </div>
  )
}
