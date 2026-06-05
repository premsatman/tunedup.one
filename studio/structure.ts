import type { StructureResolver } from 'sanity/structure'
import { CREW_PAGE_DOCUMENT_ID } from '../lib/sanity/documentIds'

const singletonSchemaTypes = new Set(['crewPage'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Crew Page')
        .id('singleton-crew-page')
        .child(
          S.document()
            .schemaType('crewPage')
            .documentId(CREW_PAGE_DOCUMENT_ID)
            .title('Crew Page'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonSchemaTypes.has(listItem.getId() ?? ''),
      ),
    ])
