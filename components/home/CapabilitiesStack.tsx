'use client'

import { useEffect, useRef, useState } from 'react'
import {
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import PageGutter from '@/components/shared/PageGutter'

const capabilities = [
  {
    code: '/01',
    title1: 'Brand',
    title2: 'Systems',
    keywords: ['Logo', 'Typography', 'Voice & Tone', 'Guidelines', 'Identity'],
    body:
      'Every mission starts with a clear identity. We develop the visual and verbal systems that make your brand recognizable on every channel — the signal before the message.',
  },
  {
    code: '/02',
    title1: 'Smart',
    title2: 'Development',
    keywords: ['Web Development', 'Next.js', 'Sanity CMS', 'iOS / Android Apps', 'UI/UX'],
    body:
      'Fast, accessible, conversion-tuned websites and applications. Built on Next.js and headless CMS, designed to outlast trends and rank well from day one.',
  },
  {
    code: '/03',
    title1: 'Growth',
    title2: 'Campaigns',
    keywords: ['Google Ads', 'Ad Grants for NGOs', 'SEO', 'Email Marketing', 'Social'],
    body:
      'We pilot the campaigns that turn signal into reach. From Google Ads to nonprofit Ad Grants ($10K/mo free for eligible NGOs) to SEO and email — measurable, accountable, no fluff.',
  },
  {
    code: '/04',
    title1: 'Workflow',
    title2: 'Automation',
    keywords: ['n8n Workflows', 'AI Agents', 'Integrations', 'Custom Pipelines', 'Slack / Notion / CRM'],
    body:
      'We automate the tasks that drain your team — visitor follow-up, lead routing, invoice reminders, content distribution. So your crew can focus on the actual mission.',
  },
]

const NAV_OFFSET = 88
const STACK_GAP = 14
const SHRINK_TRAVEL = 180
const CARD_COLORS = ['var(--dark)', 'var(--dark-mid)', '#222228', '#2c2c33']

type Capability = (typeof capabilities)[number]

type CapabilityCardProps = {
  cap: Capability
  index: number
  total: number
  cardRef: (element: HTMLElement | null) => void
  nextCardRef: React.RefObject<HTMLElement | null> | null
}

const CapabilityKeyword = ({ label }: { label: string }) => (
  <span className="hover-shake inline-block rounded-2xl bg-white/[0.1] px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-[var(--canvas)] transition-colors hover:bg-white/[0.16] sm:text-sm">
    {label}
  </span>
)

const STACK_MEDIA_QUERY = '(min-width: 768px)'

const useStackAnimation = () => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(STACK_MEDIA_QUERY)
    const handleChange = () => setEnabled(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return enabled
}

const CapabilityCard = ({
  cap,
  index,
  total,
  cardRef,
  nextCardRef,
}: CapabilityCardProps) => {
  const shouldReduceMotion = useReducedMotion()
  const stackEnabled = useStackAnimation()
  const endWidth = 100 - (total - index - 1) * 3.5
  const [width, setWidth] = useState('100%')

  const nextStickyTop = NAV_OFFSET + (index + 1) * STACK_GAP
  const hasNextCard = nextCardRef !== null
  const useStackEffects = stackEnabled && hasNextCard && !shouldReduceMotion

  const { scrollYProgress } = useScroll({
    target: useStackEffects ? nextCardRef : undefined,
    offset: useStackEffects
      ? [`start ${nextStickyTop + SHRINK_TRAVEL}px`, `start ${nextStickyTop}px`]
      : undefined,
  })

  const animatedWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ['100%', `${endWidth}%`]
  )

  useMotionValueEvent(animatedWidth, 'change', (value) => {
    if (useStackEffects) setWidth(value)
  })

  const stickyTop = stackEnabled ? NAV_OFFSET + index * STACK_GAP : undefined

  return (
    <article
      ref={cardRef}
      data-stack-card
      className="relative mx-auto flex min-h-[520px] w-full flex-col justify-between rounded-[32px] px-8 py-12 text-[var(--canvas)] md:sticky md:min-h-[580px] md:rounded-[40px] md:px-10 md:py-14 lg:min-h-[640px] lg:px-12 lg:py-16"
      style={{
        top: stickyTop,
        width: useStackEffects ? width : '100%',
        zIndex: stackEnabled ? index + 1 : undefined,
        backgroundColor: CARD_COLORS[index],
      }}
    >
      <div className="flex items-start justify-between gap-6">
        <h3 className="text-title-capability">
          {cap.title1}
          <br />
          <span className="text-[var(--ink-soft)]">{cap.title2}</span>
        </h3>
        <span className="shrink-0 font-mono text-sm tracking-wide text-[var(--ink-soft)] md:text-base">
          {cap.code}
        </span>
      </div>

      <div className="mt-auto pt-8 md:pt-10">
        <div className="flex flex-wrap gap-2.5">
          {cap.keywords.map((keyword) => (
            <CapabilityKeyword key={keyword} label={keyword} />
          ))}
        </div>

        <p className="mt-4 w-full font-display text-xl font-bold leading-[1.15] tracking-[-0.02em] text-[var(--canvas)] md:mt-5 md:text-2xl lg:text-3xl">
          {cap.body}
        </p>
      </div>
    </article>
  )
}

export default function CapabilitiesStack() {
  const cardRefs = useRef<(HTMLElement | null)[]>([])

  const nextCardRefs = useRef(
    capabilities.map((_, index) =>
      index < capabilities.length - 1
        ? ({
            get current() {
              return cardRefs.current[index + 1] ?? null
            },
          } as React.RefObject<HTMLElement>)
        : null
    )
  )

  const setCardRef = (index: number) => (element: HTMLElement | null) => {
    cardRefs.current[index] = element
  }

  return (
    <section className="overflow-visible bg-[var(--canvas)] pt-20 pb-8 lg:pt-28 lg:pb-12">
      <PageGutter>
        <MonoLabel className="mb-3 block">/ Capabilities</MonoLabel>
        <h2 className="text-title-section w-full">
          We are an unusual <HighlightWord>mission control,</HighlightWord> focusing on transforming
          your vision into a measurable digital presence.
        </h2>

        <section
          aria-label="Capabilities stack"
          className="relative mt-12 flex flex-col gap-5 overflow-visible pb-8 md:gap-6 md:pb-[16vh]"
        >
          {capabilities.map((cap, index) => (
            <CapabilityCard
              key={cap.code}
              cap={cap}
              index={index}
              total={capabilities.length}
              cardRef={setCardRef(index)}
              nextCardRef={nextCardRefs.current[index]}
            />
          ))}
        </section>
      </PageGutter>
    </section>
  )
}
