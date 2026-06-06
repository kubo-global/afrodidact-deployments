import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Hosted Studio at https://afrodidact-deployments.sanity.studio
  studioHost: 'afrodidact-deployments',
  deployment: {
    appId: 'yiu1q1voa12alg90mj6a18ug',
  },
})
