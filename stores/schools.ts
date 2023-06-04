import { defineStore } from 'pinia'

export const useSchoolsStore = defineStore({
  id: 'schools-store',
  state: () => {
    return {
      schoolsList: [
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
          classImage: "theswallow.jpg",
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
            "The biggest lower basic school in The Gambia with +/- 3000 pupils. 6 grades, up to 12 classes/grade - 115 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas, ...), Energy Assistance &amp; Intix. ",
          classImage: "bakotehproper.jpg",
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
            "The lower basic school of Albreda is located in the Northbank. It has 381 pupils + 91 toddlers (Early Childhood Development). There are 6 grades with 2 classes/grade, and 12 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas, ...), Energy Assistance &amp; Intix.",
          classImage: "albreda.jpg",
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
            "406 pupils + 36 toddlers ECD - 6 grades, 2 classes/grade (gr2:3) - 13 teachers. Solar installation installed. Funded by Rotary Grant 2016052 (RC Banjul, RC Beveren-Waas, ...), Energy Assistance &amp; Intix..",
          classImage: "njabakunda.jpg",
        },
        // ... other schools
      ],
    }
  },
  getters: {
    schools: state => state.schoolsList,
    schoolsArray: state => Object.values(state.schoolsList)
  },
})