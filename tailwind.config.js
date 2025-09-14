/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5a4",   // teal
        danger: "#ef4444",    // red
        success: "#16a34a",   // green
      },
    },
  },
  plugins: [],
}
