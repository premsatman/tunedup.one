import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { hasSanityImage } from '@/lib/sanity/hasSanityImage'
import type { MissionDetail, TimelineOperator } from '@/lib/types/mission'

const telemetryRows = [
  { key: 'clientName' as const, label: '/Client' },
  { key: 'sector' as const, label: '/Sector' },
  { key: 'role' as const, label: '/Role' },
  { key: 'frequencyTuned' as const, label: '/Frequency Tuned' },
] as const

type TelemetryKey = (typeof telemetryRows)[number]['key']

const parseTelemetryTags = (value?: string): string[] => {
  if (!value?.trim()) return []
  return value
    .split(/[,|]/)
    .map((part) => part.trim())
    .filter(Boolean)
}

const TelemetryTag = ({ label }: { label: string }) => (
  <span className="inline-block rounded-2xl bg-[var(--canvas)] px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-[var(--ink-mid)] sm:px-4 sm:py-2 sm:text-sm">
    {label}
  </span>
)

const TelemetryCell = ({
  label,
  tags,
}: {
  label: string
  tags: string[]
}) => (
  <div className="flex min-w-0 flex-col gap-1.5">
    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)]">
      {label}
    </span>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TelemetryTag key={tag} label={tag} />
      ))}
    </div>
  </div>
)

const resolveOperator = (mission: MissionDetail): TimelineOperator | undefined => {
  if (mission.frequencyTunedOperator) return mission.frequencyTunedOperator

  const tunedName = mission.frequencyTuned?.trim().toLowerCase()
  if (tunedName && mission.projectTimeline) {
    for (const phase of mission.projectTimeline) {
      const match = phase.operators?.find(
        (operator) => operator.name?.trim().toLowerCase() === tunedName,
      )
      if (match) return match
    }
  }

  for (const phase of mission.projectTimeline ?? []) {
    const first = phase.operators?.[0]
    if (first) return first
  }

  return undefined
}

const getActiveRows = (mission: MissionDetail) =>
  telemetryRows
    .map((row) => ({
      ...row,
      tags: parseTelemetryTags(mission[row.key]),
    }))
    .filter((row) => row.tags.length > 0)

export default function ProjectTelemetryPanel({ mission }: { mission: MissionDetail }) {
  const activeRows = getActiveRows(mission)
  if (activeRows.length === 0) return null

  const operator = resolveOperator(mission)
  const hasPhoto = hasSanityImage(operator?.photo)

  const mobileLeftKeys: TelemetryKey[] = ['clientName', 'role']
  const mobileRightKeys: TelemetryKey[] = ['sector', 'frequencyTuned']

  const mobileLeftRows = activeRows.filter((row) => mobileLeftKeys.includes(row.key))
  const mobileRightRows = activeRows.filter((row) => mobileRightKeys.includes(row.key))

  return (
    <section
      className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pb-10 pt-2 sm:pb-12 lg:px-12 lg:pb-14"
      aria-label="Project telemetry"
    >
      <div
        className={`mx-auto flex max-w-5xl overflow-hidden rounded-[1.75rem] bg-white sm:rounded-[2rem] lg:min-h-[5.75rem] lg:rounded-[2.25rem] ${
          hasPhoto ? 'flex-row items-stretch' : 'flex-col'
        }`}
      >
        {hasPhoto && operator?.photo && (
          <div className="relative w-[5.75rem] shrink-0 self-stretch sm:w-[7rem] md:w-[min(38%,260px)] lg:min-h-[5.75rem] lg:w-[min(34%,300px)] xl:w-[320px]">
            <Image
              src={urlFor(operator.photo).width(800).url()}
              alt={operator.name ?? mission.frequencyTuned ?? 'Operator'}
              fill
              sizes="(max-width: 768px) 92px, (max-width: 1024px) 260px, 320px"
              className="object-cover object-center"
            />
          </div>
        )}

        <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-3 gap-y-4 px-3 py-4 sm:gap-x-4 sm:gap-y-5 sm:px-4 sm:py-5 md:hidden">
          <div className="flex flex-col gap-4 sm:gap-5">
            {mobileLeftRows.map(({ key, label, tags }) => (
              <TelemetryCell key={key} label={label} tags={tags} />
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:gap-5">
            {mobileRightRows.map(({ key, label, tags }) => (
              <TelemetryCell key={key} label={label} tags={tags} />
            ))}
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 flex-col justify-center gap-3 px-5 py-4 sm:gap-3.5 sm:px-6 sm:py-5 md:flex lg:gap-2.5 lg:px-8 lg:py-4">
          {activeRows.map(({ key, label, tags }) => (
            <div
              key={key}
              className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4 lg:gap-5"
            >
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)] sm:w-[9.5rem]">
                {label}
              </span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TelemetryTag key={tag} label={tag} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
