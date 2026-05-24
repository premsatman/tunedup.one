'use client'

import Link from 'next/link'
import { playClickSound } from '@/lib/playClickSound'

export default function WorkDetailHeroLogo() {
  const handleClick = () => playClickSound()

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="mb-10 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:mb-12"
      aria-label="TunedUp home"
    >
      tunedup
    </Link>
  )
}
