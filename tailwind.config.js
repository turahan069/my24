/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
    },
  },
  plugins: [],
}
