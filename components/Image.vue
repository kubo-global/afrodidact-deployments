<template>
    <div>
      <!-- Display image thumbnail -->
      <img :src="src" @click="openFullscreen">
  
      <!-- Fullscreen image viewer -->
        <div v-show="fullscreenVisible" class="fullscreen fixed top-0 left-0 bottom-0 right-0 z-50" @click="closeFullscreen">
            <img :src="src" class="fullscreen-img">
        </div>
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
    background: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
    z-index: 9999;
  }
  
  .fullscreen-img {
    max-width: 90%;
    max-height: 90%;
  }
  </style>
  