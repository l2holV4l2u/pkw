import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6EFF8",
          100: "#CCE0F1",
          200: "#99C2E3",
          300: "#66A3D4",
          400: "#3385C6",
          500: "#3674B5", // Main brand color
          600: "#2B5D91",
          700: "#20466D",
          800: "#152E49",
          900: "#0A1724",
        },
        secondary: {
          50: "#FBEAE6",
          100: "#F7D4CF",
          200: "#EFB0A8",
          300: "#E68D80",
          400: "#DE6A59",
          500: "#C06E52", // Main secondary color
          600: "#A35846",
          700: "#854439",
          800: "#662F2B",
          900: "#471B1C",
        },
        background: "#f7f7f7", // Gray
        border: "#efeded", // Some shade of gray idk
        text: {
          50: "#F9F4F2",
          100: "#F2E6E0",
          200: "#E5CDC1",
          300: "#D8B4A3",
          400: "#CB9B84",
          500: "#43281C", // Main text color
          600: "#351F16",
          700: "#271710",
          800: "#190E0A",
          900: "#0C0705",
        },
        accent: {
          DEFAULT: "#C06E52",
          100: "#FBEAE6",
          200: "#F7D4CF",
          300: "#E68D80",
          400: "#DE6A59",
          500: "#C06E52",
        },
        hover: "#245836", // Darker Green for hover
        error: "#D94A4A", // Red for error
        success: "#28a745", // Green for success
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
