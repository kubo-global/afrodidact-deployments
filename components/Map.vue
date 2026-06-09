<template>
  <div ref="mapContainer" class="map-container"></div>
</template>
  
  <script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, getCurrentInstance } from "vue";
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

let markers: mapboxgl.Marker[] = [];

const renderMarkers = () => {
  markers.forEach((m) => m.remove());
  markers = (props.schools ?? []).map(addMarkerToMap);
};

const setupMap = () => {
  map.addControl(new mapboxgl.NavigationControl());
  renderMarkers();
  // Animate the initial zoom-in from the far-out start to frame all markers.
  showOverview(true);
};

// Background data refresh (e.g. a school added in Sanity) updates markers in
// place without disturbing the current view.
watch(
  () => props.schools,
  () => {
    if (map) renderMarkers();
  },
);


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
    handleLocationButtonClick(school);
  });

  return marker;
};

const handleLocationButtonClick = (school: School) => {
  flyTo(school);
  instance?.emit("schoolClick", school);
};

// Frame all school markers (auto-adapts as deployments span more countries).
// Falls back to a continental Africa view when there are no schools yet.
const showOverview = (animate = true) => {
  const schools = props.schools ?? [];
  if (!schools.length) {
    map[animate ? "flyTo" : "jumpTo"]({ center: [20.63, 2.16], zoom: 2.4 });
    return;
  }
  const bounds = new mapboxgl.LngLatBounds();
  schools.forEach((s: School) => bounds.extend([s.longitude, s.latitude]));
  const isMobile = window.innerWidth <= 768;
  map.fitBounds(bounds, {
    padding: isMobile ? 90 : 180,
    maxZoom: 5,
    duration: animate ? 1200 : 0,
  });
};

// Frame the schools of a single country.
const fitCountry = (country: string) => {
  const schools = (props.schools ?? []).filter(
    (s: School) => (s.country || "Other") === country,
  );
  if (!schools.length) return;
  const bounds = new mapboxgl.LngLatBounds();
  schools.forEach((s: School) => bounds.extend([s.longitude, s.latitude]));
  const isMobile = window.innerWidth <= 768;
  map.fitBounds(bounds, {
    padding: isMobile ? 60 : 120,
    maxZoom: 7,
    duration: 1200,
  });
};

defineExpose({ flyTo, resize, showOverview, fitCountry });

</script>