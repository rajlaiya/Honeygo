const forms = require("@tailwindcss/forms");

/** @type {import('tailwindcss').Config} */
module.exports = {
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
        display: ["Poppins", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 0 3px rgba(255,200,52,0.3)",
      },
      backgroundImage: {
        "honeycomb-gradient":
          "radial-gradient(circle at 25% 25%, #FFC834 0, #E6AF1A 35%, #805C0D 100%)",
      },
      cursor: {
        aero: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="%23ffc834" d="M4 2l22 10-8 4 10 6-12-4-2 10-4-12-6 10 4-12-8-2z"/></svg>\') 4 4, pointer',
        goldring:
          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="10" stroke="%23ffc834" stroke-width="4" fill="rgba(255,200,52,0.15)"/></svg>\') 18 18, pointer',
      },
    },
  },
  plugins: [forms],
};
