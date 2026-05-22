'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { playBubbleSound } from '@/lib/playBubbleSound'

export type PillTheme = 'default' | 'contact'

type PillProps = {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'footer'
  theme?: PillTheme
  href?: string
  arrow?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
  soundOnHover?: boolean
  role?: React.AriaRole
  'aria-checked'?: boolean | 'true' | 'false'
  'aria-disabled'?: boolean
  title?: string
}

const pillBase =
  'group relative inline-flex items-center justify-center overflow-hidden rounded-full font-mono text-sm uppercase tracking-wide transition-transform duration-300 ease-out hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'

const variantStyles: Record<
  PillTheme,
  Record<'primary' | 'outline' | 'footer', string>
> = {
  default: {
    primary:
      'bg-[var(--ink)] text-[var(--canvas)] px-7 py-3.5 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]',
    outline: 'bg-[var(--silver-gray)] text-[var(--ink)] px-7 py-3.5',
    footer: 'bg-[var(--silver-gray)] text-[var(--ink)] px-6 py-3 text-xs',
  },
  contact: {
    primary:
      'bg-[var(--ink)] text-[var(--canvas)] px-7 py-3.5 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]',
    outline: 'bg-[var(--canvas)] text-[var(--ink)] px-7 py-3.5',
    footer: 'bg-[var(--canvas)] text-[var(--ink)] px-6 py-3 text-xs',
  },
}

const sweepVariants: Record<PillTheme, Record<'primary' | 'outline' | 'footer', string>> = {
  default: {
    primary: 'bg-white/14',
    outline: 'bg-black/10',
    footer: 'bg-black/10',
  },
  contact: {
    primary: 'bg-white/14',
    outline: 'bg-black/10',
    footer: 'bg-black/10',
  },
}

const PillContent = ({
  children,
  arrow,
  variant,
  theme,
}: {
  children: React.ReactNode
  arrow: boolean
  variant: 'primary' | 'outline' | 'footer'
  theme: PillTheme
}) => (
  <>
    <span
      aria-hidden
      className={clsx(
        'pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0',
        sweepVariants[theme][variant]
      )}
    />
    <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    {arrow && (
      <ArrowRight size={15} className="relative z-10 shrink-0" aria-hidden />
    )}
  </>
)

export default function Pill({
  children,
  variant = 'primary',
  theme = 'default',
  href,
  arrow = false,
  onClick,
  className = '',
  disabled = false,
  soundOnHover = true,
  role,
  'aria-checked': ariaChecked,
  'aria-disabled': ariaDisabled,
  title,
}: PillProps) {
  const classes = clsx(
    pillBase,
    variantStyles[theme][variant],
    disabled && 'cursor-not-allowed opacity-40 hover:scale-100',
    className
  )

  const handleMouseEnter = () => {
    if (disabled || !soundOnHover) return
    playBubbleSound()
  }

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        className={classes}
      >
        <PillContent arrow={arrow} variant={variant} theme={theme}>
          {children}
        </PillContent>
      </Link>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      role={role}
      aria-checked={ariaChecked}
      aria-disabled={ariaDisabled ?? disabled}
      title={title}
      onClick={disabled ? undefined : () => onClick?.()}
      onMouseEnter={handleMouseEnter}
      className={classes}
    >
      <PillContent arrow={arrow} variant={variant} theme={theme}>
        {children}
      </PillContent>
    </button>
  )
}
