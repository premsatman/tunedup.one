'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useMenuOpenOptional } from '@/components/layout/MenuOpenContext'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const SCROLL_SMOOTHER_CLASS = 'scroll-smoother-active'

const shouldUseScrollSmoother = () => {
  if (typeof window === 'undefined') return false

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const prefersCoarsePointer = window.matchMedia('(pointer: coarse)').matches

  return !prefersReducedMotion && !prefersCoarsePointer
}

const setScrollSmootherClass = (enabled: boolean) => {
  document.documentElement.classList.toggle(SCROLL_SMOOTHER_CLASS, enabled)
}

export default function ScrollSmootherInit() {
  const menuOpen = useMenuOpenOptional()?.menuOpen ?? false

  useEffect(() => {
    if (!shouldUseScrollSmoother()) {
      setScrollSmootherClass(false)
      return
    }

    setScrollSmootherClass(true)

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 0.85,
      smoothTouch: 0,
      normalizeScroll: true,
      effects: false,
    })

    const refresh = () => ScrollTrigger.refresh(true)
    refresh()
    window.setTimeout(refresh, 100)
    window.setTimeout(refresh, 500)

    return () => {
      smoother.kill()
      setScrollSmootherClass(false)
    }
  }, [])

  useEffect(() => {
    const smoother = ScrollSmoother.get()
    if (!smoother) return
    smoother.paused(menuOpen)
  }, [menuOpen])

  return null
}
