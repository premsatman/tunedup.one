import type {
  CrewCapabilitiesSection,
  CrewCareersSection,
  CrewFounderSection,
  CrewPageRecord,
  CrewRecognitionSection,
} from '@/lib/types/crewPage'

export const defaultFounderSection: CrewFounderSection = {
  founderTitle: 'Founder & Digital Strategist',
  yearsExperience: 14,
  brandAssociations: [],
}

export const defaultCapabilitiesSection: CrewCapabilitiesSection = {
  label: '/ Capabilities',
  heading: 'Websites, branding, ads, apps, automation & strategy.',
  pills: [
    { label: 'Websites', color: 'pink', order: 1 },
    { label: 'Branding', color: 'yellow', order: 2 },
    { label: 'Google Ads', color: 'orange', order: 3 },
    { label: 'Mobile Apps', color: 'cyan', order: 4 },
    { label: 'Automation', color: 'lime', order: 5 },
    { label: 'Strategy', color: 'white', order: 6 },
    { label: 'NGO Ad Grants', color: 'violet', order: 7 },
    { label: 'SEO', color: 'amber', order: 8 },
  ],
  ctaLabel: 'Start a project →',
  ctaHref: '/contact',
}

export const defaultRecognitionSection: CrewRecognitionSection = {
  label: '/ Recognition',
  headingBefore: 'From churches to clinics — we tune what ',
  headingHighlight: 'matters.',
  headingAfter: '',
  items: [
    { left: 'World Vision', right: 'Digital Campaign · International NGO', order: 1 },
    { left: 'Sharon Church — Odia Lutheran', right: 'Song Boom App · 10,000+ Downloads', order: 2 },
    { left: 'Hospital Group — Hyderabad', right: 'Patient Acquisition · 14 Years', order: 3 },
    { left: 'PS.Today Devotional', right: '365-Day · 3 Languages · Self-Published', order: 4 },
    { left: 'Transformation Night', right: 'Event Campaign · Live', order: 5 },
  ],
}

export const defaultCareersSection: CrewCareersSection = {
  label: '/ Careers',
  headingBefore: 'Sometimes all you need is the right ',
  headingHighlight: 'people',
  headingAfter: ' by your side.',
  intro:
    "We're not actively hiring right now — but we love meeting talented people early. If your work is strong and your values align, we'll remember you when the right project comes along.",
  roles: [
    {
      title: 'Designer',
      type: 'Freelance / Part-time',
      description: 'Brand identity, UI/UX, digital design',
      statusLabel: 'Keep on file',
      ctaLabel: 'Introduce yourself',
      ctaHref: '/contact?branch=join',
      order: 1,
    },
    {
      title: 'Developer',
      type: 'Freelance / Part-time',
      description: 'Next.js, React Native, full-stack',
      statusLabel: 'Keep on file',
      ctaLabel: 'Introduce yourself',
      ctaHref: '/contact?branch=join',
      order: 2,
    },
    {
      title: 'Content & Copywriter',
      type: 'Freelance',
      description: 'Brand voice, web copy, long-form content',
      statusLabel: 'Keep on file',
      ctaLabel: 'Introduce yourself',
      ctaHref: '/contact?branch=join',
      order: 3,
    },
  ],
  footerBeforeLink: "Don't see your role? Send a note anyway via ",
  footerLinkLabel: 'the contact page',
  footerLinkHref: '/contact?branch=join',
  footerAfterLink: '.',
}

export const defaultCrewPage: CrewPageRecord = {
  founder: defaultFounderSection,
  capabilities: defaultCapabilitiesSection,
  recognition: defaultRecognitionSection,
  careers: defaultCareersSection,
}

export const sortByOrder = <T extends { order?: number }>(items: T[]) =>
  [...items].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
