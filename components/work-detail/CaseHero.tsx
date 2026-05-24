import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { MissionDetail } from '@/lib/types/mission'

export default function CaseHero({ mission }: { mission: MissionDetail }) {
  if (!mission) return null

  return (
    <section className="pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.93] tracking-[-0.03em] max-w-5xl">
          {mission.title}
        </h1>

        {mission.tagline && (
          <p className="font-display text-xl md:text-2xl lg:text-3xl text-[var(--ink-soft)] mt-6 max-w-3xl leading-snug">
            {mission.tagline}
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[var(--line)]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)] mb-1">
              /Client
            </div>
            <div className="font-body text-sm">{mission.clientName}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)] mb-1">
              /Sector
            </div>
            <div className="font-body text-sm">{mission.sector}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)] mb-1">
              /Role
            </div>
            <div className="font-body text-sm">{mission.role}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)] mb-1">
              /Frequency Tuned
            </div>
            <div className="font-body text-sm">{mission.frequencyTuned}</div>
          </div>
        </div>
      </div>

      {mission.heroImage && (
        <div className="relative aspect-[16/9] lg:aspect-[21/9] mt-16 overflow-hidden">
          <Image
            src={urlFor(mission.heroImage).width(2400).url()}
            alt={mission.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
    </section>
  )
}
