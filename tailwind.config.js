/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
        colors: {
          primary: {
            DEFAULT: '#0172A6',// your main primary color
          },
        },
      },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-primary': theme('colors.primary'),
        },
      });
    },
  ],
}
