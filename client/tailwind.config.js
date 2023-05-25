/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        landingb: '#cce3f5',
        bluetext: '#3598dc',
      },
      fontFamily: {
        lilita: ['Lilita One'],
      },
    },
  },
  plugins: [],
};
