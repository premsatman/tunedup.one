'use client'

import { usePathname } from 'next/navigation'

const isWorkDetailPage = (pathname: string) => /^\/work\/[^/]+$/.test(pathname)

type FooterShellProps = {
  children: React.ReactNode
}

export default function FooterShell({ children }: FooterShellProps) {
  const pathname = usePathname()
  const backgroundClass = isWorkDetailPage(pathname)
    ? 'bg-white'
    : 'bg-[var(--canvas)]'

  return (
    <footer
      className={`page-gutter relative w-full overflow-x-clip pb-8 sm:pb-10 ${backgroundClass}`}
    >
      {children}
    </footer>
  )
}
