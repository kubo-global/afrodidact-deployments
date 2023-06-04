<template>
  <div
    class="overflow-y-auto bg-afrodidactYellow text-afrodidactDark p-4 duration-300 flex-col"
    style="order: 9999"
  >
    <div class="flex-1">
      <h2 id="school-name" class="text-2xl font-bold mb-4">{{ schoolName }}</h2>
      <p class="text-base mb-2">
        <span id="school-number-of-students">{{ numberOfStudents }}</span> pupils
      </p>
      <p class="text-base mb-2">
        <span id="school-number-of-clients">{{ numberOfClients }}</span> KUBO X installed
      </p>
      <p class="text-base">
        General description:<br /><span id="school-description">{{ schoolDescription }}</span>
      </p>
    </div>
    <Image v-if="classImage" :src="`/img/${ classImage }`" />
    <button
      class="px-2 py-1 underline"
      @click="handleCloseClick()"
    >
      Close
    </button>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import Image from "./Image.vue";

export default defineComponent({
  setup() {
    const instance = getCurrentInstance();
    const classImage = ref(null);
    const numberOfStudents = ref(null);
    const numberOfClients = ref(null);
    const schoolDescription = ref(null);
    const schoolName = ref(null);

    const handleCloseClick = () => {
      instance.emit("close-sidebar");
    };

    const updateSidebar = (school) => {
        classImage.value = school.classImage;
        numberOfStudents.value = school.numberOfStudents;
        numberOfClients.value = school.numberOfClients;
        schoolDescription.value = school.schoolDescription;
        schoolName.value = school.name;
    }

    return {
    classImage,
      handleCloseClick,
      numberOfClients,
      numberOfStudents,
      Image,
      schoolDescription,
      schoolName,
      updateSidebar
    };
  },
});
</script>