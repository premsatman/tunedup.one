import {
  defaultCapabilitiesSection,
  defaultCareersSection,
  defaultCrewPage,
  defaultFounderSection,
  defaultRecognitionSection,
  sortByOrder,
} from '@/lib/data/crewPageDefaults'
import type {
  CrewCapabilityPill,
  CrewCareersRole,
  CrewFounderSection,
  CrewPageRecord,
  CrewPageSanityRecord,
  CrewPillColor,
  CrewRecognitionItem,
} from '@/lib/types/crewPage'

const pillColors: CrewPillColor[] = [
  'pink',
  'yellow',
  'orange',
  'cyan',
  'lime',
  'white',
  'violet',
  'amber',
]

const isPillColor = (value: string | undefined): value is CrewPillColor =>
  Boolean(value && pillColors.includes(value as CrewPillColor))

const normalizePills = (pills?: CrewCapabilityPill[]) => {
  const source = pills?.length ? pills : defaultCapabilitiesSection.pills
  return sortByOrder(
    source
      .filter((pill) => pill.label?.trim())
      .map((pill) => ({
        label: pill.label.trim(),
        color: isPillColor(pill.color) ? pill.color : 'pink',
        order: pill.order,
      })),
  )
}

const normalizeRecognitionItems = (items?: CrewRecognitionItem[]) => {
  const source = items?.length ? items : defaultRecognitionSection.items
  return sortByOrder(
    source
      .filter((item) => item.left?.trim() && item.right?.trim())
      .map((item) => ({
        left: item.left.trim(),
        right: item.right.trim(),
        order: item.order,
      })),
  )
}

const normalizeCareersRoles = (roles?: CrewCareersRole[]) => {
  const source = roles?.length ? roles : defaultCareersSection.roles
  return sortByOrder(
    source
      .filter((role) => role.title?.trim() && role.type?.trim() && role.description?.trim())
      .map((role) => ({
        title: role.title.trim(),
        type: role.type.trim(),
        description: role.description.trim(),
        statusLabel: role.statusLabel?.trim() || defaultCareersSection.roles[0].statusLabel,
        ctaLabel: role.ctaLabel?.trim() || defaultCareersSection.roles[0].ctaLabel,
        ctaHref: role.ctaHref?.trim() || defaultCareersSection.roles[0].ctaHref,
        order: role.order,
      })),
  )
}

const normalizeFounder = (record: CrewPageSanityRecord): CrewFounderSection => ({
  operatorId: record.founderOperator?._id,
  founderPhoto: record.founderPhoto,
  founderTitle: record.founderTitle?.trim() || defaultFounderSection.founderTitle,
  founderBio: record.founderBio,
  yearsExperience: record.yearsExperience ?? defaultFounderSection.yearsExperience,
  brandAssociations: record.brandAssociations,
})

export const resolveCrewPage = (record: CrewPageSanityRecord | null): CrewPageRecord => {
  if (!record) return defaultCrewPage

  return {
    founder: normalizeFounder(record),
    capabilities: {
      label: record.capabilitiesLabel?.trim() || defaultCapabilitiesSection.label,
      heading: record.capabilitiesHeading?.trim() || defaultCapabilitiesSection.heading,
      pills: normalizePills(record.capabilityPills),
      ctaLabel: record.capabilitiesCtaLabel?.trim() || defaultCapabilitiesSection.ctaLabel,
      ctaHref: record.capabilitiesCtaHref?.trim() || defaultCapabilitiesSection.ctaHref,
    },
    recognition: {
      label: record.recognitionLabel?.trim() || defaultRecognitionSection.label,
      headingBefore:
        record.recognitionHeadingBefore?.trim() || defaultRecognitionSection.headingBefore,
      headingHighlight:
        record.recognitionHeadingHighlight?.trim() ||
        defaultRecognitionSection.headingHighlight,
      headingAfter:
        record.recognitionHeadingAfter?.trim() || defaultRecognitionSection.headingAfter,
      items: normalizeRecognitionItems(record.recognitionItems),
    },
    careers: {
      label: record.careersLabel?.trim() || defaultCareersSection.label,
      headingBefore: record.careersHeadingBefore?.trim() || defaultCareersSection.headingBefore,
      headingHighlight:
        record.careersHeadingHighlight?.trim() || defaultCareersSection.headingHighlight,
      headingAfter: record.careersHeadingAfter?.trim() || defaultCareersSection.headingAfter,
      intro: record.careersIntro?.trim() || defaultCareersSection.intro,
      roles: normalizeCareersRoles(record.careersRoles),
      footerBeforeLink:
        record.careersFooterBeforeLink?.trim() || defaultCareersSection.footerBeforeLink,
      footerLinkLabel:
        record.careersFooterLinkLabel?.trim() || defaultCareersSection.footerLinkLabel,
      footerLinkHref:
        record.careersFooterLinkHref?.trim() || defaultCareersSection.footerLinkHref,
      footerAfterLink:
        record.careersFooterAfterLink?.trim() || defaultCareersSection.footerAfterLink,
    },
  }
}

export const crewPillColorClasses: Record<CrewPillColor, string> = {
  pink: 'bg-pink-400 text-pink-950',
  yellow: 'bg-yellow-400 text-yellow-950',
  orange: 'bg-orange-400 text-orange-950',
  cyan: 'bg-cyan-400 text-cyan-950',
  lime: 'bg-lime-400 text-lime-950',
  white: 'bg-white text-black border border-[var(--line)]',
  violet: 'bg-violet-400 text-violet-950',
  amber: 'bg-amber-400 text-amber-950',
}
