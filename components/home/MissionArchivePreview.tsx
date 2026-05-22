import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { FeaturedWorkItem } from '@/lib/featuredWork'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'

type SanityMission = {
  _id: string
  title: string
  slug: string
  missionCodename: string
  tagline?: string
  heroImage?: Parameters<typeof urlFor>[0]
  status?: string
}

type WorkCard = FeaturedWorkItem | SanityMission

const isFeaturedWork = (mission: WorkCard): mission is FeaturedWorkItem =>
  'imageSrc' in mission && typeof mission.imageSrc === 'string'

type MissionArchivePreviewProps = {
  missions: SanityMission[]
  featuredWork?: FeaturedWorkItem[]
}

export default function MissionArchivePreview({
  missions,
  featuredWork = [],
}: MissionArchivePreviewProps) {
  const sanityBySlug = new Set(missions.map((m) => m.slug))
  const staticWork = featuredWork.filter((item) => !sanityBySlug.has(item.slug))
  const workItems: WorkCard[] = [...staticWork, ...missions]

  return (
    <ContainerSection id="mission-archive">
      <MonoLabel className="mb-3 block">/ Our Work</MonoLabel>
      <h2 className="text-title-section w-full">
        We are a <HighlightWord>diligent</HighlightWord> team, obsessed with turning ideas into work
        that lasts.
      </h2>

      {workItems.length > 0 && (
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {workItems.map((mission) => (
            <Link
              key={mission._id}
              href={`/work/${mission.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--dark)]"
            >
              {isFeaturedWork(mission) ? (
                <Image
                  src={mission.imageSrc}
                  alt={mission.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                mission.heroImage && (
                  <Image
                    src={urlFor(mission.heroImage).width(1200).url()}
                    alt={mission.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
                <span className="font-mono text-xs uppercase tracking-wide text-white/90">
                  {mission.missionCodename}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-2xl font-bold leading-tight text-white md:text-3xl">
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
