// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Menlo', 'monospace'],
      },
      colors: {
        'base': {
          black: '#0A0A0B',
          900: '#121214',
          800: '#18181B',
          700: '#1F1F23',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
