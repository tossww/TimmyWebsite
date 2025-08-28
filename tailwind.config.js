/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'turtle-green': '#4ade80',
        'turtle-dark': '#166534',
        'ocean-blue': '#0ea5e9',
        'sand-beige': '#fef3c7',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'swim': 'swim 3s ease-in-out infinite',
      },
      keyframes: {
        swim: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
