import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import {
  missionBySlugQuery,
  allMissionSlugsQuery,
} from '@/lib/sanity/queries'
import type { MissionDetail, MissionSlugItem } from '@/lib/types/mission'

import CaseDetailHero from '@/components/work-detail/CaseDetailHero'
import ColorPaletteStrip from '@/components/work-detail/ColorPaletteStrip'
import ProblemSection from '@/components/work-detail/ProblemSection'
import SolutionSection from '@/components/work-detail/SolutionSection'
import DesignProcess from '@/components/work-detail/DesignProcess'
import TheSystem from '@/components/work-detail/TheSystem'
import WorkflowScenario from '@/components/work-detail/WorkflowScenario'
import ClientFeedback from '@/components/work-detail/ClientFeedback'
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
        colorPalette={mission.colorPalette}
      />
      <ColorPaletteStrip palette={mission.colorPalette} />
      <SolutionSection
        description={mission.solutionDescription}
        cards={mission.solutionCards}
        mockups={mission.mockupPairSolution}
        mockupSingle={mission.mockupSingleSolution}
        colorPalette={mission.colorPalette}
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
      <WorkflowScenario
        description={mission.workflowDescription}
        steps={mission.workflowSteps}
      />
      <ClientFeedback feedback={mission.clientFeedback} />
      <div className="bg-white text-[var(--ink)]">
        <NextMissionNav prev={prev} next={next} />
      </div>
    </div>
  )
}
