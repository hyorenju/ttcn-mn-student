/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "primary-font": "'Saira', sans-serif;",
      },
      colors: {
        "primary-color": "#005B30",
      },
      boxShadow: {
        "ct-shadow-3xl": "rgba(0, 91, 48, 0.35) 0px 25px 50px -12px;",
      },
    },
  },
  plugins: [],
};
