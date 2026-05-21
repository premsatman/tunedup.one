import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'

type PillProps = {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'footer'
  href?: string
  arrow?: boolean
  onClick?: () => void
  className?: string
}

export default function Pill({
  children,
  variant = 'primary',
  href,
  arrow = false,
  onClick,
  className = '',
}: PillProps) {
  const base =
    'inline-flex items-center gap-2 rounded-full font-mono text-xs uppercase tracking-wide transition-all duration-200 hover:scale-[1.02]'

  const variants = {
    primary: 'bg-[var(--ink)] text-[var(--canvas)] px-6 py-3',
    outline: 'bg-[var(--canvas)] text-[var(--ink)] border border-[var(--line)] px-6 py-3',
    footer: 'bg-[var(--canvas)] text-[var(--ink)] border border-[var(--line)] px-5 py-2.5',
  }

  const content = (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow && <ArrowRight size={14} aria-hidden />}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={clsx(base, variants[variant], className)}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onClick?.()}
      className={clsx(base, variants[variant], className)}
    >
      {content}
    </button>
  )
}
