import type { FounderRecord, TeamMemberRecord } from '@/lib/types/team'
import type { CrewFounderSection, CrewPageSanityRecord } from '@/lib/types/crewPage'
import { defaultFounderSection } from '@/lib/data/crewPageDefaults'

export const FOUNDER_PHOTO_SRC = '/crew/premasis-victory.jpg'

const crewPhotoByNameKey: Record<string, string> = {
  pankaj: '/crew/pankaj-astro.jpg',
  tarsh: '/crew/tarsh-astro.jpg',
}

const normalizeName = (name: string) => name.trim().toLowerCase().replace(/\s+/g, '')

export const isPremasisOperator = (member: TeamMemberRecord) =>
  normalizeName(member.name).includes('premasis')

export const resolveLocalCrewPhoto = (name: string): string | undefined => {
  const normalized = normalizeName(name)
  const key = Object.keys(crewPhotoByNameKey).find((part) => normalized.includes(part))
  return key ? crewPhotoByNameKey[key] : undefined
}

export const staticFounder: FounderRecord = {
  _id: 'crew-premasis',
  name: 'Premasis Satman',
  role: 'Founder & Digital Strategist',
  founderTitle: 'Founder & Digital Strategist',
  photoSrc: FOUNDER_PHOTO_SRC,
  yearsExperience: 14,
}

const staticCrewFallback: TeamMemberRecord[] = [
  {
    _id: 'crew-premasis',
    name: 'Premasis Satman',
    role: 'Founder & Digital Strategist',
    photoSrc: FOUNDER_PHOTO_SRC,
    order: 1,
  },
  {
    _id: 'crew-pankaj',
    name: 'Pankaj Nayak',
    role: 'iOS & Software Developer',
    photoSrc: crewPhotoByNameKey.pankaj,
    order: 2,
  },
  {
    _id: 'crew-tarsh',
    name: 'Tarsh Majhi',
    role: 'Lead Designer',
    photoSrc: crewPhotoByNameKey.tarsh,
    order: 3,
  },
]

const withCrewPagePhoto = (member: TeamMemberRecord): TeamMemberRecord => ({
  ...member,
  photoSrc: member.crewPhoto
    ? undefined
    : resolveLocalCrewPhoto(member.name) ?? member.photoSrc,
})

export const resolveFounderFromCrewPage = (
  record: CrewPageSanityRecord | null,
  team: TeamMemberRecord[] = [],
): FounderRecord => {
  const founderSection: CrewFounderSection = {
    operatorId: record?.founderOperator?._id,
    founderPhoto: record?.founderPhoto,
    founderTitle: record?.founderTitle?.trim() || defaultFounderSection.founderTitle,
    founderBio: record?.founderBio,
    yearsExperience: record?.yearsExperience ?? defaultFounderSection.yearsExperience,
    brandAssociations: record?.brandAssociations,
  }

  const operatorFromRef = record?.founderOperator
  const operatorFromTeam =
    (founderSection.operatorId
      ? team.find((member) => member._id === founderSection.operatorId)
      : undefined) ?? team.find(isPremasisOperator)

  const operator: TeamMemberRecord | undefined = operatorFromRef
    ? {
        _id: operatorFromRef._id,
        name: operatorFromRef.name,
        role: operatorFromRef.role,
        bio: operatorFromRef.bio,
        photo: operatorFromRef.photo,
        crewPhoto: operatorFromRef.crewPhoto,
        tags: operatorFromRef.tags,
        linkedIn: operatorFromRef.linkedIn,
      }
    : operatorFromTeam

  return {
    ...staticFounder,
    ...operator,
    _id: operator?._id ?? staticFounder._id,
    name: operator?.name ?? staticFounder.name,
    role: operator?.role ?? staticFounder.role,
    bio: operator?.bio,
    tags: operator?.tags,
    linkedIn: operator?.linkedIn,
    photo: operator?.photo,
    founderPhoto: founderSection.founderPhoto,
    founderTitle: founderSection.founderTitle,
    founderBio: founderSection.founderBio,
    yearsExperience: founderSection.yearsExperience,
    brandAssociations: founderSection.brandAssociations,
    photoSrc: founderSection.founderPhoto ? undefined : FOUNDER_PHOTO_SRC,
  }
}

export const resolveCrewTeam = (sanityTeam: TeamMemberRecord[]): TeamMemberRecord[] => {
  const crewFromSanity = sanityTeam
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .map(withCrewPagePhoto)

  if (crewFromSanity.length > 0) return crewFromSanity

  return staticCrewFallback.map(withCrewPagePhoto)
}

export const getTeamMemberPhotoSrc = (member: TeamMemberRecord): string | null => {
  if (isPremasisOperator(member)) return FOUNDER_PHOTO_SRC
  return member.photoSrc ?? resolveLocalCrewPhoto(member.name) ?? null
}
