import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import { Linkedin } from 'lucide-react'
import TeamMemberPhoto from '@/components/workshop/TeamMemberPhoto'
import BrandAssociationCard from '@/components/workshop/BrandAssociationCard'
import type { FounderRecord } from '@/lib/types/team'

export default function FounderSection({ founder }: { founder: FounderRecord | null }) {
  if (!founder) return null

  return (
    <ContainerSection id="founder">
      <MonoLabel className="mb-4 block">/ Founder</MonoLabel>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-white lg:mx-0 lg:max-h-[23rem] lg:max-w-[17.5rem] xl:max-w-[18.75rem]">
            <TeamMemberPhoto
              member={founder}
              alt={founder.name}
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
              variant="founder"
            />
          </div>

          <div className="mt-6">
            <h2 className="font-display text-3xl font-bold">{founder.name}</h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
              {founder.founderTitle || founder.role}
            </p>

            {founder.linkedIn && (
              <Link
                href={founder.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
              >
                <Linkedin size={14} aria-hidden />
                LinkedIn
              </Link>
            )}

            {founder.tags && founder.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {founder.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--line)] bg-[var(--canvas)] px-3 py-1 font-mono text-xs uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8">
          <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
            We are a <HighlightWord>small team</HighlightWord> obsessed with making missions sound
            the way founders hear them in their heads.
          </h2>

          {founder.founderBio ? (
            <div className="mt-8 max-w-xl space-y-4">
              <PortableText
                value={founder.founderBio}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="font-body text-base leading-relaxed text-[var(--ink-mid)]">
                        {children}
                      </p>
                    ),
                  },
                }}
              />
            </div>
          ) : founder.bio ? (
            <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-[var(--ink-mid)]">
              {founder.bio}
            </p>
          ) : null}

          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-[var(--line)] pt-12">
            {[
              { number: `${founder.yearsExperience || 14}+`, label: 'Years of craft' },
              { number: '4', label: 'Mission types served' },
              { number: '3', label: 'Continents reached' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                  {stat.number}
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {founder.brandAssociations && founder.brandAssociations.length > 0 && (
        <div className="mt-24 border-t border-[var(--line)] pt-16">
          <MonoLabel className="mb-4 block">/ Notable associations</MonoLabel>
          <h3 className="mb-12 max-w-2xl font-display text-3xl font-bold md:text-4xl">
            Work that reached <HighlightWord>further</HighlightWord> than the brief.
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {founder.brandAssociations.map((brand, index) => (
              <BrandAssociationCard
                key={`${brand.brandName ?? 'brand'}-${index}`}
                brand={brand}
              />
            ))}
          </div>
        </div>
      )}
    </ContainerSection>
  )
}
