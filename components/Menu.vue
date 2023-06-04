<template>
  <div class='flex flex-col'>
<div class="flex space-x-2">

    <button @click="toggleMenu" class="md:hidden text-xl font-semibold">
      <span class='text-3xl'>&#9776;</span>
    </button>
  </div>

    <ul
      v-if="isMenuOpen"
      class="flex flex-col items-start fixed top-0 left-0 bottom-0 right-0 bg-afrodidactYellow font-semibold text-center z-50 px-8" 
    >
      <li @click="toggleMenu" class=" py-4 cursor-pointer text-right w-full text-4xl ">
        &times;
      </li>
      <li
        key="overview"
        @click="handleOverviewClick()"
        class="cursor-pointer py-4 px-4 hover:bg-gray-100 border-b-4 border-afrodidactDark border-opacity-30 border-dotted w-full"
      >
        Overview
      </li>

      <li
        v-for="school in schools"
        :key="school.name"
        @click="handleSchoolClick(school)"
        class="cursor-pointer py-4 px-4 hover:bg-gray-100 border-b-4 border-afrodidactDark border-opacity-30 border-dotted w-full"
      >
        {{ school.name }}
      </li>
    </ul>


    <ul
      class="hidden md:flex space-x-2"
    >
      <li
        key="overview"
        @click="handleOverviewClick()"
        class="cursor-pointer py-2 px-4 bg-afrodidactDark text-white rounded"
      >
        Overview
      </li>
      <li
        v-for="school in schools"
        :key="school.name"
        @click="handleSchoolClick(school)"
        class="cursor-pointer py-2 px-4 bg-afrodidactDark text-white rounded"
      >
        {{ school.name }}
      </li>
    </ul>
  </div>
</template>
  
  <script>
import { defineComponent, getCurrentInstance } from "vue";
import { useSchoolsStore } from "~/stores/schools";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const schoolsStore = useSchoolsStore();
    const { schools } = storeToRefs(schoolsStore);
    const isMenuOpen = ref(false);
    const instance = getCurrentInstance();

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const handleOverviewClick = () => {
      instance.emit("overviewClick");
      isMenuOpen.value = false;
    };

    const handleSchoolClick = (school) => {
      console.log(school);
      instance.emit("schoolClick", school);
      isMenuOpen.value = false;
    };

    return {
      handleOverviewClick,
      handleSchoolClick,
      isMenuOpen,
      schools,
      toggleMenu,
    };
  },
});
</script>
  