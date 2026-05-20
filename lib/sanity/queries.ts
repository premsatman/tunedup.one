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
    heroImage,
    missionPatch,
    status,
    order,
    telemetry,
    briefRich,
    approachRich,
    approachGallery,
    technicalSpec,
    outcomes,
    gallery,
    whatsNext,
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
    _id, name, role, bio, photo, tags
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
