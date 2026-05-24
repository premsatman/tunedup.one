import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import {
  missionBySlugQuery,
  allMissionSlugsQuery,
  autoRelatedMissionsQuery,
} from '@/lib/sanity/queries'
import type { MissionDetail, MissionSlugItem, RelatedMission } from '@/lib/types/mission'

import CaseDetailHero, { HeroTelemetry } from '@/components/work-detail/CaseDetailHero'
import ColorPaletteStrip from '@/components/work-detail/ColorPaletteStrip'
import ProblemSection from '@/components/work-detail/ProblemSection'
import SolutionSection from '@/components/work-detail/SolutionSection'
import DesignProcess from '@/components/work-detail/DesignProcess'
import TheSystem from '@/components/work-detail/TheSystem'
import OutcomesStrip from '@/components/work-detail/OutcomesStrip'
import WorkflowScenario from '@/components/work-detail/WorkflowScenario'
import ClientFeedback from '@/components/work-detail/ClientFeedback'
import WhatsNext from '@/components/work-detail/WhatsNext'
import RelatedMissions from '@/components/work-detail/RelatedMissions'
import NextMissionNav from '@/components/work-detail/NextMissionNav'

export async function generateStaticParams() {
  try {
    const missions = await client.fetch<MissionSlugItem[]>(allMissionSlugsQuery)
    return missions.map((mission) => ({ slug: mission.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const mission = await client.fetch<MissionDetail | null>(missionBySlugQuery, {
      slug: params.slug,
    })
    if (!mission) return {}
    return {
      title: `${mission.title} — TunedUp Workshop`,
      description: mission.tagline,
    }
  } catch {
    return {}
  }
}

export const revalidate = 60

export default async function MissionDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  let mission: MissionDetail | null = null
  let allMissions: MissionSlugItem[] = []

  try {
    ;[mission, allMissions] = await Promise.all([
      client.fetch<MissionDetail | null>(missionBySlugQuery, { slug: params.slug }),
      client.fetch<MissionSlugItem[]>(allMissionSlugsQuery),
    ])
  } catch {
    notFound()
  }

  if (!mission) notFound()

  let related: RelatedMission[] | undefined = mission.relatedMissions
  if (!related || related.length < 2) {
    try {
      const auto = await client.fetch<RelatedMission[]>(autoRelatedMissionsQuery, {
        currentSlug: params.slug,
      })
      related = auto
    } catch {
      related = mission.relatedMissions
    }
  }

  const currentIndex = allMissions.findIndex((item) => item.slug === params.slug)
  const prev = currentIndex > 0 ? allMissions[currentIndex - 1] : null
  const next =
    currentIndex >= 0 && currentIndex < allMissions.length - 1
      ? allMissions[currentIndex + 1]
      : null

  return (
    <div className="bg-[var(--page-bg)]">
      <CaseDetailHero mission={mission} />
      <ProblemSection
        description={mission.problemDescription}
        cards={mission.problemCards}
        mockups={mission.mockupPair1}
        mockupSingle={mission.mockupSingle1}
      />
      <HeroTelemetry mission={mission} />
      <ColorPaletteStrip palette={mission.colorPalette} />
      <SolutionSection
        description={mission.solutionDescription}
        cards={mission.solutionCards}
        mockups={mission.mockupPairSolution}
        mockupSingle={mission.mockupSingleSolution}
      />
      <DesignProcess
        description={mission.designProcessDescription}
        timeline={mission.projectTimeline}
      />
      <TheSystem
        typographyImage={mission.styleGuideTypography}
        componentsImage={mission.styleGuideComponents}
        mockupPair={mission.mockupPair2}
        wireframes={mission.wireframes}
      />
      <OutcomesStrip outcomes={mission.outcomes} />
      <WorkflowScenario
        description={mission.workflowDescription}
        steps={mission.workflowSteps}
      />
      <ClientFeedback feedback={mission.clientFeedback} />
      <WhatsNext text={mission.whatsNext} />
      <RelatedMissions missions={related} />
      <NextMissionNav prev={prev} next={next} />
    </div>
  )
}
