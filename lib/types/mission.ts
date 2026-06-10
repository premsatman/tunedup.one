import type { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/lib/sanity/client'

export type SanityImage = Parameters<typeof urlFor>[0]

export type MissionType = 'ministry' | 'impact' | 'solo' | 'launch'

export type MissionStatus = 'complete' | 'active' | 'tuning'

export type WorkedOnItem = {
  category: string
  tags?: string[]
}

export type ColorSwatch = {
  name?: string
  hex?: string
}

export type ProblemCard = {
  title?: string
  description?: string
}

export type TimelineOperator = {
  _id: string
  name: string
  photo?: SanityImage
}

export type TimelinePhase = {
  phaseName?: string
  startWeek?: number
  durationWeeks?: number
  color?: string
  operators?: TimelineOperator[]
}

export type WorkflowStep = {
  stepTitle?: string
  stepDescription?: string
  screenshot?: SanityImage
}

export type ClientFeedback = {
  quote?: string
  authorName?: string
  authorRole?: string
  authorOrg?: string
  authorPhoto?: SanityImage
  clientLogo?: SanityImage
}

export type OutcomeItem = {
  number: string
  label: string
}

export type MissionListItem = {
  _id: string
  title: string
  slug: string
  missionCodename?: string
  missionType?: MissionType
  tagline?: string
  heroImage?: SanityImage
  status?: MissionStatus
  services?: string[]
}

export type MissionSlugItem = {
  title: string
  slug: string
  missionCodename?: string
  heroImage?: SanityImage
  order?: number
}

export type RelatedMission = {
  _id: string
  title: string
  slug: string
  missionCodename?: string
  tagline?: string
  heroImage?: SanityImage
}

export type MissionDetail = MissionListItem & {
  frequencyTuned?: string
  frequencyTunedOperator?: TimelineOperator
  missionPatch?: SanityImage
  order?: number
  duration?: string
  year?: string
  clientName?: string
  sector?: string
  role?: string
  heroVideoPlaybackId?: string
  heroImageVideoPlaybackId?: string
  heroImage2?: SanityImage
  workedOn?: WorkedOnItem[]
  colorPalette?: ColorSwatch[]
  projectDescription?: PortableTextBlock[]
  problemDescription?: string
  problemCards?: ProblemCard[]
  mockupPair1?: SanityImage[]
  mockupSingle1?: SanityImage
  solutionDescription?: string
  solutionCards?: ProblemCard[]
  mockupPairSolution?: SanityImage[]
  mockupSingleSolution?: SanityImage
  designProcessDescription?: PortableTextBlock[]
  projectTimeline?: TimelinePhase[]
  styleGuideTypography?: SanityImage
  styleGuideComponents?: SanityImage
  mockupPair2?: SanityImage[]
  wireframes?: SanityImage[]
  outcomes?: OutcomeItem[]
  workflowDescription?: string
  workflowSteps?: WorkflowStep[]
  clientFeedback?: ClientFeedback
  whatsNext?: string
  relatedMissions?: RelatedMission[]
}
