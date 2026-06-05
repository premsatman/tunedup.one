import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import type { CrewRecognitionSection } from '@/lib/types/crewPage'

type RecognitionListProps = {
  section: CrewRecognitionSection
}

export default function RecognitionList({ section }: RecognitionListProps) {
  return (
    <ContainerSection>
      <MonoLabel className="mb-4 block">{section.label}</MonoLabel>
      <h2 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
        {section.headingBefore}
        <HighlightWord>{section.headingHighlight}</HighlightWord>
        {section.headingAfter}
      </h2>

      {section.items.length > 0 && (
        <div className="mt-16 border-t border-[var(--line)]">
          {section.items.map((item) => (
            <div
              key={`${item.left}-${item.right}`}
              className="group -mx-2 flex cursor-default flex-col items-start justify-between gap-2 rounded border-b border-[var(--line)] px-2 py-6 transition-colors hover:bg-[var(--accent-soft)] sm:flex-row sm:items-center"
            >
              <span className="font-display text-xl font-bold md:text-2xl">{item.left}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] sm:text-right">
                {item.right}
              </span>
            </div>
          ))}
        </div>
      )}
    </ContainerSection>
  )
}
