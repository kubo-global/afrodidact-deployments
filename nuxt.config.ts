// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    modules: ['@pinia/nuxt'],
    runtimeConfig: {
      public: {
        // Shared with the Sanity CLI via the same env vars (see .env.example).
        // Left empty until the project is created — the app falls back to the
        // bundled school list in that case.
        sanity: {
          // projectId is public (ships in the client bundle); the default
          // makes production work with zero config. Override via env if needed.
          projectId: process.env.SANITY_STUDIO_PROJECT_ID || '90d8817c',
          dataset: process.env.SANITY_STUDIO_DATASET || 'production',
        },
      },
    },
    app: {
      head: {
        link: [
          { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
          { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap',
          },
        ],
      },
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
})
