<template>
  <ClientOnly>
    <StudioEmbed />
  </ClientOnly>
</template>

<script setup lang="ts">
// Full-screen Sanity Studio mounted at /studio (and all sub-routes).
definePageMeta({ layout: false })
useHead({ title: 'Afrodidact Deployments — Studio' })
</script>
