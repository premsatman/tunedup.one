import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Mission',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Mission Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionCodename',
      title: 'Mission Codename',
      type: 'string',
      description: 'e.g. SONG-BOOM-01, MEDIC-14Y',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionType',
      title: 'Mission Type',
      type: 'string',
      options: {
        list: [
          { title: 'Ministry Mission', value: 'ministry' },
          { title: 'Impact Mission', value: 'impact' },
          { title: 'Solo Mission', value: 'solo' },
          { title: 'Launch Mission', value: 'launch' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'One-line tagline',
      type: 'string',
      description: 'Short evocative sentence under the mission name',
    }),
    defineField({
      name: 'frequencyTuned',
      title: 'Frequency tuned to',
      type: 'string',
      description: 'The single note we tuned this mission to. e.g. "Reach without dependency on connectivity."',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'missionPatch',
      title: 'Mission Patch',
      type: 'image',
      description: 'Small circular badge for this mission',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Complete', value: 'complete' },
          { title: 'Active', value: 'active' },
          { title: 'In Tuning', value: 'tuning' },
        ],
      },
      initialValue: 'complete',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'telemetry',
      title: 'Telemetry (metadata row)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
      description: 'e.g. Client / Year / Sector / Role / Status — pairs shown in mono row',
    }),
    defineField({
      name: 'briefRich',
      title: 'The Brief',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'approachRich',
      title: 'Approach',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'approachGallery',
      title: 'Approach Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'technicalSpec',
      title: 'Technical Specification',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcomes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'string', title: 'Number' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Full Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'whatsNext',
      title: "What's Next",
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'missionCodename', media: 'heroImage' },
  },
})
