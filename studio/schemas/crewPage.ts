import { defineField, defineType } from 'sanity'

const pillColorOptions = [
  { title: 'Pink', value: 'pink' },
  { title: 'Yellow', value: 'yellow' },
  { title: 'Orange', value: 'orange' },
  { title: 'Cyan', value: 'cyan' },
  { title: 'Lime', value: 'lime' },
  { title: 'White', value: 'white' },
  { title: 'Violet', value: 'violet' },
  { title: 'Amber', value: 'amber' },
]

const brandAssociationFields = [
  defineField({ name: 'brandName', type: 'string', title: 'Brand Name' }),
  defineField({
    name: 'logo',
    type: 'image',
    title: 'Brand Logo',
    description: 'Horizontal logo — displays at 64×24px. Upload ~200–400px wide, transparent PNG/SVG.',
  }),
  defineField({
    name: 'screenshot',
    type: 'image',
    title: 'Work Screenshot',
    description: '16:9 screenshot — displays full card width. Upload at least 800×450px (1600×900px for retina).',
    options: { hotspot: true },
  }),
  defineField({ name: 'oneLiner', type: 'string', title: 'One sentence description' }),
  defineField({ name: 'role', type: 'string', title: 'Your role' }),
  defineField({
    name: 'liveUrl',
    title: 'Live site URL',
    description:
      'Optional. If this is a site we built and it is publicly live, paste the full URL (https://…). The whole card becomes a link to it, opening in a new tab with a ↗ icon. Leave blank for app-only or campaign-only work.',
    type: 'url',
    validation: (Rule) =>
      Rule.uri({ scheme: ['http', 'https'] }).error('Must be a full http(s) URL'),
  }),
  defineField({
    name: 'caseStudySlug',
    title: 'Case study slug',
    description:
      'Optional. If there is no live site but there IS a /work case study, enter its slug (e.g. "world-vision"). The card links internally to /work/[slug] with a → icon. Ignored if Live site URL is filled.',
    type: 'string',
  }),
]

export default defineType({
  name: 'crewPage',
  title: 'Crew Page',
  type: 'document',
  description: 'Singleton — Founder, Brand Associations, Why TunedUp, Capabilities, and Careers for /crew.',
  groups: [
    { name: 'founder', title: '/ Founder', default: true },
    { name: 'brandAssociations', title: '/ Brand Associations' },
    { name: 'whyTunedUp', title: '/ Why TunedUp' },
    { name: 'capabilities', title: '/ Capabilities' },
    { name: 'careers', title: '/ Careers' },
  ],
  fields: [
    defineField({
      name: 'founderOperator',
      title: 'Founder operator',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      group: 'founder',
      description: 'Links Premasis (or founder) for name, tags, and LinkedIn on the crew page.',
    }),
    defineField({
      name: 'founderPhoto',
      title: 'Founder photo',
      type: 'image',
      options: { hotspot: true },
      group: 'founder',
      description:
        'Portrait for the founder block on /crew (3:4). Separate from operator crew photos used in / The Crew grid.',
    }),
    defineField({
      name: 'founderTitle',
      title: 'Founder display title',
      type: 'string',
      group: 'founder',
      description: 'e.g. "Founder & Lead Strategist"',
      initialValue: 'Founder & Digital Strategist',
    }),
    defineField({
      name: 'founderBio',
      title: 'Founder long bio',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'founder',
      description: 'Rich text bio for the founder section',
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of experience',
      type: 'number',
      group: 'founder',
      initialValue: 14,
    }),

    defineField({
      name: 'brandAssociations',
      title: 'Brand associations',
      type: 'array',
      group: 'brandAssociations',
      of: [
        {
          type: 'object',
          name: 'brandAssociation',
          fields: brandAssociationFields,
          preview: {
            select: { title: 'brandName', subtitle: 'role', media: 'logo' },
          },
        },
      ],
      description: 'Notable brands shown in the founder section on /crew.',
    }),

    defineField({
      name: 'whyTunedUpLabel',
      title: 'Section label',
      type: 'string',
      group: 'whyTunedUp',
      initialValue: '/ Why TunedUp',
    }),
    defineField({
      name: 'whyTunedUpHeadingBefore',
      title: 'Heading (before highlight)',
      type: 'string',
      group: 'whyTunedUp',
      initialValue: 'Four honest reasons to ',
    }),
    defineField({
      name: 'whyTunedUpHeadingHighlight',
      title: 'Heading highlight',
      type: 'string',
      group: 'whyTunedUp',
      initialValue: 'work with us.',
    }),
    defineField({
      name: 'whyTunedUpHeadingAfter',
      title: 'Heading (after highlight)',
      type: 'string',
      group: 'whyTunedUp',
    }),
    defineField({
      name: 'whyTunedUpReasons',
      title: 'Reason cards',
      type: 'array',
      group: 'whyTunedUp',
      of: [
        {
          type: 'object',
          name: 'whyTunedUpReason',
          fields: [
            defineField({
              name: 'code',
              title: 'Card code',
              type: 'string',
              description: 'e.g. /01',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'headline',
              title: 'Headline',
              type: 'string',
              description: 'Full headline including the highlighted phrase',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'highlight',
              title: 'Highlighted phrase',
              type: 'string',
              description: 'Exact substring from the headline to render muted',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body copy',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              initialValue: 0,
            }),
          ],
          preview: {
            select: { title: 'code', subtitle: 'headline' },
          },
        },
      ],
    }),

    defineField({
      name: 'capabilitiesLabel',
      title: 'Section label',
      type: 'string',
      group: 'capabilities',
      initialValue: '/ Capabilities',
    }),
    defineField({
      name: 'capabilitiesHeading',
      title: 'Section heading',
      type: 'string',
      group: 'capabilities',
      initialValue: 'Websites, branding, ads, apps, automation & strategy.',
    }),
    defineField({
      name: 'capabilityPills',
      title: 'Capability pills',
      type: 'array',
      group: 'capabilities',
      of: [
        {
          type: 'object',
          name: 'capabilityPill',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'color',
              title: 'Pill color',
              type: 'string',
              options: { list: pillColorOptions },
              initialValue: 'pink',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              initialValue: 0,
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'color' },
          },
        },
      ],
    }),
    defineField({
      name: 'capabilitiesCtaLabel',
      title: 'CTA button label',
      type: 'string',
      group: 'capabilities',
      initialValue: 'Start a project →',
    }),
    defineField({
      name: 'capabilitiesCtaHref',
      title: 'CTA button link',
      type: 'string',
      group: 'capabilities',
      initialValue: '/contact',
    }),

    defineField({
      name: 'careersLabel',
      title: 'Section label',
      type: 'string',
      group: 'careers',
      initialValue: '/ Careers',
    }),
    defineField({
      name: 'careersHeadingBefore',
      title: 'Heading (before highlight)',
      type: 'string',
      group: 'careers',
      initialValue: 'Sometimes all you need is the right ',
    }),
    defineField({
      name: 'careersHeadingHighlight',
      title: 'Heading highlight word',
      type: 'string',
      group: 'careers',
      initialValue: 'people',
    }),
    defineField({
      name: 'careersHeadingAfter',
      title: 'Heading (after highlight)',
      type: 'string',
      group: 'careers',
      initialValue: ' by your side.',
    }),
    defineField({
      name: 'careersIntro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 4,
      group: 'careers',
      initialValue:
        "We're not actively hiring right now — but we love meeting talented people early. If your work is strong and your values align, we'll remember you when the right project comes along.",
    }),
    defineField({
      name: 'careersRoles',
      title: 'Open roles',
      type: 'array',
      group: 'careers',
      of: [
        {
          type: 'object',
          name: 'careersRole',
          fields: [
            defineField({
              name: 'title',
              title: 'Role title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Role type',
              type: 'string',
              description: 'e.g. Freelance / Part-time',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'statusLabel',
              title: 'Status label',
              type: 'string',
              initialValue: 'Keep on file',
            }),
            defineField({
              name: 'ctaLabel',
              title: 'CTA label',
              type: 'string',
              initialValue: 'Introduce yourself',
            }),
            defineField({
              name: 'ctaHref',
              title: 'CTA link',
              type: 'string',
              initialValue: '/contact?branch=join',
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              initialValue: 0,
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'type' },
          },
        },
      ],
    }),
    defineField({
      name: 'careersFooterBeforeLink',
      title: 'Footer note (before link)',
      type: 'string',
      group: 'careers',
      initialValue: "Don't see your role? Send a note anyway via ",
    }),
    defineField({
      name: 'careersFooterLinkLabel',
      title: 'Footer link label',
      type: 'string',
      group: 'careers',
      initialValue: 'the contact page',
    }),
    defineField({
      name: 'careersFooterLinkHref',
      title: 'Footer link URL',
      type: 'string',
      group: 'careers',
      initialValue: '/contact?branch=join',
    }),
    defineField({
      name: 'careersFooterAfterLink',
      title: 'Footer note (after link)',
      type: 'string',
      group: 'careers',
      initialValue: '.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Crew Page Content' }),
  },
})
