/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#191A19',
        'dark-one': "#2a3b2a",
        'second-one': '#1E5128',
        'second-two': '#4E9F3D',
        'light-one': '#D8E9A8',
        'light-second': '#F0F7E2'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s forwards',
      },
      fontFamily: {
        'Roboto': ['Roboto', 'sans-serif'],
        'Inter': ['Inter', 'sans-serif'],
        'Poppins': ['Poppins'],
        'Oswald': ['Oswald'],
      },
      width: {
        '22': '5.5rem',
        '18': '4.5rem',
        '100': '25rem',
      },
      height: {
        '100': '25rem',
      },
      boxShadow: {
        'custom' : '8px 8px 20px 1px #F0F7E2',
        'empty' : '0 0 0 0 #F0F7E2',
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))',
      },
      fontSize: {
        'xxs': '.5rem',
      },
      flexBasis: {
        '18/100': '18%',
      },
      screens: {
        'notphone': '500px',
      },
    },
  },
  plugins: [],
}
