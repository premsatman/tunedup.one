'use client'

import { ArrowUp } from 'lucide-react'
import Pill from '@/components/shared/Pill'
import { scrollToTop } from '@/lib/scrollToTop'

export default function FooterScrollButton() {
  return (
    <Pill variant="primary" onClick={scrollToTop} className="gap-2">
      Go Up <ArrowUp size={15} aria-hidden />
    </Pill>
  )
}
