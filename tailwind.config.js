/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{handlebars,js}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        home: "url('/assets/img/bg.png')",
      },
    },
  },
  plugins: [],
};
