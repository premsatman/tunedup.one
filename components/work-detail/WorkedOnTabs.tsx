'use client'

import { useCallback, useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, X } from 'lucide-react'
import { getWorkedOnCategoryLabel } from '@/lib/data/workedOnCategories'
import type { WorkedOnItem } from '@/lib/types/mission'

export const featuredContentWrap =
  'relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12'

const WorkedOnKeyword = ({
  label,
  compact = false,
}: {
  label: string
  compact?: boolean
}) => (
  <span
    className={`inline-block bg-white/[0.1] font-mono uppercase tracking-wide text-[var(--canvas)] ${
      compact
        ? 'rounded-2xl px-2.5 py-1.5 text-xs sm:text-sm'
        : 'rounded-2xl px-4 py-2.5 text-xs sm:text-sm'
    }`}
  >
    {label}
  </span>
)

const useIsLargeScreen = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    const handleChange = (event: MediaQueryListEvent) => {
      setIsLargeScreen(event.matches)
    }

    setIsLargeScreen(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isLargeScreen
}

type WorkedOnTabsProps = {
  workedOn?: WorkedOnItem[]
}

export default function WorkedOnTabs({ workedOn }: WorkedOnTabsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const isLargeScreen = useIsLargeScreen()

  const handleActivate = useCallback((index: number) => {
    setActiveIndex((current) => (current === index ? null : index))
  }, [])

  if (!workedOn?.length) return null

  const columnCount = workedOn.length
  const columnWidth = `${100 / columnCount}%`
  const isOpen = activeIndex !== null
  const isDesktopExpanded = isLargeScreen && isOpen
  const activeTags = isOpen ? workedOn[activeIndex]?.tags ?? [] : []

  const renderTabButton = (item: WorkedOnItem, index: number, isActive: boolean, isCollapsed: boolean) => {
    const label = getWorkedOnCategoryLabel(item.category)

    return (
      <button
        type="button"
        role="tab"
        id={`worked-on-tab-${index}`}
        aria-selected={isActive}
        aria-controls={`worked-on-panel-${index}`}
        aria-expanded={isActive}
        tabIndex={isCollapsed ? -1 : 0}
        aria-label={isActive ? `Close ${label}` : label}
        onClick={() => handleActivate(index)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleActivate(index)
          }
        }}
        className="flex w-full flex-col items-start justify-start gap-1.5 py-4 text-left lg:flex-row lg:items-center lg:justify-start lg:gap-2 lg:py-0"
      >
        <span
          className={`font-display text-xs font-bold leading-tight sm:text-sm lg:text-base ${
            isActive ? 'text-white' : 'text-white/85'
          }`}
        >
          {label}
        </span>

        {isActive ? (
          <X size={16} className="shrink-0 text-white" aria-hidden />
        ) : (
          <>
            <ArrowDown size={16} className="shrink-0 text-white/50 lg:hidden" aria-hidden />
            <ArrowRight size={16} className="hidden shrink-0 text-white/50 lg:block" aria-hidden />
          </>
        )}
      </button>
    )
  }

  return (
    <div className={`${featuredContentWrap} mt-4`}>
      <div
        className="flex flex-col overflow-hidden rounded-xl bg-[var(--ink)] lg:h-[5.75rem] lg:flex-row md:rounded-2xl"
        role="tablist"
        aria-label="We worked on"
      >
        <div
          className={`min-h-[4.75rem] min-w-0 sm:min-h-[5.25rem] ${
            isDesktopExpanded ? 'relative shrink-0' : 'flex flex-1'
          }`}
          style={isDesktopExpanded ? { width: columnWidth } : undefined}
        >
          {isDesktopExpanded ? (
            <div className="relative h-full w-full">
              {workedOn.map((item, index) => {
                const isActive = activeIndex === index

                return (
                  <div
                    key={item.category ?? index}
                    className={`absolute inset-0 flex items-center overflow-hidden px-3 sm:px-5 lg:px-8 ${
                      isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  >
                    {renderTabButton(item, index, isActive, !isActive)}
                  </div>
                )
              })}
            </div>
          ) : (
            workedOn.map((item, index) => {
              const isActive = activeIndex === index

              return (
                <div
                  key={item.category ?? index}
                  className="flex min-w-0 shrink-0 flex-1 items-center overflow-hidden px-3 sm:px-5 lg:px-8"
                  style={{ flexBasis: columnWidth }}
                >
                  {renderTabButton(item, index, isActive, false)}
                </div>
              )
            })
          )}
        </div>

        <div
          className={`hidden items-center justify-end overflow-hidden lg:flex ${
            isOpen ? 'min-w-0 flex-1 px-4' : 'w-0 p-0'
          }`}
        >
          {isOpen && activeTags.length > 0 ? (
            <div
              className="flex max-h-full max-w-full flex-wrap content-center items-center justify-end gap-1.5 px-2 py-1 lg:px-3"
              role="tabpanel"
              id={`worked-on-panel-${activeIndex}`}
              aria-labelledby={`worked-on-tab-${activeIndex}`}
            >
              {activeTags.map((tag) => (
                <WorkedOnKeyword key={tag} label={tag} compact />
              ))}
            </div>
          ) : null}
        </div>

        {!isLargeScreen && isOpen && activeTags.length > 0 ? (
          <div
            className="overflow-hidden lg:hidden"
            role="tabpanel"
            id={`worked-on-panel-${activeIndex}`}
            aria-labelledby={`worked-on-tab-${activeIndex}`}
          >
            <div className="flex flex-wrap gap-2.5 px-4 py-4 sm:px-6 sm:py-5">
              {activeTags.map((tag) => (
                <WorkedOnKeyword key={tag} label={tag} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
