<template>
    <div>
      <slot />
    </div>
  </template>
  <script setup lang="ts">
  useHead({
    title: 'Afrodidact Deployments Map',
    meta: [
      { name: 'description', content: 'Follow the evolution of our deployments.' }
    ]
  })
  </script>