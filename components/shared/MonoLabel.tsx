export default function MonoLabel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`font-mono text-xs uppercase tracking-wide text-[var(--ink-soft)] ${className}`}
    >
      {children}
    </span>
  )
}
