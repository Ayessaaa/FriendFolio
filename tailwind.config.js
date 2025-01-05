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
  safelist: [
    { pattern: /^bg-(red|green|yellow|indigo|orange|amber|pink|purple|violet|blue|sky|teal)-(100|200)$/ },
    { pattern: /^text-(red|green|yellow|indigo|orange|amber|pink|purple|violet|blue|sky|teal)-(400)$/ },
    { pattern: /^border-(red|green|yellow|indigo|orange|amber|pink|purple|violet|blue|sky|teal)-(200)$/ },
  ],
  plugins: [],
};
