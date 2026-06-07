<template>
  <div class="flex h-screen flex-col">
    <header
      class="z-20 flex items-center justify-between gap-4 border-b border-afrodidactDark/10 bg-white px-4 py-3 shadow-sm md:px-6"
    >
      <div
        class="flex flex-none cursor-pointer items-center gap-3"
        @click="handleOverviewClick()"
      >
        <img id="logo" src="/img/logo.png" alt="Afrodidact logo" class="h-10 md:h-12" />
        <div class="leading-tight">
          <h1 class="text-base font-semibold text-afrodidactDark md:text-xl">
            Deployments Map
          </h1>
          <p class="hidden text-xs text-afrodidactDark/60 md:block">
            Follow the evolution of our deployments
          </p>
        </div>
      </div>
      <Menu
        class="min-w-0"
        @overview-click="handleOverviewClick"
        @country-click="handleCountryClick"
        @school-click="handleSchoolClick"
      />
    </header>

    <div class="flex min-h-0 flex-1 flex-col md:flex-row">
      <Map
        ref="mapComponent"
        class="h-full w-full"
        :schools="schools"
        @school-click="handleSchoolClick"
      />
      <Sidebar
        @close-sidebar="handleCloseSidebar"
        ref="sidebarComponent"
        class="z-10 hidden h-2/3 w-full resize-y md:h-full md:w-1/3 md:max-w-md"
      />
    </div>
  </div>
</template>
  
<script setup>
import { useSchoolsStore } from "~/stores/schools";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const schoolsStore = useSchoolsStore();
await schoolsStore.fetchSchools();
const { schools } = storeToRefs(schoolsStore);
const mapComponent = ref(null);
const sidebarComponent = ref(null);

const handleOverviewClick = () =>  {
  mapComponent.value.showOverview();
  const sidebar = sidebarComponent.value.$el;
  sidebar.style.display = "none";
  mapComponent.value.resize();
};

const handleCountryClick = (country) =>  {
  mapComponent.value.fitCountry(country);
  const sidebar = sidebarComponent.value.$el;
  sidebar.style.display = "none";
  mapComponent.value.resize();
};

const handleSchoolClick = (school) =>  {
  mapComponent.value.flyTo(school);
  const sidebar = sidebarComponent.value.$el;
  sidebar.style.display = "flex";
  sidebarComponent.value.updateSidebar(school);
  mapComponent.value.resize();
};

const handleCloseSidebar = () => {
  const sidebar = sidebarComponent.value.$el;
  sidebar.style.display = "none";
  mapComponent.value.resize();
};
</script>
