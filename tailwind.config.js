/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,handlebars}"],
  theme: {
    extend: {
      color: {
        'italian-flag-green': '#008C45',
        'italian-flag-white': '#F4F9FF',
        'italian flag-red': '#CD212A'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
