import type { MissionDetail } from '@/lib/types/mission'

const CATEGORY_LABELS: Record<string, string> = {
  'brand-identity': 'Brand & Identity',
  development: 'Development',
  design: 'Design',
  marketing: 'Marketing',
  strategy: 'Strategy',
  automation: 'Automation',
}

export default function CaseHeader({ mission }: { mission: MissionDetail }) {
  if (!mission) return null

  return (
    <section className="pt-32 lg:pt-40 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
              {mission.missionCodename}
            </span>
          </div>
          {mission.year && (
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
              {mission.year}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {mission.workedOn?.map((item) => (
            <span
              key={item.category}
              className="font-mono text-xs uppercase tracking-wider bg-[var(--canvas)] border border-[var(--line)] rounded-full px-4 py-1.5"
            >
              {CATEGORY_LABELS[item.category] || item.category}
            </span>
          ))}

          {mission.duration && (
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink-soft)] ml-auto">
              {mission.duration}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
