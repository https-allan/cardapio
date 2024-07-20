/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{handlebars,js}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        darkBrown: "#2b1c0a",
      },
      backgroundImage: {
        home: "url('/assets/img/bg.png')",
      },
    },
  },
  plugins: [],
};
