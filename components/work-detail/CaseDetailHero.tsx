import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity/client'
import type { MissionDetail } from '@/lib/types/mission'
import WorkedOnTabs from '@/components/work-detail/WorkedOnTabs'
import { ProjectDescriptionIntro, HeroImage2 } from '@/components/work-detail/ProjectDescription'
import CaseHeroBackgroundVideo, {
  DEFAULT_WORK_DETAIL_MUX_PLAYBACK_ID,
} from '@/components/work-detail/CaseHeroBackgroundVideo'
import WorkDetailHeroLogo from '@/components/work-detail/WorkDetailHeroLogo'
import ProjectTelemetryPanel from '@/components/work-detail/ProjectTelemetryPanel'

/** Hero video: 55vh mobile/tablet, 85vh lg+ */
export const WORK_DETAIL_HERO_COVER_HEIGHT = 'h-[55vh] lg:h-[85vh]'

/** Featured image/video — 1920×1080 (16:9) */
export const FEATURED_MEDIA_ASPECT_CLASS = 'aspect-video'

/** Top 25% of featured media overlaps the hero video */
export const HERO_VIDEO_OVERLAP_RATIO = 0.25

const featuredHeroMediaWrap =
  'relative z-10 mx-auto mt-8 w-full max-w-7xl px-6 sm:mt-10 lg:mt-0 lg:px-12 lg:-mt-[var(--featured-overlap)]'

export default function CaseDetailHero({ mission }: { mission: MissionDetail }) {
  if (!mission) return null

  const heroVideoPlaybackId =
    mission.heroVideoPlaybackId?.trim() || DEFAULT_WORK_DETAIL_MUX_PLAYBACK_ID

  return (
    <section
      id="work-detail-hero"
      className="relative [--featured-width:min(calc(100vw-3rem),77rem)] [--featured-overlap:0] lg:[--featured-width:min(calc(100vw-6rem),calc(80rem-6rem))] lg:[--featured-overlap:calc(var(--featured-width)*9/16*0.25)]"
    >
      <div
        className={`absolute inset-x-0 top-0 z-[1] ${WORK_DETAIL_HERO_COVER_HEIGHT} overflow-hidden rounded-b-[2rem] bg-black md:rounded-b-[2.75rem] lg:rounded-b-[3rem]`}
      >
        <CaseHeroBackgroundVideo playbackId={heroVideoPlaybackId} />

        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-10 pt-6 text-center sm:pb-12 lg:px-12 lg:pb-10">
        <WorkDetailHeroLogo />

        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/60">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight size={12} className="text-white/40" aria-hidden />
          <Link href="/work" className="transition-colors hover:text-white">
            Work
          </Link>
          <ChevronRight size={12} className="text-white/40" aria-hidden />
          <span className="text-white/90">Project Details</span>
        </nav>

        <h1 className="max-w-4xl font-display text-4xl font-bold leading-[0.95] tracking-[-0.03em] text-white md:text-6xl lg:text-7xl">
          {mission.title}
        </h1>

        {mission.tagline && (
          <p className="mt-5 max-w-2xl font-display text-xl leading-snug text-white/75 md:text-2xl lg:text-3xl">
            {mission.tagline}
          </p>
        )}
      </div>

      {mission.heroImage && (
        <div className={featuredHeroMediaWrap}>
          <div className="relative isolate [contain:paint]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[14%] top-[76%] z-0 h-16 lg:hidden"
              style={{
                background:
                  'radial-gradient(ellipse at center, var(--accent) 0%, transparent 68%)',
                opacity: 0.48,
              }}
            />

            <div className="hidden lg:contents">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[12%] top-[76%] z-0 h-16 rounded-[100%] bg-[var(--accent)] opacity-45 blur-2xl sm:inset-x-[14%] sm:h-[4.5rem] md:top-[77%]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[18%] top-[80%] z-0 h-11 rounded-[100%] bg-[var(--accent)] opacity-70 blur-xl sm:top-[81%] sm:h-12"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[24%] top-[84%] z-0 h-7 rounded-[100%] bg-[#5eead4] opacity-80 blur-lg sm:top-[85%] sm:h-8"
              />
            </div>

            <div
              className={`relative z-10 w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.25rem] ${FEATURED_MEDIA_ASPECT_CLASS}`}
            >
              <Image
                src={urlFor(mission.heroImage).width(1920).url()}
                alt={mission.title}
                fill
                loading="lazy"
                sizes="(max-width: 1280px) calc(100vw - 3rem), min(1280px, calc(100vw - 6rem))"
                className="relative z-10 h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      )}

      <WorkedOnTabs workedOn={mission.workedOn} />

      <ProjectDescriptionIntro description={mission.projectDescription} />

      <ProjectTelemetryPanel mission={mission} />

      <HeroImage2 image={mission.heroImage2} />
    </section>
  )
}
