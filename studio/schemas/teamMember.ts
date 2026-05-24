import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Operator',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. Mission Lead, Signal Engineer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Skills or focus areas shown as pills on the crew card',
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'isFounder',
      title: 'Is this the founder?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'founderTitle',
      title: 'Founder display title',
      type: 'string',
      description: 'e.g. "Founder & Lead Strategist"',
    }),
    defineField({
      name: 'founderBio',
      title: 'Founder long bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text bio for the founder section',
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of experience',
      type: 'number',
    }),
    defineField({
      name: 'brandAssociations',
      title: 'Brand Associations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'brandName', type: 'string', title: 'Brand Name' },
            { name: 'logo', type: 'image', title: 'Brand Logo' },
            { name: 'screenshot', type: 'image', title: 'Work Screenshot' },
            { name: 'oneLiner', type: 'string', title: 'One sentence description' },
            { name: 'role', type: 'string', title: 'Your role' },
          ],
        },
      ],
      description: 'Notable brands you have worked with',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
