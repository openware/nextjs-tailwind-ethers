
module.exports = {
  // FIXME: merge from react-opendax
  mode: 'classic',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-cta-color-main': 'rgba(79,70,229,var(--tw-bg-opacity))',
        'primary-cta-color-hover': 'rgba(67,56,202,var(--tw-bg-opacity))',
        'dropdown-background-color': '#FFFFFF',
        'main-background-color': '#FFFFFF',
      },
      textColor: {
        'color-contrast': '#FFFFFF',
        'cta-contrast': '#090909',
        'secondary-color': '#737373',
      },
      boxShadow: {
        'lg-updated':
          ' 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 10px 15px -3px rgba(0, 0, 0, 0.12), 0px 4px 6px -2px rgba(0, 0, 0, 0.04);',
      },
      borderColor: {
        'divider-color-20': '1px solid #DCDCDC',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
