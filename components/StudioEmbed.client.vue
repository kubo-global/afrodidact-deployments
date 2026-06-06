<template>
  <div ref="studioEl" class="studio-embed">
    <p v-if="error" class="studio-embed__message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { Studio, defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '~/sanity/schemaTypes'

const studioEl = ref<HTMLElement | null>(null)
const error = ref<string | null>(null)
let root: Root | null = null

onMounted(async () => {
  const { projectId, dataset } = useRuntimeConfig().public.sanity
  if (!projectId) {
    error.value =
      'No Sanity project configured. Set SANITY_STUDIO_PROJECT_ID in your .env and restart.'
    return
  }

  // Under <Suspense> (Nuxt pages) the template ref isn't populated on the
  // first mount flush — wait a tick so the container element exists.
  await nextTick()
  if (!studioEl.value) {
    error.value = 'Studio container not ready.'
    return
  }

  try {
    const config = defineConfig({
      name: 'embedded',
      title: 'Afrodidact Deployments',
      projectId,
      dataset: dataset || 'production',
      basePath: '/studio',
      plugins: [structureTool(), visionTool()],
      schema: { types: schemaTypes },
    })

    root = createRoot(studioEl.value)
    root.render(createElement(Studio, { config }))
  } catch (err: any) {
    console.error('[StudioEmbed] mount failed:', err)
    error.value = `Studio failed to mount: ${err?.message || err}`
  }
})

onBeforeUnmount(() => {
  root?.unmount()
  root = null
})
</script>

<style>
.studio-embed {
  position: fixed;
  inset: 0;
  height: 100vh;
}
.studio-embed__message {
  padding: 2rem;
  font-family: 'Work Sans', sans-serif;
}
</style>
