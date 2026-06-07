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

    <!-- Mobile: full-screen overlay (drill-down: countries → schools) -->
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

      <template v-if="!activeCountry">
        <li
          @click="handleOverviewClick()"
          class="w-full cursor-pointer border-b border-afrodidactDark/15 py-4 text-lg font-semibold transition-colors hover:text-afrodidactRed"
        >
          Overview
        </li>
        <li
          v-for="c in countries"
          :key="c"
          @click="handleCountryClick(c)"
          class="flex w-full cursor-pointer items-center justify-between border-b border-afrodidactDark/15 py-4 text-lg font-medium transition-colors hover:text-afrodidactRed"
        >
          {{ c }} <span class="text-afrodidactDark/40">&rsaquo;</span>
        </li>
      </template>

      <template v-else>
        <li
          @click="handleBack()"
          class="w-full cursor-pointer border-b border-afrodidactDark/15 py-4 text-lg font-semibold transition-colors hover:text-afrodidactRed"
        >
          &lsaquo; {{ activeCountry }}
        </li>
        <li
          v-for="school in schoolsInCountry(activeCountry)"
          :key="school.name"
          @click="handleSchoolClick(school)"
          class="w-full cursor-pointer border-b border-afrodidactDark/15 py-4 text-lg font-medium transition-colors hover:text-afrodidactRed"
          :class="{ 'text-afrodidactRed': active === school.name }"
        >
          {{ school.name }}
        </li>
      </template>
    </ul>

    <!-- Desktop: inline pills (drill-down) -->
    <ul class="no-scrollbar hidden max-w-full items-center gap-2 overflow-x-auto md:flex">
      <template v-if="!activeCountry">
        <li
          @click="handleOverviewClick()"
          class="flex-none cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
          :class="active === null
            ? 'bg-afrodidactDark text-white'
            : 'bg-afrodidactDark/5 text-afrodidactDark hover:bg-afrodidactDark/10'"
        >
          Overview
        </li>
        <li
          v-for="c in countries"
          :key="c"
          @click="handleCountryClick(c)"
          class="flex-none cursor-pointer whitespace-nowrap rounded-full bg-afrodidactDark/5 px-4 py-2 text-sm font-medium text-afrodidactDark transition-colors hover:bg-afrodidactDark/10"
        >
          {{ c }} <span class="text-afrodidactDark/40">&rsaquo;</span>
        </li>
      </template>

      <template v-else>
        <li
          @click="handleBack()"
          class="flex-none cursor-pointer whitespace-nowrap rounded-full bg-afrodidactDark/5 px-4 py-2 text-sm font-medium text-afrodidactDark transition-colors hover:bg-afrodidactDark/10"
        >
          &lsaquo; {{ activeCountry }}
        </li>
        <li
          v-for="school in schoolsInCountry(activeCountry)"
          :key="school.name"
          @click="handleSchoolClick(school)"
          class="flex-none cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
          :class="active === school.name
            ? 'bg-afrodidactDark text-white'
            : 'bg-afrodidactDark/5 text-afrodidactDark hover:bg-afrodidactDark/10'"
        >
          {{ school.name }}
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { computed, defineComponent, getCurrentInstance } from "vue";
import { useSchoolsStore } from "~/stores/schools";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const schoolsStore = useSchoolsStore();
    const { schools } = storeToRefs(schoolsStore);
    const isMenuOpen = ref(false);
    const active = ref(null);
    const activeCountry = ref(null);
    const instance = getCurrentInstance();

    // Unique countries, in the order schools first appear (already order-sorted).
    const countries = computed(() => {
      const seen = [];
      schools.value.forEach((s) => {
        const c = s.country || "Other";
        if (!seen.includes(c)) seen.push(c);
      });
      return seen;
    });

    const schoolsInCountry = (country) =>
      schools.value.filter((s) => (s.country || "Other") === country);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const handleOverviewClick = () => {
      active.value = null;
      activeCountry.value = null;
      instance.emit("overviewClick");
      isMenuOpen.value = false;
    };

    const handleCountryClick = (country) => {
      activeCountry.value = country;
      active.value = null;
      instance.emit("countryClick", country);
    };

    const handleBack = () => {
      activeCountry.value = null;
      active.value = null;
      instance.emit("overviewClick");
    };

    const handleSchoolClick = (school) => {
      active.value = school.name;
      instance.emit("schoolClick", school);
      isMenuOpen.value = false;
    };

    return {
      active,
      activeCountry,
      countries,
      schoolsInCountry,
      handleOverviewClick,
      handleCountryClick,
      handleBack,
      handleSchoolClick,
      isMenuOpen,
      schools,
      toggleMenu,
    };
  },
});
</script>
