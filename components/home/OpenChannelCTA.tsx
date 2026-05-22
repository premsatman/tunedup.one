'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRobotDebugOptional } from '@/components/dev/RobotDebugContext'
import ContainerSection from '@/components/shared/ContainerSection'
import Pill from '@/components/shared/Pill'
import PropImage from '@/components/shared/PropImage'

const BREATH_TRANSITION = {
  duration: 5.5,
  repeat: Infinity,
  ease: 'easeInOut' as const,
  delay: 1,
}

const ROBOT_MANUAL_CLASSES =
  'pointer-events-none absolute top-1/2 z-40 aspect-[2066/1373] max-w-none -translate-y-1/2'

const ROBOT_PRESET_CLASSES =
  'pointer-events-none absolute right-[-45%] top-1/2 z-40 aspect-[2066/1373] w-[85vw] max-w-none -translate-y-1/2 sm:right-[-50%] sm:w-[90vw] md:right-[-50%] md:w-[100vw] lg:right-[-35%] lg:w-[80vw] xl:right-[-35%] xl:w-[75vw] 2xl:right-[-27%] 2xl:w-[63vw] min-[1920px]:right-[-24%] min-[1920px]:w-[58vw] min-[2200px]:right-[-22%] min-[2200px]:w-[54vw] min-[2560px]:right-[-20%] min-[2560px]:w-[50vw]'

export default function OpenChannelCTA() {
  const shouldReduceMotion = useReducedMotion()
  const robotDebug = useRobotDebugOptional()

  const robotStyle =
    robotDebug?.manual === true
      ? {
          width: `${robotDebug.vw}vw`,
          right: `-${robotDebug.rightPct}%`,
        }
      : undefined

  return (
    <ContainerSection className="relative overflow-hidden !pt-8 !pb-20 sm:!pb-24 lg:!py-24">
      <div className="relative mx-auto flex w-full min-h-[min(64vh,680px)] items-center sm:min-h-[min(70vh,760px)] lg:min-h-[min(78vh,920px)] xl:min-h-[min(82vh,1000px)]">
        <div className="relative z-10 w-full min-w-0 max-w-xl shrink-0 text-left lg:max-w-2xl lg:pl-16 xl:max-w-3xl xl:pl-24 2xl:pl-32">
          <h2 className="text-title-cta">
            <span className="block whitespace-nowrap">Let&apos;s</span>
            <span className="block whitespace-nowrap">tune in.</span>
          </h2>

          <div className="relative z-10 mt-24 flex flex-col items-start gap-4 sm:mt-10 xl:flex-row xl:flex-nowrap xl:gap-3">
            <Pill variant="primary" href="/contact">
              Open Channel
            </Pill>
            <Pill variant="outline" href="/contact">
              Sync with Mission Control
            </Pill>
          </div>
        </div>

        <div
          className={robotDebug?.manual ? ROBOT_MANUAL_CLASSES : ROBOT_PRESET_CLASSES}
          style={robotStyle}
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
