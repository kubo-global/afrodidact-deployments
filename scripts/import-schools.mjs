/**
 * One-off migration: upload the four bundled class photos and create the
 * matching `school` documents in Sanity.
 *
 * Usage:
 *   SANITY_STUDIO_PROJECT_ID=xxx \
 *   SANITY_STUDIO_DATASET=production \
 *   SANITY_API_WRITE_TOKEN=sk... \
 *   node scripts/import-schools.mjs
 *
 * Create the write token at https://sanity.io/manage → API → Tokens (Editor).
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error(
    'Missing env. Set SANITY_STUDIO_PROJECT_ID and SANITY_API_WRITE_TOKEN.',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const imgDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'img')

const schools = [
  {
    name: 'The Swallow',
    fullName: 'The Swallow Centre of Emancipating Education',
    lng: -16.7028,
    lat: 13.44719,
    zoom: 19,
    zoomMobile: 18,
    numberOfStudents: 225,
    numberOfClients: 25,
    description: 'Afrodidact Model School.',
    image: 'theswallow.jpg',
    order: 1,
  },
  {
    name: 'Bakoteh Proper LBS',
    fullName: 'Bakoteh Proper Lower Basic School',
    lng: -16.69577,
    lat: 13.43553,
    zoom: 18,
    zoomMobile: 17,
    numberOfStudents: 3000,
    numberOfClients: 51,
    description:
      'The biggest lower basic school in The Gambia with +/- 3000 pupils. 6 grades, up to 12 classes/grade - 115 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas, ...), Energy Assistance & Intix.',
    image: 'bakotehproper.jpg',
    order: 2,
  },
  {
    name: 'Albreda LBS',
    fullName: 'Albreda Lower Basic School',
    lng: -16.3857,
    lat: 13.3388,
    zoom: 18,
    zoomMobile: 17,
    numberOfStudents: 381,
    numberOfClients: 26,
    description:
      'The lower basic school of Albreda is located in the Northbank. It has 381 pupils + 91 toddlers (Early Childhood Development). There are 6 grades with 2 classes/grade, and 12 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas, ...), Energy Assistance & Intix.',
    image: 'albreda.jpg',
    order: 3,
  },
  {
    name: 'Njaba Kunda LBS',
    fullName: 'Njaba Kunda Lower Basic School',
    lng: -15.916,
    lat: 13.54918,
    zoom: 18,
    zoomMobile: 17,
    numberOfStudents: 406,
    numberOfClients: 26,
    description:
      '406 pupils + 36 toddlers ECD - 6 grades, 2 classes/grade (gr2:3) - 13 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas, ...), Energy Assistance & Intix.',
    image: 'njabakunda.jpg',
    order: 4,
  },
]

for (const s of schools) {
  console.log(`Uploading image for ${s.name}...`)
  const asset = await client.assets.upload('image', readFileSync(join(imgDir, s.image)), {
    filename: s.image,
  })

  console.log(`Creating document for ${s.name}...`)
  await client.create({
    _type: 'school',
    name: s.name,
    fullName: s.fullName,
    location: { _type: 'geopoint', lat: s.lat, lng: s.lng },
    zoom: s.zoom,
    zoomMobile: s.zoomMobile,
    numberOfStudents: s.numberOfStudents,
    numberOfClients: s.numberOfClients,
    description: s.description,
    image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    order: s.order,
  })
}

console.log(`\nDone — imported ${schools.length} schools.`)
