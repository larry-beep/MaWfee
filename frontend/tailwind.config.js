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
        primary: '#0b1020',
        secondary: '#1a1f3a',
        accent: {
          primary: '#9b6cff',
          secondary: '#ff6b8a',
          star: '#f6f7ff',
        },
        glass: 'rgba(255, 255, 255, 0.06)',
        text: {
          primary: '#ffffff',
          secondary: '#b8b8d1',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}