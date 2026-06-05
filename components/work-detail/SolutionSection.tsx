import { hasSanityImage } from '@/lib/sanity/hasSanityImage'
import WorkDetailIntro, {
  workDetailCardDescriptionClassName,
  workDetailIntroBodyClassName,
} from '@/components/work-detail/WorkDetailIntro'
import WorkDetailMockupGrid from '@/components/work-detail/WorkDetailMockupGrid'
import type { ColorSwatch, ProblemCard, SanityImage } from '@/lib/types/mission'

export default function SolutionSection({
  description,
  cards,
  mockups,
  mockupSingle,
  colorPalette,
}: {
  description?: string
  cards?: ProblemCard[]
  mockups?: SanityImage[]
  mockupSingle?: SanityImage
  colorPalette?: ColorSwatch[]
}) {
  const hasCards = Boolean(cards && cards.length > 0)
  const hasMockups = Boolean(
    hasSanityImage(mockupSingle) || mockups?.some((image) => hasSanityImage(image)),
  )

  if (!description && !hasCards && !hasMockups) return null

  return (
    <>
      {description && (
        <WorkDetailIntro title="Solution" className="pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
          <p className={workDetailIntroBodyClassName}>{description}</p>
        </WorkDetailIntro>
      )}

      {hasCards && (
        <section className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pb-14 lg:px-12 lg:pb-20">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {cards!.map((card, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-2xl bg-[var(--accent-soft)] p-6"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                  Solution {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-xl font-bold text-white">{card.title}</h3>
                <p className={workDetailCardDescriptionClassName}>{card.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <WorkDetailMockupGrid
        mockups={mockups}
        mockupSingle={mockupSingle}
        singleGlowColor={colorPalette?.[0]?.hex}
      />
    </>
  )
}
