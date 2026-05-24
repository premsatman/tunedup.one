'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { urlFor } from '@/lib/sanity/client'
import type { TimelineOperator, TimelinePhase } from '@/lib/types/mission'

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

const getPhaseColorClass = (color?: string) =>
  COLOR_CLASSES[color ?? 'teal'] ?? COLOR_CLASSES.teal

const chunkPhases = (phases: TimelinePhase[], perRow: number) => {
  const rows: TimelinePhase[][] = []
  for (let index = 0; index < phases.length; index += perRow) {
    rows.push(phases.slice(index, index + perRow))
  }
  return rows
}

const usePhasesPerRow = () => {
  const [phasesPerRow, setPhasesPerRow] = useState(2)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const handleChange = () => {
      setPhasesPerRow(mediaQuery.matches ? 3 : 2)
    }

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return phasesPerRow
}

const OperatorAvatars = ({ operators }: { operators: TimelineOperator[] }) => {
  if (operators.length === 0) return null

  return (
    <div className="flex shrink-0 items-center -space-x-2">
      {operators.slice(0, 3).map((operator, operatorIndex) => (
        <div
          key={operator._id}
          className="relative h-8 w-8 overflow-hidden rounded-full bg-white ring-2 ring-black/10"
          style={{ zIndex: operators.length - operatorIndex }}
          title={operator.name}
        >
          {operator.photo ? (
            <Image
              src={urlFor(operator.photo).width(96).height(96).url()}
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
      ))}
      {operators.length > 3 && (
        <div
          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black/25 font-mono text-[9px] font-bold text-white ring-2 ring-black/10"
          title={`${operators.length - 3} more`}
        >
          +{operators.length - 3}
        </div>
      )}
    </div>
  )
}

const SerpentinePhaseSegment = ({
  phase,
  isFirstInRow,
  isLastInRow,
  direction,
}: {
  phase: TimelinePhase
  isFirstInRow: boolean
  isLastInRow: boolean
  direction: 'ltr' | 'rtl'
}) => {
  const durationWeeks = phase.durationWeeks ?? 1
  const operators = phase.operators ?? []
  const colorClass = getPhaseColorClass(phase.color)

  const roundedClass =
    direction === 'ltr'
      ? `${isFirstInRow ? 'rounded-l-2xl' : ''} ${isLastInRow ? 'rounded-r-2xl' : ''}`
      : `${isFirstInRow ? 'rounded-r-2xl' : ''} ${isLastInRow ? 'rounded-l-2xl' : ''}`

  return (
    <div
      className={`relative flex min-h-[4.75rem] min-w-0 flex-1 flex-col justify-center gap-2 px-3 py-3 sm:min-h-[5.25rem] sm:px-4 ${colorClass} ${roundedClass} ${
        !isLastInRow
          ? direction === 'ltr'
            ? 'border-r border-black/10'
            : 'border-l border-black/10'
          : ''
      }`}
      style={{ flexGrow: durationWeeks, flexBasis: 0 }}
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <p className="min-w-0 flex-1 font-body text-xs font-semibold leading-snug text-black/85 sm:text-sm">
          {phase.phaseName}
        </p>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-black/60 sm:text-[10px]">
          {durationWeeks}w
        </span>
      </div>

      {operators.length > 0 && <OperatorAvatars operators={operators} />}
    </div>
  )
}

const SerpentineTurn = ({ side }: { side: 'left' | 'right' }) => (
  <div
    className={`flex h-8 w-full ${side === 'right' ? 'justify-end pr-1' : 'justify-start pl-1'}`}
    aria-hidden
  >
    <div
      className={`h-full w-9 border-[var(--canvas)] sm:w-10 ${
        side === 'right'
          ? 'rounded-br-[1.35rem] border-b-[5px] border-r-[5px]'
          : 'rounded-bl-[1.35rem] border-b-[5px] border-l-[5px]'
      }`}
    />
  </div>
)

const SerpentineRow = ({
  phases,
  direction,
}: {
  phases: TimelinePhase[]
  direction: 'ltr' | 'rtl'
}) => (
  <div
    className={`flex w-full overflow-hidden rounded-2xl bg-[var(--canvas)] ${
      direction === 'rtl' ? 'flex-row-reverse' : ''
    }`}
  >
    {phases.map((phase, index) => (
      <SerpentinePhaseSegment
        key={`${phase.phaseName ?? 'phase'}-${index}`}
        phase={phase}
        isFirstInRow={index === 0}
        isLastInRow={index === phases.length - 1}
        direction={direction}
      />
    ))}
  </div>
)

export default function GanttTimelineSerpentine({ phases }: { phases: TimelinePhase[] }) {
  const phasesPerRow = usePhasesPerRow()

  const rows = useMemo(
    () => chunkPhases(phases, phasesPerRow),
    [phases, phasesPerRow],
  )

  if (!phases?.length) return null

  return (
    <div className="lg:hidden">
      <div className="overflow-hidden rounded-2xl bg-white p-4 sm:p-5">
        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)]">
          / Timeline
        </div>

        <div className="space-y-0">
          {rows.map((rowPhases, rowIndex) => {
            const direction: 'ltr' | 'rtl' = rowIndex % 2 === 0 ? 'ltr' : 'rtl'
            const isLastRow = rowIndex === rows.length - 1

            return (
              <div key={`row-${rowIndex}`}>
                <SerpentineRow phases={rowPhases} direction={direction} />
                {!isLastRow && (
                  <SerpentineTurn side={direction === 'ltr' ? 'right' : 'left'} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
