/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './public/**/*.{html,js}'
  ],
  darkMode: 'media',
  theme: {
    colors: {
      'background': '#202124',
      'foreground': '#bdc1c6'
    },
    fontFamily: {
      sans: ['Roboto', 'arial'],
      serif: ['sans-serif']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ]
}

