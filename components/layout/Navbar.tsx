'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useMenuOpen } from '@/components/layout/MenuOpenContext'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import BrandLogo from '@/components/shared/BrandLogo'
import Pill from '@/components/shared/Pill'
import MenuOverlay from './MenuOverlay'
import SoundToggle from './SoundToggle'
import { playClickSound } from '@/lib/playClickSound'
import { MessageCircle, Menu as MenuIcon } from 'lucide-react'

const LOGO_SCROLL_TARGETS: Partial<Record<string, string>> = {
  '/': 'home-hero',
  '/contact': 'contact-hero',
  '/work': 'work-hero',
  '/crew': 'crew-hero',
}

const isWorkDetailPath = (pathname: string) =>
  pathname.startsWith('/work/') && pathname !== '/work'

type NavbarLogoProps = {
  targetId: string
  onNavClick: () => void
}

const StaticNavbarLogo = ({ onNavClick }: { onNavClick: () => void }) => (
  <BrandLogo href="/" onClick={onNavClick} variant="full" theme="dark" priority />
)

const NavbarLogo = ({ targetId, onNavClick }: NavbarLogoProps) => {
  const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null)
  const targetRef = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    const element = document.getElementById(targetId)
    targetRef.current = element
    setScrollTarget(element)
  }, [targetId])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end 0.12'],
  })

  const logoOpacity = useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 1, 0])
  const logoY = useTransform(scrollYProgress, [0.55, 0.9], [0, -10])

  if (!scrollTarget) {
    return <BrandLogo href="/" onClick={onNavClick} variant="full" theme="dark" priority />
  }

  return (
    <motion.div
      style={shouldReduceMotion ? undefined : { opacity: logoOpacity, y: logoY }}
      className="will-change-transform"
    >
      <BrandLogo href="/" onClick={onNavClick} variant="full" theme="dark" priority />
    </motion.div>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const { menuOpen, setMenuOpen } = useMenuOpen()
  const isWorkDetail = isWorkDetailPath(pathname)
  const logoScrollTargetId = isWorkDetail ? null : (LOGO_SCROLL_TARGETS[pathname] ?? null)

  const handleNavClick = () => playClickSound()

  const handleOpenMenu = () => {
    playClickSound()
    setMenuOpen(true)
  }

  const handleCloseMenu = () => setMenuOpen(false)

  if (isWorkDetail) {
    return null
  }

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
            <Pill
              variant="outline"
              href="/contact"
              onClick={handleNavClick}
              className="hidden gap-2 lg:inline-flex"
            >
              <MessageCircle size={14} aria-hidden />
              Get in Touch
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
