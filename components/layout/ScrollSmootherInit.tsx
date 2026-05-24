'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useMenuOpenOptional } from '@/components/layout/MenuOpenContext'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const shouldUseScrollSmoother = () => {
  if (typeof window === 'undefined') return false

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const prefersCoarsePointer = window.matchMedia('(pointer: coarse)').matches

  // Native scroll on touch devices — ScrollSmoother + blur layers cause jank on iOS/Android.
  return !prefersReducedMotion && !prefersCoarsePointer
}

export default function ScrollSmootherInit() {
  const menuOpen = useMenuOpenOptional()?.menuOpen ?? false

  useEffect(() => {
    if (!shouldUseScrollSmoother()) return

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
    }
  }, [])

  useEffect(() => {
    const smoother = ScrollSmoother.get()
    if (!smoother) return
    smoother.paused(menuOpen)
  }, [menuOpen])

  return null
}
