'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useMenuOpenOptional } from '@/components/layout/MenuOpenContext'
import { useScrollSmootherDebugOptional } from '@/components/layout/ScrollSmootherDebugContext'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const refreshScroll = () => {
  ScrollTrigger.refresh(true)
}

export default function ScrollSmootherInit() {
  const menuOpen = useMenuOpenOptional()?.menuOpen ?? false
  const smoothScrollEnabled =
    useScrollSmootherDebugOptional()?.smoothScrollEnabled ?? true

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !smoothScrollEnabled) {
      ScrollSmoother.get()?.kill()
      refreshScroll()
      return
    }

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 0.85,
      smoothTouch: 0.12,
      normalizeScroll: true,
      effects: false,
    })

    refreshScroll()
    window.setTimeout(refreshScroll, 100)
    window.setTimeout(refreshScroll, 500)

    return () => {
      smoother.kill()
      refreshScroll()
    }
  }, [smoothScrollEnabled])

  useEffect(() => {
    const smoother = ScrollSmoother.get()
    if (!smoother) return
    smoother.paused(menuOpen)
  }, [menuOpen])

  return null
}
