'use client'

import { useState } from 'react'
import Link from 'next/link'
import Pill from '@/components/shared/Pill'
import MenuOverlay from './MenuOverlay'
import { MessageCircle, Menu as MenuIcon } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleOpenMenu = () => setMenuOpen(true)
  const handleCloseMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-6">
        <div className="page-gutter flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight">
            tunedup
          </Link>

          <div className="flex items-center gap-3">
            <Pill variant="outline" href="/contact" className="gap-2">
              <MessageCircle size={14} aria-hidden />
              <span className="hidden sm:inline">Open Channel</span>
            </Pill>
            <Pill variant="primary" onClick={handleOpenMenu} className="gap-2">
              <span>Menu</span>
              <MenuIcon size={14} aria-hidden />
            </Pill>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={handleCloseMenu} />
    </>
  )
}
