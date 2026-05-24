import { hasSanityImage } from '@/lib/sanity/hasSanityImage'
import WorkDetailIntro, { workDetailIntroBodyClassName } from '@/components/work-detail/WorkDetailIntro'
import WorkDetailMockupGrid from '@/components/work-detail/WorkDetailMockupGrid'
import type { ProblemCard, SanityImage } from '@/lib/types/mission'

export default function ProblemSection({
  description,
  cards,
  mockups,
  mockupSingle,
}: {
  description?: string
  cards?: ProblemCard[]
  mockups?: SanityImage[]
  mockupSingle?: SanityImage
}) {
  const hasCards = Boolean(cards && cards.length > 0)
  const hasMockups = Boolean(
    hasSanityImage(mockupSingle) || mockups?.some((image) => hasSanityImage(image)),
  )

  if (!description && !hasCards && !hasMockups) return null

  return (
    <>
      {description && (
        <WorkDetailIntro title="Problem" className="pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
          <p className={workDetailIntroBodyClassName}>{description}</p>
        </WorkDetailIntro>
      )}

      {hasCards && (
        <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-12 lg:pb-20">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {cards!.map((card, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-6"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                  Problem {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-xl font-bold text-white">{card.title}</h3>
                <p className="font-body text-sm leading-relaxed text-white/75">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <WorkDetailMockupGrid mockups={mockups} mockupSingle={mockupSingle} />
    </>
  )
}
