import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { TimelinePhase } from '@/lib/types/mission'

const COLOR_CLASSES: Record<string, string> = {
  teal: 'bg-[var(--accent)]',
  orange: 'bg-orange-400',
  yellow: 'bg-yellow-400',
  pink: 'bg-pink-400',
  violet: 'bg-violet-400',
  lime: 'bg-lime-400',
  cyan: 'bg-cyan-400',
  amber: 'bg-amber-400',
}

export default function GanttTimeline({ phases }: { phases: TimelinePhase[] }) {
  if (!phases?.length) return null

  const totalWeeks = Math.max(
    ...phases.map((phase) => (phase.startWeek ?? 1) + (phase.durationWeeks ?? 1) - 1)
  )
  const weekMarkers = Array.from({ length: totalWeeks }, (_, i) => i + 1)

  const uniqueOperators = Array.from(
    new Map(
      phases
        .flatMap((phase) => phase.operators ?? [])
        .filter((operator) => operator._id && operator.name)
        .map((operator) => [operator._id, operator])
    ).values()
  )
  const hasAnyOperators = uniqueOperators.length > 0

  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-white p-6 lg:p-8">
      <div className="min-w-[700px]">
        <div className="mb-3 flex items-center gap-0 border-b border-[var(--line)] pb-3 pl-32">
          {weekMarkers.map((week) => (
            <div
              key={week}
              className="flex-1 text-center font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]"
            >
              W{week}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {phases.map((phase, index) => {
            const startWeek = phase.startWeek ?? 1
            const durationWeeks = phase.durationWeeks ?? 1
            const leftPercent = ((startWeek - 1) / totalWeeks) * 100
            const widthPercent = (durationWeeks / totalWeeks) * 100
            const operators = phase.operators ?? []

            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-32 flex-shrink-0">
                  <div className="font-body text-sm font-medium">{phase.phaseName}</div>
                </div>

                <div className="relative h-12 flex-1 overflow-hidden rounded-lg bg-[var(--canvas)]">
                  <div
                    className={`absolute bottom-0 top-0 flex items-center justify-between gap-2 rounded-lg px-3 ${
                      COLOR_CLASSES[phase.color ?? 'teal'] || COLOR_CLASSES.teal
                    }`}
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  >
                    {operators.length > 0 ? (
                      <div className="flex items-center -space-x-3">
                        {operators.slice(0, 4).map((operator, operatorIndex) => (
                          <div
                            key={operator._id}
                            className="relative h-10 w-10 overflow-hidden rounded-full bg-white"
                            style={{ zIndex: operators.length - operatorIndex }}
                            title={operator.name}
                          >
                            {operator.photo ? (
                              <Image
                                src={urlFor(operator.photo).width(120).height(120).url()}
                                alt={operator.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-[var(--ink)] font-mono text-xs font-bold text-[var(--canvas)]">
                                {operator.name?.[0]}
                              </div>
                            )}
                          </div>
                        ))}
                        {operators.length > 4 && (
                          <div
                            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black/30 font-mono text-[10px] font-bold text-white"
                            title={`${operators.length - 4} more`}
                          >
                            +{operators.length - 4}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span />
                    )}

                    <span className="ml-auto whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-black/70">
                      {durationWeeks}w
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {hasAnyOperators && (
          <div className="mt-6 border-t border-[var(--line)] pt-6">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)]">
              / Operators
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {uniqueOperators.map((operator) => (
                <div key={operator._id} className="flex items-center gap-3">
                  <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-[var(--canvas)]">
                    {operator.photo ? (
                      <Image
                        src={urlFor(operator.photo).width(64).height(64).url()}
                        alt={operator.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[var(--ink)] font-mono text-[10px] font-bold text-[var(--canvas)]">
                        {operator.name?.[0]}
                      </div>
                    )}
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-mid)]">
                    {operator.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
