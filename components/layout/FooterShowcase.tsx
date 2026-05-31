'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { brandAlt, brandAssets, brandLogoDimensions } from '@/lib/brand'

export default function FooterShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end 0.55'],
  })

  const y = useTransform(scrollYProgress, [0.2, 0.75], [48, 0])
  const opacity = useTransform(scrollYProgress, [0.2, 0.75], [0, 1])

  const wordmarkImage = (
    <Image
      src={brandAssets.fullBlack}
      alt={brandAlt}
      width={brandLogoDimensions.full.width}
      height={brandLogoDimensions.full.height}
      className="block h-auto w-full max-w-none"
    />
  )

  return (
    <div ref={sectionRef} className="w-full leading-none">
      <h2 className="m-0 w-full" aria-label={brandAlt}>
        {shouldReduceMotion ? (
          wordmarkImage
        ) : (
          <motion.div className="w-full will-change-transform" style={{ y, opacity }}>
            {wordmarkImage}
          </motion.div>
        )}
      </h2>
    </div>
  )
}
