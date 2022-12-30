/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#ee4d2d'
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, config }) {
      addUtilities({
        '.container': {
          width: '100%',
          maxWidth: '1230px',
          padding: '0 15px',
          margin: '0 auto'
        },
        '.container-fluid': {
          width: '100%',
          maxWidth: '1920px',
          padding: '0 15px',
          margin: '0 auto'
        }
      });
    }),
  ],
};
