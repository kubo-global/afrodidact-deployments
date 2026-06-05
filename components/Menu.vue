<template>
  <nav>
    <!-- Mobile: hamburger trigger -->
    <button
      @click="toggleMenu"
      aria-label="Open menu"
      class="rounded-lg p-2 text-afrodidactDark transition-colors hover:bg-afrodidactDark/5 md:hidden"
    >
      <span class="text-2xl leading-none">&#9776;</span>
    </button>

    <!-- Mobile: full-screen overlay -->
    <ul
      v-if="isMenuOpen"
      class="fixed inset-0 z-50 flex flex-col bg-afrodidactYellow px-6 pb-8 pt-4 text-afrodidactDark"
    >
      <li
        @click="toggleMenu"
        aria-label="Close menu"
        class="w-full cursor-pointer self-end py-2 text-right text-4xl leading-none"
      >
        &times;
      </li>
      <li
        key="overview"
        @click="handleOverviewClick()"
        class="w-full cursor-pointer border-b border-afrodidactDark/15 py-4 text-lg font-semibold transition-colors hover:text-afrodidactRed"
        :class="{ 'text-afrodidactRed': active === null }"
      >
        Overview
      </li>
      <li
        v-for="school in schools"
        :key="school.name"
        @click="handleSchoolClick(school)"
        class="w-full cursor-pointer border-b border-afrodidactDark/15 py-4 text-lg font-medium transition-colors hover:text-afrodidactRed"
        :class="{ 'text-afrodidactRed': active === school.name }"
      >
        {{ school.name }}
      </li>
    </ul>

    <!-- Desktop: inline pills (scroll horizontally if they outgrow the bar) -->
    <ul class="no-scrollbar hidden max-w-full items-center gap-2 overflow-x-auto md:flex">
      <li
        key="overview"
        @click="handleOverviewClick()"
        class="flex-none cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
        :class="active === null
          ? 'bg-afrodidactDark text-white'
          : 'bg-afrodidactDark/5 text-afrodidactDark hover:bg-afrodidactDark/10'"
      >
        Overview
      </li>
      <li
        v-for="school in schools"
        :key="school.name"
        @click="handleSchoolClick(school)"
        class="flex-none cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
        :class="active === school.name
          ? 'bg-afrodidactDark text-white'
          : 'bg-afrodidactDark/5 text-afrodidactDark hover:bg-afrodidactDark/10'"
      >
        {{ school.name }}
      </li>
    </ul>
  </nav>
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
    const active = ref(null);
    const instance = getCurrentInstance();

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const handleOverviewClick = () => {
      active.value = null;
      instance.emit("overviewClick");
      isMenuOpen.value = false;
    };

    const handleSchoolClick = (school) => {
      active.value = school.name;
      instance.emit("schoolClick", school);
      isMenuOpen.value = false;
    };

    return {
      active,
      handleOverviewClick,
      handleSchoolClick,
      isMenuOpen,
      schools,
      toggleMenu,
    };
  },
});
</script>
  