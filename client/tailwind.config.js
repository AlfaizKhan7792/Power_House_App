/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-fast': 'spin 2s linear infinite',
        'spin-reverse': 'spin-reverse 5s linear infinite',
    },
    keyframes: {
        'spin-reverse': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(-360deg)' },
        },
    },
    },
  },
  plugins: [],
}