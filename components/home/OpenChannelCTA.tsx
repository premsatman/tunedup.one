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
    <ContainerSection className="!pt-8 !pb-24 lg:!pt-12 lg:!pb-32">
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 sm:max-w-6xl lg:max-w-7xl lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:max-w-[76rem] xl:gap-16">
        <div className="relative z-10 w-full min-w-0 shrink-0 text-center sm:max-w-xl lg:max-w-lg lg:text-left xl:max-w-xl">
          <h2 className="text-title-cta">
            <span className="block whitespace-nowrap">Let&apos;s</span>
            <span className="block whitespace-nowrap">tune in.</span>
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-3 sm:flex-nowrap lg:justify-start">
            <Pill variant="primary" href="/contact">
              Open Channel
            </Pill>
            <Pill variant="outline" href="/contact">
              Sync with Mission Control
            </Pill>
          </div>
        </div>

        <div className="pointer-events-none relative mx-auto aspect-[4/5] w-full max-w-[280px] shrink-0 sm:max-w-[300px] lg:mx-0 lg:aspect-auto lg:h-[min(480px,52vh)] lg:w-[min(360px,36vw)] lg:max-w-[380px]">
          <motion.div
            className="relative h-full w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="relative h-full w-full"
              animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={shouldReduceMotion ? undefined : BREATH_TRANSITION}
            >
              <PropImage
                src="/props/prop-helmet.png"
                alt="TunedUp Mission Control helmet — HELM-03"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ContainerSection>
  )
}
