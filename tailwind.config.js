module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#27B8F9',
        'secondary': '#5F5F5F',
        'picton-blue': {
          '50': '#f4fbff',
          '100': '#e9f8fe',
          '200': '#c9edfe',
          '300': '#a9e3fd',
          '400': '#68cdfb',
          '500': '#27b8f9',
          '600': '#23a6e0',
          '700': '#1d8abb',
          '800': '#176e95',
          '900': '#135a7a'
        }
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
