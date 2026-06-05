'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import PageGutter from '@/components/shared/PageGutter'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    title1: 'Brand',
    title2: 'Systems',
    keywords: ['Logo', 'Typography', 'Voice & Tone', 'Guidelines', 'Identity'],
    body:
      'Every mission starts with a clear identity. We develop the visual and verbal systems that make your brand recognizable on every channel — the signal before the message.',
  },
  {
    title1: 'Smart',
    title2: 'Development',
    keywords: ['Web Development', 'Next.js', 'Sanity CMS', 'iOS / Android Apps', 'UI/UX'],
    body:
      'Fast, accessible, conversion-tuned websites and applications. Built on Next.js and headless CMS, designed to outlast trends and rank well from day one.',
  },
  {
    title1: 'Growth',
    title2: 'Campaigns',
    keywords: ['Google Ads', 'Ad Grants for NGOs', 'SEO', 'Email Marketing', 'Social'],
    body:
      'We pilot the campaigns that turn signal into reach. From Google Ads to nonprofit Ad Grants ($10K/mo free for eligible NGOs) to SEO and email — measurable, accountable, no fluff.',
  },
  {
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
const MOBILE_REVEAL_SLIDE_PX = 112
const CARD_COLORS = ['var(--dark)', 'var(--dark-mid)', '#222228', '#2c2c33']

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

const CapabilityKeyword = ({ label }: { label: string }) => (
  <span className="hover-shake inline-block rounded-2xl bg-white/[0.1] px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-[var(--canvas)] transition-colors hover:bg-white/[0.16] sm:text-sm">
    {label}
  </span>
)

type Capability = (typeof capabilities)[number]

type CapabilityCardProps = {
  cap: Capability
  index: number
}

const CapabilityCard = ({ cap, index }: CapabilityCardProps) => (
  <article
    data-stack-card
    className="relative flex min-h-[520px] w-full flex-col rounded-[32px] px-5 py-12 text-[var(--canvas)] max-lg:mx-auto sm:px-8 md:min-h-[580px] md:rounded-[40px] md:px-10 md:py-14 lg:min-h-[640px] lg:rounded-[40px] lg:px-12 lg:py-16"
    style={{
      zIndex: index + 1,
      backgroundColor: CARD_COLORS[index],
    }}
  >
    <h3 className="text-title-capability">
      {cap.title1}
      <br />
      <span className="text-[var(--ink-soft)]">{cap.title2}</span>
    </h3>

    <div className="mt-8 flex flex-wrap gap-2.5 md:mt-10">
      {cap.keywords.map((keyword) => (
        <CapabilityKeyword key={keyword} label={keyword} />
      ))}
    </div>

    <p className="mt-4 w-full font-display text-xl font-bold leading-[1.15] tracking-[-0.02em] text-[var(--canvas)] md:mt-5 md:text-2xl lg:text-3xl">
      {cap.body}
    </p>
  </article>
)

export default function CapabilitiesStack() {
  const stackRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const stackEl = stackRef.current
    if (!stackEl || shouldReduceMotion) return

    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      mm.add('(min-width: 1024px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]', stackEl)
        if (cards.length === 0) return

        const lastCard = cards[cards.length - 1]

        cards.forEach((card, index) => {
          gsap.set(card, {
            width: '100%',
            opacity: 1,
            y: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 'auto',
            right: 'auto',
            clearProps: 'transform,xPercent',
          })

          ScrollTrigger.create({
            trigger: card,
            start: `top top+=${NAV_OFFSET + index * STACK_GAP}`,
            endTrigger: lastCard,
            end: 'bottom bottom',
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          })

          if (index < cards.length - 1) {
            const nextCard = cards[index + 1]
            const endWidth = 100 - (cards.length - index - 1) * 3.5
            const nextTop = NAV_OFFSET + (index + 1) * STACK_GAP

            ScrollTrigger.create({
              trigger: nextCard,
              start: `top top+=${nextTop + SHRINK_TRAVEL}`,
              end: `top top+=${nextTop}`,
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const width = gsap.utils.interpolate(100, endWidth, self.progress)
                const inset = (100 - width) / 2
                gsap.set(card, {
                  width: `${width}%`,
                  marginLeft: `${inset}%`,
                  marginRight: `${inset}%`,
                  left: 'auto',
                  right: 'auto',
                })
              },
            })
          }
        })
      })

      mm.add('(max-width: 1023px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]', stackEl)

        cards.forEach((card) => {
          gsap.set(card, {
            width: '100%',
            opacity: 0,
            y: MOBILE_REVEAL_SLIDE_PX,
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 'auto',
            right: 'auto',
          })

          ScrollTrigger.create({
            trigger: card,
            start: 'top 100%',
            end: 'top 32%',
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress
              const eased = easeOutCubic(progress)
              const opacity = progress < 0.2 ? progress * 5 : 1
              gsap.set(card, {
                opacity,
                y: MOBILE_REVEAL_SLIDE_PX * (1 - eased),
              })
            },
          })
        })
      })
    }, stackEl)

    const refresh = () => ScrollTrigger.refresh(true)
    refresh()
    const t1 = window.setTimeout(refresh, 150)
    const t2 = window.setTimeout(refresh, 600)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      mm.revert()
      ctx.revert()
    }
  }, [shouldReduceMotion])

  return (
    <section className="overflow-x-clip bg-[var(--canvas)] pt-20 pb-8 lg:pt-28 lg:pb-12">
      <PageGutter>
        <MonoLabel className="mb-3 block">/ What We Do</MonoLabel>
        <h2 className="text-title-section w-full">
        We&apos;re an unusual <HighlightWord>digital workshop,</HighlightWord> focused on turning your vision into work that gets seen, heard, and chosen.
        </h2>

        <section
          ref={stackRef}
          aria-label="Capabilities stack"
          className="relative mt-12 flex flex-col gap-5 overflow-x-clip pb-8 md:gap-6 lg:pb-[16vh]"
        >
          {capabilities.map((cap, index) => (
            <CapabilityCard
              key={`${cap.title1}-${cap.title2}`}
              cap={cap}
              index={index}
            />
          ))}
        </section>
      </PageGutter>
    </section>
  )
}
