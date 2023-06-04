<template>
  <div class="w-full">
    <div class="py-2 px-4 md:py-4 md:px-6 flex-1 fixed z-10 bg-white rounded-r-xl rounded-l-none">
      <img id="logo" src="/img/logo.png" alt="Logo" class="h-12 md:h-16" 
        @click="handleOverviewClick()" />
      <h1 class="text-lg md:text-2xl text-afrodidactDark font-semibold">
        Deployments Map
      </h1>
    </div>
    <div class=' h-screen flex flex-col'>
    <Menu
      class="text-afrodidactDark w-full flex items-end bg-white p-4 h-30"
      @overview-click="handleOverviewClick"
      @school-click="handleSchoolClick"
    />
    <div class="flex flex-col md:flex-row h-screen flex-1">
      <Map ref="mapComponent" class='w-full h-full' 
      :schools="schools"
      @school-click="handleSchoolClick"
      />
      <Sidebar
        @close-sidebar="handleCloseSidebar"
        ref="sidebarComponent"
        class="hidden h-2/3 resize-y w-full md:h-full md:w-1/3 z-10"
      />
    </div>
    </div>
  </div>
</template>

<style scoped>
body {
  height: 100vh;
  width: 100%;
}
</style>
  
<script setup>
import { useSchoolsStore } from "~/stores/schools";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const schoolsStore = useSchoolsStore();
const { schools } = storeToRefs(schoolsStore);
const mapComponent = ref(null);
const sidebarComponent = ref(null);

const handleOverviewClick = () =>  {
  mapComponent.value.zoomToCountry();
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
