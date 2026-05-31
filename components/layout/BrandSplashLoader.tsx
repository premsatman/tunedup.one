'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { brandAlt, brandAssets, brandLogoDimensions } from '@/lib/brand'

/** Temporary splash — set to false to disable without removing the component. */
export const BRAND_SPLASH_ENABLED = true

const HOLD_MS = 900
const ZOOM_MS = 1100

type SplashPhase = 'hold' | 'zoom' | 'done'

type BrandSplashLoaderProps = {
  children: React.ReactNode
}

const BrandSplashLoader = ({ children }: BrandSplashLoaderProps) => {
  const shouldReduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<SplashPhase>(BRAND_SPLASH_ENABLED ? 'hold' : 'done')

  useEffect(() => {
    if (!BRAND_SPLASH_ENABLED || shouldReduceMotion) {
      setPhase('done')
      return
    }

    const zoomTimer = window.setTimeout(() => setPhase('zoom'), HOLD_MS)
    const doneTimer = window.setTimeout(() => setPhase('done'), HOLD_MS + ZOOM_MS)

    return () => {
      window.clearTimeout(zoomTimer)
      window.clearTimeout(doneTimer)
    }
  }, [shouldReduceMotion])

  useEffect(() => {
    if (phase === 'done') return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [phase])

  const isVisible = phase !== 'done'

  return (
    <>
      <div
        className={isVisible ? 'pointer-events-none select-none' : undefined}
        aria-hidden={isVisible}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="brand-splash"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 'zoom' ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: phase === 'zoom' ? ZOOM_MS / 1000 : 0,
              ease: [0.4, 0, 0.2, 1],
              delay: phase === 'zoom' ? 0.55 : 0,
            }}
            aria-hidden={false}
            role="status"
            aria-label="Loading TunedUp"
          >
            <motion.div
              className="relative size-[min(28vw,120px)] sm:size-[min(22vw,160px)]"
              initial={{ scale: 1, opacity: 1 }}
              animate={
                phase === 'hold'
                  ? {
                      scale: [1, 1.06, 1],
                      opacity: [0.88, 1, 0.88],
                    }
                  : {
                      scale: 18,
                      opacity: 0,
                    }
              }
              transition={
                phase === 'hold'
                  ? {
                      duration: 1.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : {
                      duration: ZOOM_MS / 1000,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              <Image
                src={brandAssets.squareWhite}
                alt={brandAlt}
                width={brandLogoDimensions.square.width}
                height={brandLogoDimensions.square.height}
                priority
                className="h-full w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default BrandSplashLoader
