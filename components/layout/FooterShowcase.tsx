'use client'

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

const WORD = 'tunedup'

type FooterCharProps = {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
}

const FooterChar = ({ char, index, total, progress }: FooterCharProps) => {
  const start = index / total * 0.5
  const end = Math.min(start + 0.14, 1)
  const y = useTransform(progress, [start, end], [56, 0])
  const opacity = useTransform(progress, [start, end], [0, 1])

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span className="inline-block will-change-transform" style={{ y, opacity }}>
        {char}
      </motion.span>
    </span>
  )
}

export default function FooterShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end 0.55'],
  })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-visible bg-[var(--canvas)] pb-0 pt-12 md:pt-20"
    >
      <div className="relative z-0">
        <h2
          className="text-title-footer m-0 -mb-[0.035em] pb-0 text-center leading-[0.82] text-[var(--ink)]"
          aria-label={WORD}
        >
          {shouldReduceMotion
            ? WORD
            : WORD.split('').map((char, index) => (
                <FooterChar
                  key={`${char}-${index}`}
                  char={char}
                  index={index}
                  total={WORD.length}
                  progress={scrollYProgress}
                />
              ))}
        </h2>
      </div>
    </section>
  )
}
