/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}',  // Scan all JavaScript, JSX, TypeScript, and TSX files in the `src` directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
