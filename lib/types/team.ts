import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImage } from '@/lib/types/mission'

export type BrandAssociation = {
  brandName?: string
  logo?: SanityImage
  screenshot?: SanityImage
  oneLiner?: string
  role?: string
}

export type TeamMemberRecord = {
  _id: string
  name: string
  role?: string
  bio?: string
  photo?: SanityImage
  photoSrc?: string
  tags?: string[]
  linkedIn?: string
  order?: number
}

export type FounderRecord = TeamMemberRecord & {
  founderTitle?: string
  founderBio?: PortableTextBlock[]
  yearsExperience?: number
  brandAssociations?: BrandAssociation[]
}
