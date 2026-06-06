import { defineStore } from 'pinia'
import { createClient } from '@sanity/client'

// GROQ query — maps Sanity `school` documents onto the shape the UI expects.
// `images` resolves to full asset URLs (the bundled fallback uses local /img
// paths), so the Sidebar can use them directly as <img src>.
const SCHOOLS_QUERY = `*[_type == "school"] | order(order asc, name asc){
  "name": name,
  "schoolName": fullName,
  country,
  "longitude": location.lng,
  "latitude": location.lat,
  zoom,
  zoomMobile,
  numberOfStudents,
  numberOfClients,
  numberOfStaff,
  "schoolDescription": description,
  "images": images[].asset->url
}`

// Bundled fallback so the map keeps working before Sanity is connected.
const fallbackSchools = [
  {
    name: "The Swallow",
    longitude: -16.7028,
    latitude: 13.44719,
    zoom: 19,
    zoomMobile: 18,
    schoolName: "The Swallow Centre of Emancipating Education",
    numberOfStudents: 225,
    numberOfClients: 25,
    schoolDescription: "Afrodidact Model School.",
    country: "The Gambia",
    images: ["/img/theswallow.jpg"],
  },
  {
    name: "Bakoteh Proper LBS",
    longitude: -16.69577,
    latitude: 13.43553,
    zoom: 18,
    zoomMobile: 17,
    schoolName: "Bakoteh Proper Lower Basic School",
    numberOfStudents: 3000,
    numberOfClients: 51,
    schoolDescription:
      "The biggest lower basic school in The Gambia with +/- 3000 pupils. 6 grades, up to 12 classes/grade - 115 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas, ...), Energy Assistance & Intix. ",
    country: "The Gambia",
    images: ["/img/bakotehproper.jpg"],
  },
  {
    name: "Albreda LBS",
    longitude: -16.3857,
    latitude: 13.3388,
    zoom: 18,
    zoomMobile: 17,
    schoolName: "Albreda Lower Basic School",
    numberOfStudents: 381,
    numberOfClients: 26,
    schoolDescription:
      "The lower basic school of Albreda is located in the Northbank. It has 381 pupils + 91 toddlers (Early Childhood Development). There are 6 grades with 2 classes/grade, and 12 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas, ...), Energy Assistance & Intix.",
    country: "The Gambia",
    images: ["/img/albreda.jpg"],
  },
  {
    name: "Njaba Kunda LBS",
    longitude: -15.916,
    latitude: 13.54918,
    zoom: 18,
    zoomMobile: 17,
    schoolName: "Njaba Kunda Lower Basic School",
    numberOfStudents: 406,
    numberOfClients: 26,
    schoolDescription:
      "406 pupils + 36 toddlers ECD - 6 grades, 2 classes/grade (gr2:3) - 13 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas, ...), Energy Assistance & Intix..",
    country: "The Gambia",
    images: ["/img/njabakunda.jpg"],
  },
]

export const useSchoolsStore = defineStore('schools-store', {
  state: () => ({
    schoolsList: fallbackSchools,
    source: 'fallback' as 'fallback' | 'sanity',
  }),
  getters: {
    schools: (state) => state.schoolsList,
  },
  actions: {
    async fetchSchools() {
      const { projectId, dataset } = useRuntimeConfig().public.sanity
      // No project configured yet → keep the bundled list.
      if (!projectId) return
      try {
        const client = createClient({
          projectId,
          dataset,
          apiVersion: '2024-01-01',
          useCdn: true,
        })
        const data = await client.fetch(SCHOOLS_QUERY)
        if (Array.isArray(data) && data.length) {
          this.schoolsList = data
          this.source = 'sanity'
        }
      } catch (err) {
        console.warn('[schools] Sanity fetch failed, using bundled data', err)
      }
    },
  },
})
