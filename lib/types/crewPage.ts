import type { PortableTextBlock } from '@portabletext/types'
import type { BrandAssociation } from '@/lib/types/team'
import type { SanityImage } from '@/lib/types/mission'

export type CrewPillColor =
  | 'pink'
  | 'yellow'
  | 'orange'
  | 'cyan'
  | 'lime'
  | 'white'
  | 'violet'
  | 'amber'

export type CrewCapabilityPill = {
  label: string
  color: CrewPillColor
  order?: number
}

export type CrewRecognitionItem = {
  left: string
  right: string
  order?: number
}

export type CrewCareersRole = {
  title: string
  type: string
  description: string
  statusLabel?: string
  ctaLabel?: string
  ctaHref?: string
  order?: number
}

export type CrewCapabilitiesSection = {
  label: string
  heading: string
  pills: CrewCapabilityPill[]
  ctaLabel: string
  ctaHref: string
}

export type CrewRecognitionSection = {
  label: string
  headingBefore: string
  headingHighlight: string
  headingAfter: string
  items: CrewRecognitionItem[]
}

export type CrewCareersSection = {
  label: string
  headingBefore: string
  headingHighlight: string
  headingAfter: string
  intro: string
  roles: CrewCareersRole[]
  footerBeforeLink: string
  footerLinkLabel: string
  footerLinkHref: string
  footerAfterLink: string
}

export type CrewFounderSection = {
  operatorId?: string
  founderPhoto?: SanityImage
  founderTitle: string
  founderBio?: PortableTextBlock[]
  yearsExperience: number
  brandAssociations?: BrandAssociation[]
}

export type CrewPageRecord = {
  founder: CrewFounderSection
  capabilities: CrewCapabilitiesSection
  recognition: CrewRecognitionSection
  careers: CrewCareersSection
}

export type CrewPageSanityRecord = {
  founderOperator?: {
    _id: string
    name: string
    role?: string
    bio?: string
    photo?: SanityImage
    crewPhoto?: SanityImage
    tags?: string[]
    linkedIn?: string
  }
  founderTitle?: string
  founderPhoto?: SanityImage
  founderBio?: PortableTextBlock[]
  yearsExperience?: number
  brandAssociations?: BrandAssociation[]
  capabilitiesLabel?: string
  capabilitiesHeading?: string
  capabilityPills?: CrewCapabilityPill[]
  capabilitiesCtaLabel?: string
  capabilitiesCtaHref?: string
  recognitionLabel?: string
  recognitionHeadingBefore?: string
  recognitionHeadingHighlight?: string
  recognitionHeadingAfter?: string
  recognitionItems?: CrewRecognitionItem[]
  careersLabel?: string
  careersHeadingBefore?: string
  careersHeadingHighlight?: string
  careersHeadingAfter?: string
  careersIntro?: string
  careersRoles?: CrewCareersRole[]
  careersFooterBeforeLink?: string
  careersFooterLinkLabel?: string
  careersFooterLinkHref?: string
  careersFooterAfterLink?: string
}
