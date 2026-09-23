'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/layout/Footer'

const isWorkDetailPath = (pathname: string) => /^\/work\/[^/]+$/.test(pathname)

export default function ConditionalFooter() {
  const pathname = usePathname()

  if (isWorkDetailPath(pathname)) return null

  return <Footer />
}
