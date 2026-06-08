import type {
  CrewCapabilitiesSection,
  CrewCareersSection,
  CrewFounderSection,
  CrewPageRecord,
  CrewWhyTunedUpSection,
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

export const defaultWhyTunedUpSection: CrewWhyTunedUpSection = {
  label: '/ Why TunedUp',
  headingBefore: 'Four honest reasons to ',
  headingHighlight: 'work with us.',
  headingAfter: '',
  reasons: [
    {
      code: '/01',
      headline: 'Small enough to know your name.',
      highlight: 'know your name',
      body: "You'll always know who's doing your work. We don't rotate accounts or hand you off to juniors after the first call.",
      order: 1,
    },
    {
      code: '/02',
      headline: 'We understand your mission.',
      highlight: 'your mission',
      body: 'We serve churches, NGOs, and founders — not everyone. That specificity means we ask better questions and make fewer wrong assumptions.',
      order: 2,
    },
    {
      code: '/03',
      headline: 'We stay after launch.',
      highlight: 'after launch',
      body: "Most agencies disappear the day the site goes live. We're the crew still watching the telemetry six months later.",
      order: 3,
    },
    {
      code: '/04',
      headline: 'We tune, not guess.',
      highlight: 'not guess',
      body: "Every decision is tied to a goal you gave us. We don't do creative vibes — we do measurable craft.",
      order: 4,
    },
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
  whyTunedUp: defaultWhyTunedUpSection,
  capabilities: defaultCapabilitiesSection,
  careers: defaultCareersSection,
}

export const sortByOrder = <T extends { order?: number }>(items: T[]) =>
  [...items].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
