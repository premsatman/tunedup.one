'use client'

import clsx from 'clsx'
import Pill from '@/components/shared/Pill'

type WizardPillProps = {
  label: string
  subtext?: string
  selected: boolean
  onClick: () => void
  mode?: 'radio' | 'checkbox'
  disabled?: boolean
}

export default function WizardPill({
  label,
  subtext,
  selected,
  onClick,
  mode = 'radio',
  disabled = false,
}: WizardPillProps) {
  return (
    <Pill
      theme="contact"
      variant={selected ? 'primary' : 'outline'}
      onClick={onClick}
      disabled={disabled}
      role={mode === 'radio' ? 'radio' : 'checkbox'}
      aria-checked={selected}
      className={clsx(
        'h-auto min-h-0 normal-case tracking-normal',
        subtext && '!items-center !gap-1 !py-3'
      )}
    >
      <span className={clsx('inline-flex flex-col items-center gap-0.5', subtext && 'text-center')}>
        <span>{label}</span>
        {subtext && (
          <span
            className={clsx(
              'font-mono text-[10px] normal-case tracking-normal',
              selected ? 'text-[var(--canvas)]/70' : 'text-[var(--ink-soft)]'
            )}
          >
            {subtext}
          </span>
        )}
      </span>
    </Pill>
  )
}
