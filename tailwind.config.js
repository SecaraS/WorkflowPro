/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter", "Segoe UI", Roboto, sans-serif'],
        display: ['"Poppins", sans-serif'],
      },
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        dark: "#1f2937",
        light: "#f3f4f6",
      },
      spacing: {
        safe: "1rem",
        section: "2rem",
      },
    },
  },
  plugins: [],
};
