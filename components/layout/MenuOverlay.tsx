'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { label: 'Home', href: '/', code: '/01' },
  { label: 'The Workshop', href: '/workshop', code: '/02' },
  { label: 'Our Work', href: '/work', code: '/03' },
  { label: 'Get in Touch', href: '/contact', code: '/04' },
]

type MenuOverlayProps = {
  open: boolean
  onClose: () => void
}

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-[var(--canvas)]"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="absolute top-6 right-6 lg:right-12">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--canvas)] rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wide"
              aria-label="Close menu"
            >
              <span>Close</span>
              <X size={14} aria-hidden />
            </button>
          </div>

          <div className="page-gutter flex h-full items-center">
            <nav className="w-full" aria-label="Main">
              <ul className="space-y-4">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group text-title-menu flex items-baseline gap-6 hover:text-[var(--ink-soft)] transition-colors"
                    >
                      <span className="font-mono text-sm text-[var(--ink-soft)]">{item.code}</span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
