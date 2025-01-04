/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      screens: {
        "2lg": "1100px",
      },
    },
  },
  plugins: [],
};
