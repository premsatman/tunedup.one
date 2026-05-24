'use client'

import { useState } from 'react'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import type { MissionListItem, MissionType } from '@/lib/types/mission'
import MissionCard from './MissionCard'

const filters: { value: 'all' | MissionType; label: string }[] = [
  { value: 'all', label: 'All Missions' },
  { value: 'ministry', label: 'Ministry' },
  { value: 'impact', label: 'Impact' },
  { value: 'solo', label: 'Solo' },
  { value: 'launch', label: 'Launch' },
]

type MissionGridProps = {
  missions: MissionListItem[]
}

export default function MissionGrid({ missions }: MissionGridProps) {
  const [filter, setFilter] = useState<'all' | MissionType>('all')

  const filtered =
    filter === 'all' ? missions : missions.filter((mission) => mission.missionType === filter)

  return (
    <ContainerSection>
      <MonoLabel className="mb-4 block">/ Projects</MonoLabel>
      <h2 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
        Each mission we&apos;ve flown carries a frequency it now{' '}
        <HighlightWord>broadcasts</HighlightWord> on its own.
      </h2>

      <div className="mt-12 flex flex-wrap gap-3">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            className={[
              'rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200',
              filter === item.value
                ? 'bg-[var(--ink)] text-[var(--canvas)]'
                : 'border border-[var(--line)] bg-[var(--canvas)] text-[var(--ink)] hover:border-[var(--ink)] hover:scale-[1.02]',
            ].join(' ')}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {filtered.map((mission) => (
            <MissionCard key={mission._id} {...mission} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="font-body text-[var(--ink-soft)]">
            No missions in this category yet. Check back soon.
          </p>
        </div>
      )}
    </ContainerSection>
  )
}
