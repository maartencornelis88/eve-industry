/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#190f0b',
        'eve-amber': '#d68529',
        'eve-teal': '#18b5dc',
        surface: 'rgba(255,255,255,0.04)',
        border: 'rgba(255,255,255,0.10)',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
