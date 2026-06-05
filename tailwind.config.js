/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        afrodidactDark: '#0c0822', 
        afrodidactYellow: '#ffcd31', 
        afrodidactGreen: '#4bba7b', 
        afrodidactRed: '#f14346', 
        afrodidactBlue: '#4a76b9', 
      },
    },
  },
  plugins: [],
}

