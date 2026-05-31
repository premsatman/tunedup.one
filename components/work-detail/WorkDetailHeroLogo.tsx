'use client'

import BrandLogo from '@/components/shared/BrandLogo'
import { playClickSound } from '@/lib/playClickSound'

export default function WorkDetailHeroLogo() {
  const handleClick = () => playClickSound()

  return (
    <div className="mb-10 lg:mb-12">
      <BrandLogo
        href="/"
        onClick={handleClick}
        variant="full"
        theme="light"
        className="h-8 sm:h-9"
      />
    </div>
  )
}
