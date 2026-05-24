import type { FounderRecord, TeamMemberRecord } from '@/lib/types/team'

export const FOUNDER_PHOTO_SRC = '/crew/Prem-founder.jpg'

const crewPhotoByName: Record<string, string> = {
  premasis: '/crew/Premasis.jpg',
  pankaj: '/crew/Pankaj.jpg',
  tarsh: '/crew/Tarsh.jpg',
}

const normalizeName = (name: string) => name.trim().toLowerCase().replace(/\s+/g, '')

export const resolveLocalCrewPhoto = (name: string): string | undefined =>
  crewPhotoByName[normalizeName(name)]

export const staticFounder: FounderRecord = {
  _id: 'crew-premasis',
  name: 'Premasis',
  role: 'Founder & Lead Strategist',
  founderTitle: 'Founder & Lead Strategist',
  isFounder: true,
  photoSrc: FOUNDER_PHOTO_SRC,
  yearsExperience: 14,
}

export const staticCrew: TeamMemberRecord[] = [
  {
    _id: 'crew-pankaj',
    name: 'Pankaj',
    role: 'Developer',
    photoSrc: '/crew/Pankaj.jpg',
  },
  {
    _id: 'crew-tarsh',
    name: 'Tarsh',
    role: 'Designer',
    photoSrc: '/crew/Tarsh.jpg',
  },
]

const mergeSanityMember = (
  staticMember: TeamMemberRecord,
  sanityTeam: TeamMemberRecord[]
): TeamMemberRecord => {
  const sanityMatch = sanityTeam.find(
    (member) => normalizeName(member.name) === normalizeName(staticMember.name)
  )

  if (!sanityMatch) return staticMember

  return {
    ...staticMember,
    ...sanityMatch,
    photoSrc: staticMember.photoSrc,
  }
}

export const resolveFounder = (founder: FounderRecord | null): FounderRecord => {
  const base = founder ?? staticFounder
  return { ...staticFounder, ...base, photoSrc: FOUNDER_PHOTO_SRC }
}

export const resolveCrewTeam = (sanityTeam: TeamMemberRecord[]): TeamMemberRecord[] =>
  staticCrew.map((member) => mergeSanityMember(member, sanityTeam))

export const getTeamMemberPhotoSrc = (member: TeamMemberRecord): string | null => {
  if (member.isFounder) return FOUNDER_PHOTO_SRC
  return resolveLocalCrewPhoto(member.name) ?? member.photoSrc ?? null
}
