import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { allMissionsQuery } from '@/lib/sanity/queries'
import type { MissionListItem } from '@/lib/types/mission'
import WorkHero from '@/components/work/WorkHero'
import MissionGrid from '@/components/work/MissionGrid'

export const metadata: Metadata = {
  title: 'Our Work — TunedUp Workshop',
  description:
    'Case studies from churches, NGOs, entrepreneurs, and startups. Each project tells a story of a mission, and the signal we helped carry.',
}

export const revalidate = 60

export default async function WorkPage() {
  let missions: MissionListItem[] = []

  try {
    missions = await client.fetch<MissionListItem[]>(allMissionsQuery)
  } catch {
    // Page still renders if Sanity is unreachable
  }

  return (
    <>
      <WorkHero />
      <MissionGrid missions={missions} />
    </>
  )
}
