import Link from 'next/link'
import clsx from 'clsx'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import SplitHeading from '@/components/shared/SplitHeading'
import type { CrewCareersSection } from '@/lib/types/crewPage'

type CareersSectionProps = {
  section: CrewCareersSection
}

export default function CareersSection({ section }: CareersSectionProps) {
  return (
    <ContainerSection id="careers">
      <MonoLabel className="mb-4 block">{section.label}</MonoLabel>
      <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
        <SplitHeading
          before={section.headingBefore}
          highlight={section.headingHighlight}
          after={section.headingAfter}
        />
      </h2>

      {section.intro && (
        <p className="mt-6 max-w-xl font-body leading-relaxed text-[var(--ink-mid)]">
          {section.intro}
        </p>
      )}

      {section.roles.length > 0 && (
        <div className="mt-12 flex flex-col">
          {section.roles.map((role, index) => (
            <div
              key={`${role.title}-${role.type}`}
              className={clsx(
                'flex flex-col gap-1 py-6',
                index !== 0 && 'border-t border-[var(--line)]',
              )}
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-bold text-[var(--ink)]">{role.title}</h3>
                {role.type && (
                  <span className="inline-flex items-center rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)]">
                    {role.type}
                  </span>
                )}
              </div>
              <p className="font-body text-sm text-[var(--ink-soft)]">{role.description}</p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 font-mono text-xs uppercase tracking-wider text-[var(--ink-soft)]">
        {section.footerBeforeLink}{' '}
        <Link
          href={section.footerLinkHref}
          className="text-[var(--ink)] underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
        >
          {section.footerLinkLabel}
        </Link>
        {section.footerAfterLink}
      </p>
    </ContainerSection>
  )
}
