/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        honey: {
          50: "#FFF8E5",
          100: "#FFEFC2",
          200: "#FFE59E",
          300: "#FFDC7A",
          400: "#FFD257",
          500: "#FFC834",
          600: "#E6AF1A",
          700: "#B48413",
          800: "#805C0D",
          900: "#4C3606",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 3px rgba(255,200,52,0.3)",
      },
      backgroundImage: {
        "honeycomb-gradient":
          "radial-gradient(circle at 25% 25%, #FFC834 0, #E6AF1A 35%, #805C0D 100%)",
      },
    },
  },
  plugins: [forms],
};
