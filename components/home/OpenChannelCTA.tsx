'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ContainerSection from '@/components/shared/ContainerSection'
import Pill from '@/components/shared/Pill'
import PropImage from '@/components/shared/PropImage'

const BREATH_TRANSITION = {
  duration: 5.5,
  repeat: Infinity,
  ease: 'easeInOut' as const,
  delay: 1,
}

export default function OpenChannelCTA() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <ContainerSection className="relative overflow-hidden !pt-8 !pb-20 sm:!pb-24 lg:!py-24">
      <div className="relative mx-auto flex w-full min-h-[min(64vh,680px)] items-center sm:min-h-[min(70vh,760px)] lg:min-h-[min(78vh,920px)] xl:min-h-[min(82vh,1000px)]">
        <div className="relative z-10 w-full min-w-0 max-w-xl shrink-0 text-left lg:max-w-2xl lg:pl-16 xl:max-w-3xl xl:pl-24 2xl:pl-32">
          <h2 className="text-title-cta">
            <span className="block whitespace-nowrap">Let&apos;s</span>
            <span className="block whitespace-nowrap">tune in.</span>
          </h2>

          <div className="relative z-10 mt-24 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:flex-nowrap sm:gap-3">
            <Pill variant="primary" href="/contact">
              Open Channel
            </Pill>
            <Pill variant="outline" href="/contact">
              Sync with Mission Control
            </Pill>
          </div>
        </div>

        <div
          className="pointer-events-none absolute right-[-50%] top-1/2 z-40 aspect-[2066/1373] sm:right-[-10%] lg:right-[-20%] h-[min(44vh,400px)] w-[min(92vw,500px)] max-w-none -translate-y-1/2 sm:h-[min(50vh,460px)] sm:w-[min(88vw,560px)] md:h-[min(56vh,520px)] md:w-[min(82vw,640px)] lg:h-[min(82vh,1240px)] lg:w-[min(64vw,1040px)] xl:h-[min(86vh,1340px)] xl:w-[min(68vw,1120px)] 2xl:h-[min(90vh,1460px)] 2xl:w-[min(72vw,1240px)]"
          aria-hidden
        >
          <motion.div
            className="relative h-full w-full"
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="relative h-full w-full"
              animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={shouldReduceMotion ? undefined : BREATH_TRANSITION}
            >
              <PropImage
                src="/props/prop-robot.png"
                alt="TunedUp Mission Control robot at the tuning station"
                imageClassName="object-contain object-right"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ContainerSection>
  )
}
