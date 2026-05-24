'use client'

import { usePathname } from 'next/navigation'

const isWorkDetailPage = (pathname: string) => /^\/work\/[^/]+$/.test(pathname)

type FooterShellProps = {
  children: React.ReactNode
}

export default function FooterShell({ children }: FooterShellProps) {
  const pathname = usePathname()
  const backgroundClass = isWorkDetailPage(pathname)
    ? 'bg-[var(--page-bg)]'
    : 'bg-[var(--canvas)]'

  return (
    <footer
      className={`relative overflow-visible ${backgroundClass} px-8 pb-8 sm:px-12 sm:pb-10 lg:px-20 xl:px-28 2xl:px-36`}
    >
      {children}
    </footer>
  )
}
