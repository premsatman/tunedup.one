import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { CREW_PAGE_DOCUMENT_ID } from './lib/sanity/documentIds'
import { schemaTypes } from './studio/schemas'
import { structure } from './studio/structure'

export default defineConfig({
  name: 'tunedup-mission-control',
  title: 'TunedUp Mission Control CMS',
  basePath: '/admin',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      {
        id: CREW_PAGE_DOCUMENT_ID,
        title: 'Crew Page',
        schemaType: 'crewPage',
        value: { _id: CREW_PAGE_DOCUMENT_ID },
      },
      ...templates.filter((template) => template.schemaType !== 'crewPage'),
    ],
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((option) => option.templateId !== CREW_PAGE_DOCUMENT_ID)
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'crewPage') {
        return prev.filter(
          (item) => item.action !== 'duplicate' && item.action !== 'delete',
        )
      }
      return prev
    },
  },
})
