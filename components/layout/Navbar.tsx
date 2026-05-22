'use client'

import { useLayoutEffect, useRef } from 'react'
import { useMenuOpen } from '@/components/layout/MenuOpenContext'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Pill from '@/components/shared/Pill'
import MenuOverlay from './MenuOverlay'
import { playClickSound } from '@/lib/playClickSound'
import { MessageCircle, Menu as MenuIcon } from 'lucide-react'

const MISSION_ARCHIVE_ID = 'mission-archive'

export default function Navbar() {
  const { menuOpen, setMenuOpen } = useMenuOpen()
  const missionArchiveRef = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    missionArchiveRef.current = document.getElementById(MISSION_ARCHIVE_ID)
  }, [])

  const { scrollYProgress: archiveReach } = useScroll({
    target: missionArchiveRef,
    offset: ['start end', 'start 0.14'],
  })

  const logoOpacity = useTransform(archiveReach, [0.55, 0.95], [1, 0])
  const logoY = useTransform(archiveReach, [0.55, 0.95], [0, -10])

  const handleNavClick = () => playClickSound()

  const handleOpenMenu = () => {
    playClickSound()
    setMenuOpen(true)
  }

  const handleCloseMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 pt-6">
        <div className="page-gutter flex items-center justify-between">
          <motion.div
            style={
              shouldReduceMotion
                ? undefined
                : { opacity: logoOpacity, y: logoY }
            }
            className="will-change-transform"
          >
            <Link
              href="/"
              onClick={handleNavClick}
              className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
              aria-label="TunedUp home"
            >
              tunedup
            </Link>
          </motion.div>

          <div className="flex items-center gap-3">
            <Pill variant="outline" href="/contact" onClick={handleNavClick} className="gap-2">
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
