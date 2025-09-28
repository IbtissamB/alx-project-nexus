/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
          "bluegrey": "#2b3149",
          "accent": "#eb4e62",
          "lighttext": "#e9e9e9",
          "darktext": "#333333",
          "faint": "#f5f5f5",
      },
    },
  },
  plugins: [],
};

