/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#008170',
        'primary-darkest': '#005B41',
        'background': '#232D3F',
        'background-darkest': '#0F0F0F'
      }
    },
  },
  plugins: [],
}

