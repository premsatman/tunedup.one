import { defineField, defineType } from 'sanity'

const serviceCategoryOptions = [
  { title: 'Brand & Identity', value: 'brand-identity' },
  { title: 'Development', value: 'development' },
  { title: 'Design', value: 'design' },
  { title: 'Marketing', value: 'marketing' },
  { title: 'Strategy', value: 'strategy' },
  { title: 'Automation', value: 'automation' },
]

const timelineColorOptions = [
  { title: 'Teal', value: 'teal' },
  { title: 'Orange', value: 'orange' },
  { title: 'Yellow', value: 'yellow' },
  { title: 'Pink', value: 'pink' },
  { title: 'Violet', value: 'violet' },
  { title: 'Lime', value: 'lime' },
  { title: 'Cyan', value: 'cyan' },
  { title: 'Amber', value: 'amber' },
]

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
    }),
    defineField({
      name: 'frequencyTuned',
      title: 'Frequency tuned to',
      type: 'string',
    }),
    defineField({
      name: 'frequencyTunedOperator',
      title: 'Frequency tuned operator',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      description:
        'Operator photo shown on the work detail telemetry card. Falls back to a timeline operator if empty.',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 6 months',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2024 — Ongoing',
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Our Role',
      type: 'string',
    }),
    defineField({
      name: 'heroVideoPlaybackId',
      title: 'Hero Background Video (Mux Playback ID)',
      type: 'string',
      description:
        'Optional Mux playback ID for the hero background video. Leave empty to use the default.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageVideoPlaybackId',
      title: 'Hero Image Video (Mux Playback ID)',
      type: 'string',
      description:
        'Optional Mux playback ID for the featured hero media. If both Hero Image and this video are set, the image shows until the video has loaded.',
    }),
    defineField({
      name: 'heroImage2',
      title: 'Hero Image 2',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'missionPatch',
      title: 'Mission Patch',
      type: 'image',
      options: { hotspot: true },
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
      name: 'workedOn',
      title: 'We Worked On',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              type: 'string',
              title: 'Category',
              options: { list: serviceCategoryOptions },
            },
            {
              name: 'tags',
              type: 'array',
              of: [{ type: 'string' }],
              title: 'Tags',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'colorPalette',
      title: 'Color Palette',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Color Name' },
            { name: 'hex', type: 'string', title: 'Hex Code' },
          ],
        },
      ],
    }),
    defineField({
      name: 'projectDescription',
      title: 'Project Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'problemDescription',
      title: 'Problem Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'problemCards',
      title: 'Problem Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'mockupPair1',
      title: 'Problem Mockup Pair',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'mockupSingle1',
      title: 'Problem Mockup Single',
      type: 'image',
      description: 'Horizontal mockup shown between the pair on mobile and below the pair on desktop.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'solutionDescription',
      title: 'Solution Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'solutionCards',
      title: 'Solution Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'mockupPairSolution',
      title: 'Solution Mockup Pair',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'mockupSingleSolution',
      title: 'Solution Mockup Single',
      type: 'image',
      description: 'Horizontal mockup shown between the pair on mobile and below the pair on desktop.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'designProcessDescription',
      title: 'Design Process Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'projectTimeline',
      title: 'Project Timeline (Gantt)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'phase',
          fields: [
            { name: 'phaseName', type: 'string', title: 'Phase Name' },
            { name: 'startWeek', type: 'number', title: 'Start Week' },
            { name: 'durationWeeks', type: 'number', title: 'Duration (weeks)' },
            {
              name: 'color',
              type: 'string',
              title: 'Bar Color',
              options: { list: timelineColorOptions },
            },
            {
              name: 'operators',
              type: 'array',
              title: 'Operators (who worked on this phase)',
              description:
                'Team members involved in this phase. Their avatars will stack on the Gantt bar.',
              of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
              validation: (Rule) => Rule.max(5),
            },
          ],
          preview: {
            select: {
              name: 'phaseName',
              start: 'startWeek',
              duration: 'durationWeeks',
              op0: 'operators.0->name',
              op1: 'operators.1->name',
              op2: 'operators.2->name',
            },
            prepare({
              name,
              start,
              duration,
              op0,
              op1,
              op2,
            }: {
              name?: string
              start?: number
              duration?: number
              op0?: string
              op1?: string
              op2?: string
            }) {
              const ops = [op0, op1, op2].filter(Boolean).join(', ')
              return {
                title: name,
                subtitle: `Week ${start} → ${(start ?? 0) + (duration ?? 0) - 1}${ops ? ` · ${ops}` : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'styleGuideTypography',
      title: 'Style Guide — Typography',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'styleGuideComponents',
      title: 'Style Guide — Components',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mockupPair2',
      title: 'System Mockup Pair',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'wireframes',
      title: 'Wireframes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(3),
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
      name: 'workflowDescription',
      title: 'Workflow Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'workflowSteps',
      title: 'Workflow Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepTitle', type: 'string', title: 'Step Title' },
            { name: 'stepDescription', type: 'text', title: 'Step Description', rows: 3 },
            { name: 'screenshot', type: 'image', title: 'Screenshot', options: { hotspot: true } },
          ],
        },
      ],
    }),
    defineField({
      name: 'clientFeedback',
      title: 'Client Feedback',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text', title: 'Quote', rows: 4 },
        { name: 'authorName', type: 'string', title: 'Author Name' },
        { name: 'authorRole', type: 'string', title: 'Author Role' },
        { name: 'authorOrg', type: 'string', title: 'Organisation' },
        { name: 'authorPhoto', type: 'image', title: 'Author Photo', options: { hotspot: true } },
        {
          name: 'clientLogo',
          type: 'image',
          title: 'Client Company Logo',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'whatsNext',
      title: "What's Next",
      type: 'text',
      rows: 3,
      description: 'Short note about ongoing work — shown when signal is still active',
    }),
    defineField({
      name: 'relatedMissions',
      title: 'Related Missions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
    }),
    defineField({
      name: 'telemetry',
      title: 'Telemetry (legacy metadata row)',
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
      name: 'services',
      title: 'Services (tag pills)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Brand Identity',
          'Website',
          'Mobile App',
          'Google Ads',
          'SEO',
          'Workflow Automation',
          'Strategy',
          'Content',
        ],
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Full Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'missionCodename', media: 'heroImage' },
  },
})
