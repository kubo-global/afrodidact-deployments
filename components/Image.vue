<template>
    <div>
      <!-- Display image thumbnail -->
      <img
        :src="src"
        @click="openFullscreen"
        class="w-full cursor-zoom-in rounded-xl object-cover shadow-sm transition-transform duration-200 hover:scale-[1.02]"
      >

      <!-- Fullscreen image viewer — teleported to <body> so it escapes the
           sidebar's stacking context and covers the header. -->
      <Teleport to="body">
        <div v-show="fullscreenVisible" class="fullscreen" @click="closeFullscreen">
            <img :src="src" class="fullscreen-img">
        </div>
      </Teleport>
    </div>
  </template>
  
  <script>

  export default {
    props: {
      src: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        fullscreenVisible: false, // To toggle fullscreen view
      };
    },
    methods: {
      openFullscreen() {
        this.fullscreenVisible = true;
      },
      closeFullscreen() {
        this.fullscreenVisible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: rgba(12, 8, 34, 0.92); /* afrodidactDark, near-opaque */
    z-index: 9999;
    cursor: zoom-out;
  }

  .fullscreen-img {
    max-width: 95%;
    max-height: 95%;
    border-radius: 0.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }
  </style>
  