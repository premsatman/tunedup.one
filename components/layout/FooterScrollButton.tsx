'use client'

import { ArrowUp } from 'lucide-react'

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function FooterScrollButton() {
  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className="inline-flex items-center gap-2 bg-[var(--ink-mid)] text-[var(--canvas)] rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wide hover:scale-105 transition-transform"
      aria-label="Scroll to top"
    >
      Go Up <ArrowUp size={12} aria-hidden />
    </button>
  )
}
