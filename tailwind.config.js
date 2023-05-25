/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      landingb: '#cce3f5',
      bluetext: '#3598dc',
    },
    extend: {
      fontFamily: {
        lilita: ['Lilita One', cursive],
      },
    },
  },
  plugins: [],
};
