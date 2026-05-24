'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type WorkDetailDescriptionRevealProps = {
  children: React.ReactNode
  className?: string
  tone?: 'light' | 'muted'
}

const CHAR_CLASS = 'work-detail-desc-char'

const toneStyles = {
  light: {
    from: 'rgba(255, 255, 255, 0.28)',
    to: 'rgba(255, 255, 255, 0.88)',
  },
  muted: {
    from: 'rgba(255, 255, 255, 0.24)',
    to: 'rgba(255, 255, 255, 0.78)',
  },
} as const

const splitTextNodes = (container: HTMLElement) => {
  const chars: HTMLElement[] = []
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement
      if (parent?.closest(`.${CHAR_CLASS}`)) return NodeFilter.FILTER_REJECT
      return node.textContent?.length ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })

  const textNodes: Text[] = []
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text)
  }

  textNodes.forEach((textNode) => {
    const text = textNode.textContent ?? ''
    const fragment = document.createDocumentFragment()

    Array.from(text).forEach((char) => {
      const span = document.createElement('span')
      span.className = char === ' ' ? `${CHAR_CLASS} inline` : `${CHAR_CLASS} inline-block`
      span.textContent = char
      fragment.appendChild(span)
      chars.push(span)
    })

    textNode.parentNode?.replaceChild(fragment, textNode)
  })

  return chars
}

const getCharacterElements = (container: HTMLElement) => {
  const existing = container.querySelectorAll<HTMLElement>(`.${CHAR_CLASS}`)
  if (existing.length) return Array.from(existing)
  return splitTextNodes(container)
}

export default function WorkDetailDescriptionReveal({
  children,
  className = '',
  tone = 'light',
}: WorkDetailDescriptionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const srRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const accessibleText = container.textContent?.replace(/\s+/g, ' ').trim() ?? ''
    if (srRef.current) {
      srRef.current.textContent = accessibleText
    }

    const chars = getCharacterElements(container)
    if (!chars.length) return

    const { from, to } = toneStyles[tone]
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(chars, { color: to, y: 0 })
      return
    }

    gsap.set(chars, { color: from, y: 8 })

    const stagger = Math.min(0.02, 1.4 / chars.length)

    const context = gsap.context(() => {
      gsap.to(chars, {
        color: to,
        y: 0,
        ease: 'none',
        stagger: {
          each: stagger,
          from: 'start',
        },
        scrollTrigger: {
          trigger: container,
          start: 'top 92%',
          end: 'top 38%',
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      })
    }, container)

    return () => context.revert()
  }, [tone])

  return (
    <>
      <span ref={srRef} className="sr-only" />
      <div ref={containerRef} className={className} aria-hidden="true">
        {children}
      </div>
    </>
  )
}
