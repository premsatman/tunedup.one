'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import PropImage from './PropImage'
import ScrollCue from './ScrollCue'
import PageGutter from './PageGutter'

type BrokenWordHeroProps = {
  word: string
  wordmarkSrc?: string
  propSrc: string
  propAlt: string
  subline: React.ReactNode
  propPosition?: 'center' | 'right' | 'left'
  propContainerClassName?: string
  layout?: 'default' | 'home'
  showScrollCue?: boolean
}

/* Mobile: prop offset right. Tablet+ (sm+): centered overlay, scales by breakpoint. */
const HOME_PROP_CLASSES =
  'left-[72%] top-[-10%] h-[clamp(150px,40vw,200px)] -translate-x-1/2 ' +
  'w-[clamp(100px,28vw,165px)] max-w-[min(72vw,180px)] ' +
  'sm:bottom-16 sm:top-[-18%] sm:left-1/2 sm:h-auto sm:max-h-none ' +
  'sm:w-[clamp(300px,42vw,520px)] sm:max-w-[min(54vw,540px)] ' +
  'md:bottom-20 md:w-[clamp(320px,40vw,600px)] md:max-w-[min(52vw,620px)] ' +
  'lg:bottom-20 lg:w-[clamp(340px,38vw,680px)] lg:max-w-[min(50vw,700px)] ' +
  'xl:w-[clamp(340px,36vw,720px)] xl:max-w-[min(56vw,740px)] ' +
  '2xl:bottom-28 2xl:w-[clamp(390px,34vw,820px)] 2xl:max-w-[min(52vw,840px)]'

export default function BrokenWordHero({
  word,
  wordmarkSrc,
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

  const wordmarkEl = wordmarkSrc ? (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative z-0 m-0 w-fit max-w-full origin-bottom-left p-0 leading-none"
    >
      <Image
        src={wordmarkSrc}
        alt={word}
        width={1810}
        height={450}
        priority
        unoptimized
        className="block h-auto w-[min(96vw,460px)] max-w-none sm:w-[min(98vw,820px)] md:w-[min(98vw,1020px)] lg:w-[min(96vw,1120px)] xl:w-[min(98vw,1800px)] 2xl:w-[min(100vw,2400px)]"
      />
    </motion.div>
  ) : (
    <motion.h1
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative z-0 font-display font-bold leading-[0.88] tracking-[-0.03em] text-[var(--ink)] ${wordmarkTextSize}`}
    >
      {word}
    </motion.h1>
  )

  const propClasses = isHomeLayout
    ? HOME_PROP_CLASSES
    : `${propContainerClassName} ${propPositionClasses[propPosition]}`

  const propMotion = (
    <motion.div
      initial={false}
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
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={
        isHomeLayout && wordmarkSrc
          ? 'text-title-hero-intro relative z-0 m-0 mt-0 max-w-3xl leading-none text-[var(--ink)]'
          : isHomeLayout
            ? 'text-title-hero-sub relative z-0 mt-4 max-w-3xl text-[var(--ink)] md:mt-5'
            : 'text-title-hero-sub relative z-0 mt-4 max-w-3xl text-[var(--ink)] md:mt-5'
      }
    >
      {subline}
    </motion.p>
  )

  return (
    <section className="relative flex min-h-0 flex-col overflow-hidden bg-[var(--canvas)] sm:min-h-[88svh] md:min-h-[90vh]">
      <PageGutter className="relative flex flex-1 flex-col justify-start pb-4 pt-28 sm:justify-center sm:pb-8 sm:pt-24 md:mt-auto md:flex-none md:justify-end md:pb-0 md:pt-28 lg:pt-32">
        <div className="relative pl-10 sm:pl-14 lg:pl-20">
          {isHomeLayout ? (
            <div className="relative mt-4 min-h-0 overflow-visible pb-2 sm:mt-0 sm:flex sm:min-h-[min(78vh,780px)] sm:flex-col sm:justify-end sm:pb-14 lg:min-h-[min(82vh,840px)] lg:pb-16 xl:mt-0 xl:flex xl:min-h-[min(88vh,920px)] xl:flex-col xl:justify-end xl:overflow-visible xl:pb-16">
              {propMotion}

              <div
                className={`relative z-10 flex w-full origin-bottom-left flex-col items-start gap-0 text-left ml-8 sm:mt-auto sm:translate-y-5 sm:pb-4 sm:ml-22 md:ml-24 md:translate-y-6 md:pb-5 lg:ml-28 lg:translate-y-7 lg:pb-6 xl:ml-28 xl:translate-y-7 xl:pb-6 2xl:ml-28 2xl:translate-y-7 2xl:pb-6 ${wordmarkSrc ? 'pt-0' : 'max-w-3xl'}`}
              >
                {wordmarkEl}
                {sublineEl}
              </div>

              {showScrollCue && (
                <ScrollCue className="relative z-20 mt-8 opacity-50 sm:mt-10 sm:shrink-0 lg:mt-12 xl:mt-12" />
              )}
            </div>
          ) : (
            <>
              <div className="relative z-[100]">
                {wordmarkEl}
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

      {showScrollCue && !isHomeLayout && (
        <PageGutter className="pointer-events-none absolute bottom-6 left-0 right-0 z-0 hidden md:block lg:bottom-8">
          <div className="pl-10 sm:pl-14 lg:pl-20">
            <ScrollCue />
          </div>
        </PageGutter>
      )}
    </section>
  )
}
