<template>
  <div
    class="flex flex-col gap-5 overflow-y-auto rounded-t-2xl bg-afrodidactYellow p-6 text-afrodidactDark shadow-[0_-8px_24px_rgba(12,8,34,0.12)] duration-300 md:rounded-none md:shadow-none"
    style="order: 9999"
  >
    <!-- Mobile drag-handle affordance -->
    <div class="mx-auto -mt-2 h-1.5 w-12 flex-none rounded-full bg-afrodidactDark/20 md:hidden"></div>

    <div class="flex items-start justify-between gap-3">
      <h2 id="school-name" class="text-2xl font-bold leading-tight">
        {{ schoolName }}
      </h2>
      <button
        aria-label="Close"
        class="-mr-1 -mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full text-2xl leading-none text-afrodidactDark/70 transition-colors hover:bg-afrodidactDark/10 hover:text-afrodidactDark"
        @click="handleCloseClick()"
      >
        &times;
      </button>
    </div>

    <div class="flex flex-wrap gap-3">
      <div class="min-w-[7rem] flex-1 rounded-xl bg-afrodidactDark/5 p-3">
        <div id="school-number-of-students" class="text-2xl font-bold">
          {{ numberOfStudents }}
        </div>
        <div class="text-xs font-medium uppercase tracking-wide text-afrodidactDark/60">
          Pupils
        </div>
      </div>
      <div v-if="numberOfStaff" class="min-w-[7rem] flex-1 rounded-xl bg-afrodidactDark/5 p-3">
        <div id="school-number-of-staff" class="text-2xl font-bold">
          {{ numberOfStaff }}
        </div>
        <div class="text-xs font-medium uppercase tracking-wide text-afrodidactDark/60">
          Staff
        </div>
      </div>
      <div class="min-w-[7rem] flex-1 rounded-xl bg-afrodidactDark/5 p-3">
        <div id="school-number-of-clients" class="text-2xl font-bold">
          {{ numberOfClients }}
        </div>
        <div class="text-xs font-medium uppercase tracking-wide text-afrodidactDark/60">
          KUBO X installed
        </div>
      </div>
    </div>

    <div>
      <h3 class="mb-1 text-xs font-semibold uppercase tracking-wide text-afrodidactDark/60">
        Description
      </h3>
      <p id="school-description" class="text-sm leading-relaxed">
        {{ schoolDescription }}
      </p>
    </div>

    <div v-if="images && images.length" class="mt-auto flex flex-col gap-2">
      <Image v-for="(img, i) in images" :key="i" :src="img" />
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import Image from "./Image.vue";

export default defineComponent({
  setup() {
    const instance = getCurrentInstance();
    const images = ref([]);
    const numberOfStudents = ref(null);
    const numberOfClients = ref(null);
    const numberOfStaff = ref(null);
    const schoolDescription = ref(null);
    const schoolName = ref(null);

    const handleCloseClick = () => {
      instance.emit("close-sidebar");
    };

    const updateSidebar = (school) => {
        images.value = school.images || [];
        numberOfStudents.value = school.numberOfStudents;
        numberOfClients.value = school.numberOfClients;
        numberOfStaff.value = school.numberOfStaff;
        schoolDescription.value = school.schoolDescription;
        schoolName.value = school.name;
    }

    return {
      images,
      handleCloseClick,
      numberOfClients,
      numberOfStudents,
      numberOfStaff,
      Image,
      schoolDescription,
      schoolName,
      updateSidebar
    };
  },
});
</script>