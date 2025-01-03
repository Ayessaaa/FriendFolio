/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        "2lg": "1100px",
      },
    },
  },
  plugins: [],
};
