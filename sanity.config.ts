import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

/**
 * Standalone Studio config, used by the Sanity CLI
 * (`sanity dev`, `sanity deploy`, `sanity dataset import`, ...).
 *
 * The Studio embedded in the Nuxt app at /studio builds its own config from
 * the runtime Sanity settings — see pages/studio/[...slug].vue. Both reuse the
 * same `schemaTypes`.
 */
export default defineConfig({
  name: 'default',
  title: 'Afrodidact Deployments',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
