/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'old-money': {
          50: '#f8f7f4',
          100: '#e8e6e0',
          200: '#d5d1c7',
          300: '#b3ada0',
          400: '#8c8576',
          500: '#736c5f',
          600: '#5d574c',
          700: '#4a4640',
          800: '#3d3936',
          900: '#333230',
        },
        'cream': '#f5f3ef',
        'sand': '#e6e1d7',
      },
      fontFamily: {
        'display': ['Cormorant Garamond', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};