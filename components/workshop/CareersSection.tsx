import Link from 'next/link'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import { ArrowUpRight } from 'lucide-react'
import type { CrewCareersSection } from '@/lib/types/crewPage'

type CareersSectionProps = {
  section: CrewCareersSection
}

export default function CareersSection({ section }: CareersSectionProps) {
  return (
    <ContainerSection id="careers">
      <MonoLabel className="mb-4 block">{section.label}</MonoLabel>
      <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
        {section.headingBefore}
        <HighlightWord>{section.headingHighlight}</HighlightWord>
        {section.headingAfter}
      </h2>

      {section.intro && (
        <p className="mt-6 max-w-xl font-body leading-relaxed text-[var(--ink-mid)]">
          {section.intro}
        </p>
      )}

      {section.roles.length > 0 && (
        <div className="mt-12 border-t border-[var(--line)]">
          {section.roles.map((role) => (
            <div
              key={`${role.title}-${role.type}`}
              className="flex flex-col justify-between gap-4 border-b border-[var(--line)] py-6 md:flex-row md:items-center"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-xl font-bold">{role.title}</h3>
                  <span className="rounded-full border border-[var(--line)] bg-[var(--canvas)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">
                    {role.type}
                  </span>
                </div>
                <p className="mt-1 font-body text-sm text-[var(--ink-soft)]">{role.description}</p>
              </div>

              <div className="flex items-center gap-3">
                {role.statusLabel && (
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                    {role.statusLabel}
                  </span>
                )}
                <Link
                  href={role.ctaHref ?? '/contact?branch=join'}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--canvas)] transition-transform hover:scale-[1.02]"
                >
                  {role.ctaLabel ?? 'Introduce yourself'}
                  <ArrowUpRight size={12} aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
        {section.footerBeforeLink}
        <Link
          href={section.footerLinkHref}
          className="underline underline-offset-4 transition-colors hover:text-[var(--ink)]"
        >
          {section.footerLinkLabel}
        </Link>
        {section.footerAfterLink}
      </p>
    </ContainerSection>
  )
}
