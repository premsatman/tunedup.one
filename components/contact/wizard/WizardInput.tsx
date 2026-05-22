'use client'

import clsx from 'clsx'

type WizardInputProps = {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (val: string) => void
  required?: boolean
  optional?: boolean
  autoComplete?: string
}

export default function WizardInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  optional = false,
  autoComplete,
}: WizardInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
        {label}
        {optional && (
          <span className="ml-2 normal-case tracking-normal text-[var(--ink-soft)] opacity-60">
            optional
          </span>
        )}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className={clsx(
          'w-full rounded-2xl border border-[var(--line)] bg-[var(--canvas)] px-5 py-4',
          'font-body text-base text-[var(--ink)]',
          'placeholder:text-[var(--ink-soft)]',
          'transition-colors duration-150',
          'focus:border-[var(--ink)] focus:outline-none'
        )}
      />
    </div>
  )
}
