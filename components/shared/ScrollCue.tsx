export default function ScrollCue({ className = '' }: { className?: string }) {
  return (
    <p
      className={`m-0 font-display text-lg font-bold uppercase tracking-wide text-[var(--ink-soft)] sm:text-xl ${className}`}
    >
      Scroll
    </p>
  )
}
