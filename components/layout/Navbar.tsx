'use client'

import { useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useMenuOpen } from '@/components/layout/MenuOpenContext'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Pill from '@/components/shared/Pill'
import MenuOverlay from './MenuOverlay'
import SoundToggle from './SoundToggle'
import { playClickSound } from '@/lib/playClickSound'
import { MessageCircle, Menu as MenuIcon } from 'lucide-react'

const LOGO_SCROLL_TARGETS: Partial<Record<string, string>> = {
  '/': 'mission-archive',
  '/contact': 'contact-wizard',
}

type NavbarLogoProps = {
  targetId: string | null
  onNavClick: () => void
}

const StaticNavbarLogo = ({ onNavClick }: { onNavClick: () => void }) => (
  <Link
    href="/"
    onClick={onNavClick}
    className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
    aria-label="TunedUp home"
  >
    tunedup
  </Link>
)

const NavbarLogo = ({ targetId, onNavClick }: NavbarLogoProps) => {
  const scrollTargetRef = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    scrollTargetRef.current = targetId ? document.getElementById(targetId) : null
  }, [targetId])

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ['start end', 'start 0.14'],
  })

  const logoOpacity = useTransform(scrollYProgress, [0.55, 0.95], [1, 0])
  const logoY = useTransform(scrollYProgress, [0.55, 0.95], [0, -10])

  const motionStyle =
    targetId && !shouldReduceMotion ? { opacity: logoOpacity, y: logoY } : undefined

  return (
    <motion.div style={motionStyle} className="will-change-transform">
      <Link
        href="/"
        onClick={onNavClick}
        className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
        aria-label="TunedUp home"
      >
        tunedup
      </Link>
    </motion.div>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const { menuOpen, setMenuOpen } = useMenuOpen()
  const logoScrollTargetId = LOGO_SCROLL_TARGETS[pathname] ?? null

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
          {logoScrollTargetId ? (
            <NavbarLogo
              key={logoScrollTargetId}
              targetId={logoScrollTargetId}
              onNavClick={handleNavClick}
            />
          ) : (
            <StaticNavbarLogo onNavClick={handleNavClick} />
          )}

          <div className="flex items-center gap-2 sm:gap-3">
            <SoundToggle />
            <Pill variant="outline" href="/contact" onClick={handleNavClick} className="gap-2">
              <MessageCircle size={14} aria-hidden />
              <span className="hidden sm:inline">Get in Touch</span>
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
