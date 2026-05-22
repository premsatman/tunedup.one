'use client'

import clsx from 'clsx'

type WizardTextareaProps = {
  label: string
  placeholder?: string
  value: string
  onChange: (val: string) => void
  rows?: number
  required?: boolean
  hint?: string
}

export default function WizardTextarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 5,
  required = false,
  hint,
}: WizardTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
        {label}
      </label>
      {hint && <p className="-mt-1 font-body text-sm text-[var(--ink-soft)]">{hint}</p>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={rows}
        className={clsx(
          'w-full resize-none rounded-2xl border border-[var(--line)] bg-[var(--canvas)] px-5 py-4',
          'font-body text-base text-[var(--ink)]',
          'placeholder:text-[var(--ink-soft)]',
          'transition-colors duration-150',
          'focus:border-[var(--ink)] focus:outline-none'
        )}
      />
    </div>
  )
}
