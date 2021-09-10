const { merge } = require('lodash')
const defaultTailwindConfig = require('@openware/react-opendax/tailwind.config')

module.exports = merge(
  defaultTailwindConfig,
  {
    mode: 'classic',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
  },
)
