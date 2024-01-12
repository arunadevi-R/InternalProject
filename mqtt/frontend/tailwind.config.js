/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {},
    screens: {
      'sm': {'min': '640px', 'max': '539px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '540px', 'max': '900px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '901px', 'max': '1025px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [ require('tailwind-scrollbar')],
    
  }
