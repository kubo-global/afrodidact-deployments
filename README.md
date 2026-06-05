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
managed in [Sanity](https://www.sanity.io). Until a project is connected the app
falls back to a bundled list in `stores/schools.ts`, so it always renders.

The editing **Studio is embedded at `/studio`** (e.g. http://localhost:3000/studio).

### One-time setup

1. **Create the project** (needs a Sanity account — `npx sanity login` first):

   ```bash
   npx sanity@latest init --bare      # creates the project + dataset, prints a projectId
   ```

   Or create it in the UI at https://www.sanity.io/manage and copy the project ID.

2. **Configure env** — copy `.env.example` to `.env` and fill in:

   ```bash
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   ```

   These are shared by both the Nuxt app and the Sanity CLI.

3. **Allow the Studio origin** in https://www.sanity.io/manage → API → CORS origins:
   add `http://localhost:3000` and your production URL (credentials allowed).

4. **Import the existing schools** (uploads the four photos + creates the docs).
   Create an Editor token at Manage → API → Tokens, then:

   ```bash
   SANITY_API_WRITE_TOKEN=sk... npm run import:schools
   ```

5. **Restart** `npm run dev`. The map now reads from Sanity; edit content at `/studio`.

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
