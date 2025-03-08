/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C4703D',
        secondary: '#5D6D7E',
      },
      width: {
        'custom': '1024px'
      },
      maxWidth: {
        'custom': '1024px'
      }
    },
  },
  plugins: [],
} 