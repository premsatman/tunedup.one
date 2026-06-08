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

export type CrewCareersRole = {
  title: string
  type: string
  description: string
  statusLabel?: string
  ctaLabel?: string
  ctaHref?: string
  order?: number
}

export type CrewWhyTunedUpReason = {
  code: string
  headline: string
  highlight: string
  body: string
  order?: number
}

export type CrewWhyTunedUpSection = {
  label: string
  headingBefore: string
  headingHighlight: string
  headingAfter: string
  reasons: CrewWhyTunedUpReason[]
}

export type CrewCapabilitiesSection = {
  label: string
  heading: string
  pills: CrewCapabilityPill[]
  ctaLabel: string
  ctaHref: string
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
  whyTunedUp: CrewWhyTunedUpSection
  capabilities: CrewCapabilitiesSection
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
  whyTunedUpLabel?: string
  whyTunedUpHeadingBefore?: string
  whyTunedUpHeadingHighlight?: string
  whyTunedUpHeadingAfter?: string
  whyTunedUpReasons?: CrewWhyTunedUpReason[]
  capabilitiesLabel?: string
  capabilitiesHeading?: string
  capabilityPills?: CrewCapabilityPill[]
  capabilitiesCtaLabel?: string
  capabilitiesCtaHref?: string
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
