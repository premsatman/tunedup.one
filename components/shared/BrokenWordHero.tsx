'use client'

import { motion, useReducedMotion } from 'framer-motion'
import PropImage from './PropImage'
import ScrollCue from './ScrollCue'
import PageGutter from './PageGutter'

type BrokenWordHeroProps = {
  word: string
  propSrc: string
  propAlt: string
  subline: React.ReactNode
  propPosition?: 'center' | 'right' | 'left'
  propContainerClassName?: string
  layout?: 'default' | 'home'
  showScrollCue?: boolean
}

const HOME_PROP_CLASSES =
  'left-1/2 top-[-8%] -translate-x-1/2 ' +
  'h-[clamp(200px,50vw,580px)] w-[clamp(140px,36vw,440px)] max-w-[min(88vw,500px)]'

export default function BrokenWordHero({
  word,
  propSrc,
  propAlt,
  subline,
  propPosition = 'center',
  propContainerClassName = 'top-[-10%] h-[120%] w-[40%]',
  layout = 'default',
  showScrollCue = true,
}: BrokenWordHeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const isHomeLayout = layout === 'home'

  const propPositionClasses = {
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0',
    left: 'left-0',
  }

  const wordmarkTextSize =
    word.toLowerCase() === 'tunedup'
      ? 'text-[clamp(80px,22vw,140px)] sm:text-[clamp(140px,18vw,220px)] lg:text-[clamp(220px,16vw,500px)]'
      : 'text-[clamp(80px,22vw,140px)] sm:text-[clamp(140px,18vw,220px)] lg:text-[clamp(220px,16vw,320px)]'

  const propClasses = isHomeLayout
    ? HOME_PROP_CLASSES
    : `${propContainerClassName} ${propPositionClasses[propPosition]}`

  const propMotion = (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
      className={`pointer-events-none absolute z-[100] ${propClasses}`}
    >
      <motion.div
        className="relative h-full w-full"
        animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }
        }
      >
        <PropImage src={propSrc} alt={propAlt} priority />
      </motion.div>
    </motion.div>
  )

  const sublineEl = (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={
        isHomeLayout
          ? 'text-title-hero-sub relative z-0 mt-4 max-w-3xl text-[var(--ink)] md:mt-5'
          : 'text-title-hero-sub relative z-0 mt-4 max-w-3xl text-[var(--ink)] md:mt-5'
      }
    >
      {subline}
    </motion.p>
  )

  return (
    <section className="relative overflow-x-hidden bg-[var(--canvas)] md:flex md:min-h-[90vh] md:flex-col lg:overflow-hidden">
      <PageGutter className="relative pb-8 pt-24 md:mb-16 md:mt-auto md:pb-0 md:pt-28 lg:mb-20 lg:pt-32">
        <div
          className={
            isHomeLayout
              ? 'relative pl-10 sm:pl-14 lg:pl-20'
              : 'relative pl-10 sm:pl-14 lg:pl-20'
          }
        >
          {isHomeLayout ? (
            <div className="relative min-h-[clamp(260px,52vw,680px)]">
              {propMotion}

              <div className="relative z-10 max-w-3xl text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`relative z-0 font-display font-bold leading-[0.88] tracking-[-0.03em] text-[var(--ink)] ${wordmarkTextSize}`}
                >
                  {word}
                </motion.h1>
                {sublineEl}
              </div>

              {showScrollCue && (
                <ScrollCue className="relative z-10 mt-6 opacity-50 md:hidden" />
              )}
            </div>
          ) : (
            <>
              <div className="relative z-[100]">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`relative z-0 font-display font-bold leading-[0.88] tracking-[-0.03em] text-[var(--ink)] ${wordmarkTextSize}`}
                >
                  {word}
                </motion.h1>
                {propMotion}
              </div>
              {sublineEl}
              {showScrollCue && (
                <ScrollCue className="relative mt-6 opacity-50 md:hidden" />
              )}
            </>
          )}
        </div>
      </PageGutter>

      {showScrollCue && (
        <PageGutter className="pointer-events-none absolute bottom-6 left-0 right-0 z-0 hidden md:block lg:bottom-8">
          <div className="pl-10 sm:pl-14 lg:pl-20">
            <ScrollCue />
          </div>
        </PageGutter>
      )}
    </section>
  )
}
