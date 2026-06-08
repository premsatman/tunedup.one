import MonoLabel from '@/components/shared/MonoLabel'
import type { CrewWhyTunedUpSection } from '@/lib/types/crewPage'

type WhyChooseUsProps = {
  section: CrewWhyTunedUpSection
}

const MUTED_ON_DARK = 'text-[rgba(245,241,232,0.55)]'

const renderHighlightedText = (headline: string, highlight: string, mutedClassName: string) => {
  const trimmedHeadline = headline.trim()
  const trimmedHighlight = highlight.trim()

  if (!trimmedHighlight) return trimmedHeadline

  const highlightIndex = trimmedHeadline.indexOf(trimmedHighlight)
  if (highlightIndex !== -1) {
    const before = trimmedHeadline.slice(0, highlightIndex).trimEnd()
    const after = trimmedHeadline.slice(highlightIndex + trimmedHighlight.length)

    return (
      <>
        {before}
        {' '}
        <span className={mutedClassName}>{trimmedHighlight}</span>
        {after}
      </>
    )
  }

  // CMS may store the lead-in and muted phrase in separate fields.
  const needsSpace = trimmedHeadline.length > 0 && !trimmedHeadline.endsWith(' ')

  return (
    <>
      {trimmedHeadline}
      {needsSpace ? ' ' : null}
      <span className={mutedClassName}>{trimmedHighlight}</span>
    </>
  )
}

export default function WhyChooseUs({ section }: WhyChooseUsProps) {
  const headingMuted = MUTED_ON_DARK
  const cardMuted = MUTED_ON_DARK

  return (
    <section className="bg-[var(--dark)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <MonoLabel className="mb-4 block !text-[rgba(245,241,232,0.4)]">{section.label}</MonoLabel>
        <h2 className="mb-16 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-[#F5F1E8] md:text-5xl lg:text-6xl">
          {renderHighlightedText(
            `${section.headingBefore}${section.headingHighlight}${section.headingAfter}`,
            section.headingHighlight,
            headingMuted,
          )}
        </h2>

        <div className="grid grid-cols-1 gap-px bg-white/8 md:grid-cols-2">
          {section.reasons.map((reason) => (
            <div key={reason.code} className="bg-[var(--dark)] p-8 lg:p-12">
              <div className="mb-6 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                {reason.code}
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold leading-tight text-[#F5F1E8] md:text-3xl">
                {renderHighlightedText(reason.headline, reason.highlight, cardMuted)}
              </h3>
              <p className="max-w-sm font-body leading-relaxed text-[rgba(245,241,232,0.6)]">
                {reason.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
