/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables class-based dark mode

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      colors: {
        primary: "#1e293b",
        accent: "#3b82f6",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
      },

      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideDown: "slideDown 0.3s ease-out",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideDown: {
          from: { opacity: 0, transform: "translateY(-10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },

  plugins: [],
};
