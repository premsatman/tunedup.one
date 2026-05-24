'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToTopInstant } from '@/lib/scrollToTop'

export default function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    scrollToTopInstant()
    requestAnimationFrame(() => ScrollTrigger.refresh(true))
  }, [pathname])

  return null
}
