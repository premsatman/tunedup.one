export default function ScrollCue({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-mono text-xs uppercase tracking-wide text-[var(--ink-soft)]">
        Scroll
      </span>
      <div className="w-12 h-px bg-[var(--ink-soft)]" aria-hidden />
    </div>
  )
}
