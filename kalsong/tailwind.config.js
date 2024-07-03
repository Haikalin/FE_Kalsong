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
      },
      width: {
        '22': '5.5rem',
        '18': '4.5rem'
      }
    },
  },
  plugins: [],
}
