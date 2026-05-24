import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import { ArrowUpRight } from 'lucide-react'
import type { RelatedMission } from '@/lib/types/mission'

export default function RelatedMissions({
  missions,
}: {
  missions?: RelatedMission[]
}) {
  if (!missions?.length) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Related Missions</MonoLabel>
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] max-w-3xl mb-12">
        Other signals worth tuning into.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {missions.slice(0, 2).map((m) => (
          <Link
            key={m._id}
            href={`/work/${m.slug}`}
            className="group bg-white border border-[var(--line)] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            {m.heroImage && (
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={urlFor(m.heroImage).width(1200).url()}
                  alt={m.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                  {m.missionCodename}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {m.title}
                  </h3>
                  {m.tagline && (
                    <p className="font-body text-sm text-[var(--ink-soft)] line-clamp-2">
                      {m.tagline}
                    </p>
                  )}
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-[var(--ink-soft)] group-hover:text-[var(--accent)] flex-shrink-0 mt-1 transition-colors"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ContainerSection>
  )
}
