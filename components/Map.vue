<template>
  <div ref="mapContainer" class="map-container"></div>
</template>
  
  <script setup lang="ts">
import { onMounted, onUnmounted, ref, getCurrentInstance } from "vue";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { School } from "@/types/school";

const mapContainer = ref<HTMLDivElement | null>(null);
let map!: mapboxgl.Map;
const instance = getCurrentInstance();

const props = defineProps<{ schools: any }>();

onMounted(() => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2hhbmUtYWZyb2RpZGFjdCIsImEiOiJjbGllYnlqNmowcTNhM3FvYjdzNWY3djRjIn0.gzBrP3TNMbIfqzRez04NdA";

  map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: "mapbox://styles/shane-afrodidact/cliec7pkb004b01pg9y096n6b",
    center: [-15.433, 13.2774],
    zoom: 1,
  });

  map.on("load", setupMap);
});

onUnmounted(() => {
  map?.remove();
});

const setupMap = () => {
  zoomToCountry();
  map.addControl(new mapboxgl.NavigationControl());
  props.schools.forEach(addMarkerToMap);
};


const flyTo = (school: School) => {

  const isMobile = window.innerWidth <= 768; 
  const zoomLevel = isMobile ? school.zoomMobile : school.zoom;

  map.flyTo({
    center: [school.longitude, school.latitude],
    zoom: zoomLevel,
    speed: 1.5,
    curve: 1.42,
    easing(t: number) {
      return t;
    },
  });
  // updateSchoolInfo(school);
};

const resize = () => {
  if (map) {
    map.resize(); // Trigger map resize event
  }
};

const addMarkerToMap = (school: School) => {
  const markerColor = "#f14346";

  const marker = new mapboxgl.Marker({ color: markerColor })
    .setLngLat([school.longitude, school.latitude])
    .addTo(map);

  marker.getElement().addEventListener("click", () => {
    console.log(school);
    handleLocationButtonClick(school);
  });
};

const handleLocationButtonClick = (school: School) => {
  flyTo(school);
  instance?.emit("schoolClick", school);
};

const zoomToCountry = () => {
  const isMobile = window.innerWidth <= 768; 
  const zoomLevel = isMobile ? 5 : 7.5;
  map.flyTo({ center: [-15.3973, 13.4591], zoom: zoomLevel });
};

defineExpose({ flyTo, resize, zoomToCountry });

</script>