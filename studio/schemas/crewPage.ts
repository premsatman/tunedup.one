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
  defineField({ name: 'logo', type: 'image', title: 'Brand Logo' }),
  defineField({ name: 'screenshot', type: 'image', title: 'Work Screenshot' }),
  defineField({ name: 'oneLiner', type: 'string', title: 'One sentence description' }),
  defineField({ name: 'role', type: 'string', title: 'Your role' }),
]

export default defineType({
  name: 'crewPage',
  title: 'Crew Page',
  type: 'document',
  description: 'Singleton — Founder, Capabilities, Recognition, and Careers for /crew.',
  groups: [
    { name: 'founder', title: '/ Founder', default: true },
    { name: 'capabilities', title: '/ Capabilities' },
    { name: 'recognition', title: '/ Recognition' },
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
      title: 'Brand Associations',
      type: 'array',
      group: 'founder',
      of: [
        {
          type: 'object',
          name: 'brandAssociation',
          fields: brandAssociationFields,
        },
      ],
      description: 'Notable brands shown below the founder bio',
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
      name: 'recognitionLabel',
      title: 'Section label',
      type: 'string',
      group: 'recognition',
      initialValue: '/ Recognition',
    }),
    defineField({
      name: 'recognitionHeadingBefore',
      title: 'Heading (before highlight)',
      type: 'string',
      group: 'recognition',
      initialValue: 'From churches to clinics — we tune what ',
    }),
    defineField({
      name: 'recognitionHeadingHighlight',
      title: 'Heading highlight word',
      type: 'string',
      group: 'recognition',
      initialValue: 'matters.',
    }),
    defineField({
      name: 'recognitionHeadingAfter',
      title: 'Heading (after highlight)',
      type: 'string',
      group: 'recognition',
    }),
    defineField({
      name: 'recognitionItems',
      title: 'Recognition rows',
      type: 'array',
      group: 'recognition',
      of: [
        {
          type: 'object',
          name: 'recognitionItem',
          fields: [
            defineField({
              name: 'left',
              title: 'Primary line',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'right',
              title: 'Secondary line',
              type: 'string',
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
            select: { title: 'left', subtitle: 'right' },
          },
        },
      ],
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
