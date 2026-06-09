'use client'

import clsx from 'clsx'

type WizardTextareaProps = {
  label: string
  placeholder?: string
  value: string
  onChange: (val: string) => void
  rows?: number
  required?: boolean
  minLength?: number
  showCount?: boolean
}

export default function WizardTextarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 5,
  required = false,
  minLength,
  showCount = false,
}: WizardTextareaProps) {
  const trimmedLength = value.trim().length
  const meetsMin = minLength ? trimmedLength >= minLength : true

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-sm font-medium leading-snug text-[var(--ink)]">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        rows={rows}
        className={clsx(
          'w-full resize-none rounded-2xl border border-[var(--line)] bg-[var(--canvas)] px-5 py-4',
          'font-body text-base text-[var(--ink)]',
          'placeholder:text-[var(--ink-soft)]',
          'transition-colors duration-150',
          'focus:border-[var(--ink)] focus:outline-none',
          minLength && !meetsMin && trimmedLength > 0 && 'border-[var(--ink-soft)]',
        )}
      />
      {showCount && minLength ? (
        <p
          className={clsx(
            'font-mono text-[10px] uppercase tracking-wider',
            meetsMin ? 'text-[var(--accent)]' : 'text-[var(--ink-soft)]',
          )}
        >
          {trimmedLength}/{minLength} characters
        </p>
      ) : null}
    </div>
  )
}
