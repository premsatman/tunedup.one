'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { brandAlt, brandAssets, brandLogoDimensions } from '@/lib/brand'

const footerWordmarkMaskStyle = {
  aspectRatio: `${brandLogoDimensions.full.width} / ${brandLogoDimensions.full.height}`,
  maskImage: `url(${brandAssets.fullBlack})`,
  WebkitMaskImage: `url(${brandAssets.fullBlack})`,
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
} as const

const FooterWordmark = () => (
  <div
    role="img"
    aria-label={brandAlt}
    className="block h-auto w-full max-w-none bg-[var(--dark)]"
    style={footerWordmarkMaskStyle}
  />
)

export default function FooterShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end 0.55'],
  })

  const y = useTransform(scrollYProgress, [0.2, 0.75], [48, 0])
  const opacity = useTransform(scrollYProgress, [0.2, 0.75], [0, 1])

  return (
    <div ref={sectionRef} className="w-full leading-none">
      <h2 className="m-0 w-full" aria-label={brandAlt}>
        {shouldReduceMotion ? (
          <FooterWordmark />
        ) : (
          <motion.div className="w-full will-change-transform" style={{ y, opacity }}>
            <FooterWordmark />
          </motion.div>
        )}
      </h2>
    </div>
  )
}
