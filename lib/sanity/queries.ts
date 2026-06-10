import { groq } from 'next-sanity'

export const featuredMissionsQuery = groq`
  *[_type == "caseStudy" && featured == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    missionCodename,
    missionType,
    tagline,
    frequencyTuned,
    heroImage,
    missionPatch,
    status,
    services,
  }
`

export const allMissionsQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    missionCodename,
    missionType,
    tagline,
    frequencyTuned,
    heroImage,
    missionPatch,
    status,
    services,
  }
`

export const missionBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    missionCodename,
    missionType,
    tagline,
    frequencyTuned,
    frequencyTunedOperator-> {
      _id,
      name,
      photo {
        ...,
        asset->
      },
    },
    heroImage,
    heroImageVideoPlaybackId,
    heroVideoPlaybackId,
    heroImage2,
    missionPatch,
    status,
    services,
    order,
    duration,
    year,
    clientName,
    sector,
    role,
    workedOn,
    colorPalette,
    projectDescription,
    problemDescription,
    problemCards,
    mockupPair1,
    mockupSingle1 {
      ...,
      asset->
    },
    solutionDescription,
    solutionCards,
    mockupPairSolution,
    mockupSingleSolution {
      ...,
      asset->
    },
    designProcessDescription,
    projectTimeline[] {
      phaseName,
      startWeek,
      durationWeeks,
      color,
      operators[]-> {
        _id,
        name,
        photo {
          ...,
          asset->
        },
      },
    },
    styleGuideTypography {
      ...,
      asset->
    },
    styleGuideComponents {
      ...,
      asset->
    },
    mockupPair2[] {
      ...,
      asset->
    },
    wireframes[] {
      ...,
      asset->
    },
    outcomes,
    workflowDescription,
    workflowSteps,
    clientFeedback,
    whatsNext,
    relatedMissions[]-> {
      _id,
      title,
      "slug": slug.current,
      missionCodename,
      tagline,
      heroImage
    }
  }
`

export const autoRelatedMissionsQuery = groq`
  *[_type == "caseStudy" && slug.current != $currentSlug] | order(order asc)[0...2] {
    _id,
    title,
    "slug": slug.current,
    missionCodename,
    tagline,
    heroImage
  }
`

export const allMissionSlugsQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    title,
    "slug": slug.current,
    missionCodename,
    heroImage,
    order,
  }
`

export const adjacentMissionsQuery = groq`
  {
    "previous": *[_type == "caseStudy" && order < $currentOrder] | order(order desc)[0] {
      title, "slug": slug.current, missionCodename
    },
    "next": *[_type == "caseStudy" && order > $currentOrder] | order(order asc)[0] {
      title, "slug": slug.current, missionCodename
    }
  }
`

export const allTeamQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, role, bio, photo, crewPhoto, tags, linkedIn, order
  }
`

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, name, description, icon, pricing
  }
`

export const trustLogosQuery = groq`
  *[_type == "trustLogo"] | order(order asc) {
    _id, name, logo, link
  }
`

export const crewPageQuery = groq`
  *[_id == $crewPageId][0] {
    founderOperator-> {
      _id,
      name,
      role,
      bio,
      photo,
      crewPhoto,
      tags,
      linkedIn
    },
    founderPhoto,
    founderTitle,
    founderBio,
    yearsExperience,
    brandAssociations[] {
      brandName,
      logo,
      screenshot,
      oneLiner,
      role,
      liveUrl,
      caseStudySlug,
    },
    whyTunedUpLabel,
    whyTunedUpHeadingBefore,
    whyTunedUpHeadingHighlight,
    whyTunedUpHeadingAfter,
    whyTunedUpReasons[] {
      code,
      headline,
      highlight,
      body,
      order
    },
    capabilitiesLabel,
    capabilitiesHeading,
    capabilityPills[] {
      label,
      color,
      order
    },
    capabilitiesCtaLabel,
    capabilitiesCtaHref,
    careersLabel,
    careersHeadingBefore,
    careersHeadingHighlight,
    careersHeadingAfter,
    careersIntro,
    careersRoles[] {
      title,
      type,
      description,
      statusLabel,
      ctaLabel,
      ctaHref,
      order
    },
    careersFooterBeforeLink,
    careersFooterLinkLabel,
    careersFooterLinkHref,
    careersFooterAfterLink
  }
`
