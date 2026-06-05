import type { OutcomeItem } from '@/lib/types/mission'

export default function OutcomesStrip({ outcomes }: { outcomes?: OutcomeItem[] }) {
  if (!outcomes?.length) return null

  return (
    <section className="py-20 lg:py-24 bg-[var(--dark)] my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            / Outcomes
          </span>
        </div>

        <div
          className={`grid gap-10 lg:gap-8 ${
            outcomes.length === 3
              ? 'grid-cols-2 md:grid-cols-3'
              : 'grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {outcomes.map((outcome, i) => (
            <div key={i}>
              <div className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-0.04em] text-[#F5F1E8]">
                {outcome.number}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-[rgba(245,241,232,0.5)] mt-3 leading-relaxed">
                {outcome.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
