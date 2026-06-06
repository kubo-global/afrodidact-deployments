# AfrodidactDeployments Map

This application allows users to locate schools on a map using Mapbox GL JS. Users can click on buttons or markers to view school details in a sidebar. The sidebar can be expanded or collapsed to provide more space for the map. The application is built using Nuxt 3, Tailwind CSS, Mapbox GL JS, and a Sanity CMS backend.

## Development

```bash
npm install
npm run dev          # map app at http://localhost:3000
```

Styling follows the afrodidact.org brand (Work Sans, brand colours in `tailwind.config.js`).

## Sanity backend

School content (name, location, pupil/KUBO counts, description, class photo) is
managed in [Sanity](https://www.sanity.io). The project is **already set up**
(project `90d8817c`, dataset `production`, with the four schools imported). If
Sanity is ever unreachable the app falls back to the bundled list in
`stores/schools.ts`, so it always renders.

The **Studio is hosted by Sanity** at
**https://afrodidact-deployments.sanity.studio** — open it (logged into Sanity,
as a project member) to edit schools. Changes appear on the map on next load.

The `projectId` is public and defaulted in `nuxt.config.ts`, so no env config is
needed to *read* content. To point at a different project/dataset, set
`SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` (shared with the Sanity CLI;
see `.env.example`).

### Deploying the Studio

The Studio config lives in `sanity.config.ts` / `sanity.cli.ts` and the schema in
`sanity/schemaTypes/`. To publish changes to the hosted Studio:

```bash
npm run studio:deploy      # sanity deploy -> *.sanity.studio
npm run studio:dev         # run the Studio locally
```

### Re-importing / seeding (already done once)

`scripts/import-schools.mjs` uploads the four bundled photos and creates the
`school` docs. Needs an Editor token (Manage → API → Tokens):

```bash
SANITY_API_WRITE_TOKEN=sk... npm run import:schools
```

### Schema

The `school` document is defined in `sanity/schemaTypes/school.ts`. The Studio
config lives in `sanity.config.ts` (CLI / standalone) and is mirrored by the
embedded Studio in `components/StudioEmbed.client.vue`.

### Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Map app + embedded Studio at `/studio` |
| `npm run import:schools` | Migrate the four bundled schools into Sanity |
| `npm run studio:deploy` | Deploy a standalone Studio to `*.sanity.studio` (optional) |
