import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Capability',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional Lucide icon name or short label for UI',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing note',
      type: 'string',
      description: 'e.g. From $2,500 / month or Custom quote',
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
    select: { title: 'name', subtitle: 'pricing' },
  },
})
