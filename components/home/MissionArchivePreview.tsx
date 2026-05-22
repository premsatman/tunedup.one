import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'

type Mission = {
  _id: string
  title: string
  slug: string
  missionCodename: string
  tagline?: string
  heroImage?: Parameters<typeof urlFor>[0]
  status?: string
}

export default function MissionArchivePreview({ missions }: { missions: Mission[] }) {
  return (
    <ContainerSection id="mission-archive">
      <MonoLabel className="mb-3 block">/ Our Work</MonoLabel>
      <h2 className="text-title-section w-full">
      We are a small team <HighlightWord>obsessed</HighlightWord> with making good work reach the people it&apos;s meant for.
      </h2>

      {missions.length > 0 && (
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {missions.map((mission) => (
            <Link
              key={mission._id}
              href={`/work/${mission.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--dark)]"
            >
              {mission.heroImage && (
                <Image
                  src={urlFor(mission.heroImage).width(1200).url()}
                  alt={mission.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wide text-white/90">
                  {mission.missionCodename}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                  {mission.title}
                </h3>
                {mission.tagline && (
                  <p className="mt-1.5 line-clamp-2 font-body text-sm leading-snug text-white/80">
                    {mission.tagline}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </ContainerSection>
  )
}
