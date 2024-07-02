/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-black': '#121212',
        'spotify-green': '#1DB954',
        'spotify-gray': '#b3b3b3',
        'spotify-dark-green': '#0F7A37'
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
        '22': '5.5rem'
      }
    },
  },
  plugins: [],
}
