import type { Metadata } from 'next'
import { CREW_PAGE_DOCUMENT_ID } from '@/lib/sanity/documentIds'
import { client } from '@/lib/sanity/client'
import { allTeamQuery, crewPageQuery } from '@/lib/sanity/queries'
import type { TeamMemberRecord } from '@/lib/types/team'
import type { CrewPageSanityRecord } from '@/lib/types/crewPage'
import { resolveCrewTeam, resolveFounderFromCrewPage } from '@/lib/data/crew'
import { resolveCrewPage } from '@/lib/data/crewPage'
import WorkshopHero from '@/components/workshop/WorkshopHero'
import FounderSection from '@/components/workshop/FounderSection'
import WhyChooseUs from '@/components/workshop/WhyChooseUs'
import CrewSection from '@/components/workshop/CrewSection'
import CapabilitiesPills from '@/components/workshop/CapabilitiesPills'
import RecognitionList from '@/components/workshop/RecognitionList'
import CareersSection from '@/components/workshop/CareersSection'

export const metadata: Metadata = {
  title: 'Crew — TunedUp Digital',
  description:
    'Meet the crew behind TunedUp. A small team obsessed with making missions sound the way founders hear them in their head.',
}

export const revalidate = 60

export default async function CrewPage() {
  let sanityTeam: TeamMemberRecord[] = []
  let sanityCrewPage: CrewPageSanityRecord | null = null

  try {
    ;[sanityTeam, sanityCrewPage] = await Promise.all([
      client.fetch<TeamMemberRecord[]>(allTeamQuery),
      client.fetch<CrewPageSanityRecord | null>(crewPageQuery, {
        crewPageId: CREW_PAGE_DOCUMENT_ID,
      }),
    ])
  } catch {
    // Page still renders if Sanity is unreachable
  }

  const crewPage = resolveCrewPage(sanityCrewPage)
  const founder = resolveFounderFromCrewPage(sanityCrewPage, sanityTeam)
  const team = resolveCrewTeam(sanityTeam, crewPage.founder.operatorId)

  return (
    <>
      <WorkshopHero />
      <FounderSection founder={founder} />
      <WhyChooseUs />
      <CrewSection team={team} />
      <CapabilitiesPills section={crewPage.capabilities} />
      <RecognitionList section={crewPage.recognition} />
      <CareersSection section={crewPage.careers} />
    </>
  )
}
