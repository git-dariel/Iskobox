/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },

      backfaceVisibility: {
        hidden: "hidden",
      },
      width: {
        "my-width": "550px",
      },
      margin: {
        "my-margin": "950px",
      },
      keyframes: {
        moveStars: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-100%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "stars-move": "moveStars 50s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
