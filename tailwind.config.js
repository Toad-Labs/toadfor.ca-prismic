const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        'brand-green': {
          50: '#F8FBFA',
          100: '#EBF2F0',
          200: '#DDEAE7',
          300: '#E4EEEB',
          400: '#D6E5E2',
          500: '#C9DDD8',
          600: '#BBD4CE',
          700: '#A8BFB9',
          800: '#96AAA5',
          900: '#5E6A67',
        },
        // The following colours deviate from the tailwind default
        gray: colors.warmGray,
        green: colors.emerald,
        blue: colors.lightBlue,
        purple: colors.fuchsia,
      },
    },
  },
  variants: {},
  plugins: [],
}
