import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import Link from 'next/link'
import { crewPillColorClasses } from '@/lib/data/crewPage'
import type { CrewCapabilitiesSection } from '@/lib/types/crewPage'

type CapabilitiesPillsProps = {
  section: CrewCapabilitiesSection
}

export default function CapabilitiesPills({ section }: CapabilitiesPillsProps) {
  return (
    <ContainerSection className="bg-[var(--canvas)]">
      <MonoLabel className="mb-4 block">{section.label}</MonoLabel>
      <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
        {section.heading}
      </h2>

      <div className="mt-16 flex min-h-[420px] flex-col items-center justify-center gap-8 rounded-3xl bg-[var(--dark)] p-6 sm:p-10 lg:p-16">
        <div className="flex max-w-3xl flex-wrap justify-center gap-4">
          {section.pills.map((pill) => (
            <span
              key={pill.label}
              className={`${crewPillColorClasses[pill.color]} cursor-default select-none rounded-full px-7 py-3.5 font-display text-xl font-bold md:text-2xl`}
            >
              {pill.label}
            </span>
          ))}

          <Link
            href={section.ctaHref}
            className="flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-white transition-transform hover:scale-[1.02]"
          >
            {section.ctaLabel}
          </Link>
        </div>
      </div>
    </ContainerSection>
  )
}
