'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, X } from 'lucide-react'
import { getWorkedOnCategoryLabel } from '@/lib/data/workedOnCategories'
import type { WorkedOnItem } from '@/lib/types/mission'

export const featuredContentWrap =
  'relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12'

const panelEase = [0.22, 1, 0.36, 1] as const
const panelDuration = 0.75

const WorkedOnKeyword = ({
  label,
  compact = false,
}: {
  label: string
  compact?: boolean
}) => (
  <span
    className={`hover-shake inline-block bg-white/[0.1] font-mono uppercase tracking-wide text-[var(--canvas)] transition-colors hover:bg-white/[0.16] ${
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
  const prefersReducedMotion = useReducedMotion()
  const isLargeScreen = useIsLargeScreen()

  const handleActivate = useCallback((index: number) => {
    setActiveIndex((current) => (current === index ? null : index))
  }, [])

  if (!workedOn?.length) return null

  const columnCount = workedOn.length
  const columnWidth = `${100 / columnCount}%`
  const isOpen = activeIndex !== null
  const isDesktopExpanded = isLargeScreen && isOpen

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: panelDuration, ease: panelEase }

  const fadeTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.45, ease: panelEase }

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
            <ArrowDown
              size={16}
              className="shrink-0 text-white/50 transition-transform duration-500 ease-out lg:hidden"
              aria-hidden
            />
            <ArrowRight
              size={16}
              className="hidden shrink-0 text-white/50 transition-transform duration-500 ease-out lg:block"
              aria-hidden
            />
          </>
        )}
      </button>
    )
  }

  return (
    <div className={`${featuredContentWrap} mt-4`}>
      <motion.div
        layout={!prefersReducedMotion}
        className="flex flex-col overflow-hidden rounded-xl bg-[var(--ink)] lg:h-[5.75rem] lg:flex-row md:rounded-2xl"
        role="tablist"
        aria-label="We worked on"
      >
        {/* Title columns */}
        <motion.div
          layout
          className={`min-h-[4.75rem] min-w-0 sm:min-h-[5.25rem] ${
            isDesktopExpanded
              ? 'relative shrink-0 border-r border-white/10'
              : 'flex flex-1'
          }`}
          style={isDesktopExpanded ? { width: columnWidth } : undefined}
        >
          {isDesktopExpanded ? (
            <div className="relative h-full w-full">
              {workedOn.map((item, index) => {
                const isActive = activeIndex === index

                return (
                  <motion.div
                    key={item.category ?? index}
                    className="absolute inset-0 flex items-center overflow-hidden px-3 sm:px-5 lg:px-8"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={fadeTransition}
                    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                  >
                    {renderTabButton(item, index, isActive, !isActive)}
                  </motion.div>
                )
              })}
            </div>
          ) : (
            workedOn.map((item, index) => {
              const isActive = activeIndex === index
              const showColumnDivider = index < columnCount - 1

              return (
                <motion.div
                  key={item.category ?? index}
                  layout={!prefersReducedMotion}
                  className={`flex min-w-0 shrink-0 flex-1 items-center overflow-hidden px-3 sm:px-5 lg:px-8 ${
                    showColumnDivider ? 'border-r border-white/10' : ''
                  }`}
                  style={{ flexBasis: columnWidth }}
                >
                  {renderTabButton(item, index, isActive, false)}
                </motion.div>
              )
            })
          )}
        </motion.div>

        {/* Desktop — tags on the right */}
        <motion.div
          className="hidden items-center justify-end overflow-hidden lg:flex"
          animate={{
            flexBasis: isOpen ? `${100 - 100 / columnCount}%` : '0%',
            flexGrow: isOpen ? 1 : 0,
            opacity: isOpen ? 1 : 0,
            paddingLeft: isOpen ? 16 : 0,
            paddingRight: isOpen ? 16 : 0,
          }}
          transition={transition}
        >
          <AnimatePresence mode="wait">
            {isOpen && activeTags.length > 0 ? (
              <motion.div
                key={`desktop-tags-${activeIndex}`}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: 12 }}
                transition={{ duration: 0.4, ease: panelEase }}
                className="flex max-h-full max-w-full flex-wrap content-center items-center justify-end gap-1.5 px-2 py-1 lg:px-3"
                role="tabpanel"
                id={`worked-on-panel-${activeIndex}`}
                aria-labelledby={`worked-on-tab-${activeIndex}`}
              >
                {activeTags.map((tag, tagIndex) => (
                  <motion.div
                    key={tag}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: 4 }}
                    transition={{
                      duration: 0.35,
                      ease: panelEase,
                      delay: prefersReducedMotion ? 0 : tagIndex * 0.04,
                    }}
                  >
                    <WorkedOnKeyword label={tag} compact />
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>

        {/* Mobile — tags expand down */}
        <AnimatePresence initial={false}>
          {!isLargeScreen && isOpen && activeTags.length > 0 ? (
            <motion.div
              key={`mobile-tags-${activeIndex}`}
              initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : { duration: 0.65, ease: panelEase, opacity: { duration: 0.45, delay: 0.08 } }
              }
              className="overflow-hidden border-t border-white/10 lg:hidden"
              role="tabpanel"
              id={`worked-on-panel-${activeIndex}`}
              aria-labelledby={`worked-on-tab-${activeIndex}`}
            >
              <motion.div
                initial={prefersReducedMotion ? false : { y: -8 }}
                animate={{ y: 0 }}
                exit={prefersReducedMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.5, ease: panelEase }}
                className="flex flex-wrap gap-2.5 px-4 py-4 sm:px-6 sm:py-5"
              >
                {activeTags.map((tag, tagIndex) => (
                  <motion.div
                    key={tag}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: 6 }}
                    transition={{
                      duration: 0.4,
                      ease: panelEase,
                      delay: prefersReducedMotion ? 0 : 0.12 + tagIndex * 0.05,
                    }}
                  >
                    <WorkedOnKeyword label={tag} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
