import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { allTeamQuery, founderQuery } from '@/lib/sanity/queries'
import type { FounderRecord, TeamMemberRecord } from '@/lib/types/team'
import { resolveCrewTeam, resolveFounder } from '@/lib/data/crew'
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
  let sanityFounder: FounderRecord | null = null

  try {
    ;[sanityTeam, sanityFounder] = await Promise.all([
      client.fetch<TeamMemberRecord[]>(allTeamQuery),
      client.fetch<FounderRecord | null>(founderQuery),
    ])
  } catch {
    // Page still renders if Sanity is unreachable
  }

  const founder = resolveFounder(sanityFounder)
  const team = resolveCrewTeam(sanityTeam)

  return (
    <>
      <WorkshopHero />
      <FounderSection founder={founder} />
      <WhyChooseUs />
      <CrewSection team={team} />
      <CapabilitiesPills />
      <RecognitionList />
      <CareersSection />
    </>
  )
}
