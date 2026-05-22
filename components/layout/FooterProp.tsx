'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const FOOTER_PROP_SRC = '/props/prop-footer1.png'

const BREATH_TRANSITION = {
  duration: 5.5,
  repeat: Infinity,
  ease: 'easeInOut' as const,
  delay: 1,
}

export default function FooterProp() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 w-full -translate-y-[65%] sm:-translate-y-1/2">
      <div className="origin-bottom max-sm:scale-[0.92] sm:scale-[0.91] md:scale-[0.91] lg:scale-[0.93] xl:scale-[0.95] 2xl:scale-100">
        <motion.div
          className="relative h-[min(52vh,580px)] w-full min-h-[260px] sm:h-[min(45vh,600px)] sm:min-h-0 md:h-[min(46vh,660px)] lg:h-[min(48vh,760px)] xl:h-[min(50vh,860px)] 2xl:h-[min(58vh,1040px)]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            className="relative h-full w-full"
            animate={shouldReduceMotion ? undefined : { y: [0, -18, 0] }}
            transition={shouldReduceMotion ? undefined : BREATH_TRANSITION}
          >
            <Image
              src={FOOTER_PROP_SRC}
              alt="TunedUp Mission Control — tuning capsule prop"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 80vw"
              className="h-full w-full object-contain object-bottom"
              priority={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
