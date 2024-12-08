/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Add this line to scan all JS/JSX/TS/TSX files in the src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
