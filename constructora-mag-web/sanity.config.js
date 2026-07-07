import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import {deskStructure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Constructora MAG - CMS',

  projectId: 'bdqq6fie',
  dataset: 'production',

  plugins: [structureTool({ structure: deskStructure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
