'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useMenuOpenOptional } from '@/components/layout/MenuOpenContext'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function ScrollSmootherInit() {
  const menuOpen = useMenuOpenOptional()?.menuOpen ?? false

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 0.85,
      smoothTouch: 0.12,
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
