import { client, urlFor } from '@/lib/sanity/client'
import { featuredMissionsQuery, trustLogosQuery } from '@/lib/sanity/queries'
import HomeHero from '@/components/home/HomeHero'
import HomeTrustStrip from '@/components/home/HomeTrustStrip'
import MissionArchivePreview from '@/components/home/MissionArchivePreview'
import CapabilitiesStack from '@/components/home/CapabilitiesStack'
import OpenChannelCTA from '@/components/home/OpenChannelCTA'

export const revalidate = 60

type MissionPreview = {
  _id: string
  title: string
  slug: string
  missionCodename: string
  tagline?: string
}

type TrustLogo = {
  _id: string
  name: string
  logo: Parameters<typeof urlFor>[0]
}

export default async function Home() {
  let missions: MissionPreview[] = []
  let trustLogos: TrustLogo[] = []

  try {
    ;[missions, trustLogos] = await Promise.all([
      client.fetch<MissionPreview[]>(featuredMissionsQuery),
      client.fetch<TrustLogo[]>(trustLogosQuery),
    ])
  } catch {
    // Hero still renders if Sanity is unreachable
  }

  return (
    <>
      <HomeHero />
      <HomeTrustStrip logos={trustLogos} />
      <MissionArchivePreview missions={missions} />
      <CapabilitiesStack />
      <OpenChannelCTA />
    </>
  )
}
