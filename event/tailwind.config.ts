import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6ECFC",
          100: "#CCD9FA",
          200: "#99B3F5",
          300: "#668EF0",
          400: "#3369EB",
          500: "#0044E6", // Main brand color (Cobalt Blue)
          600: "#0037B8",
          700: "#002A8A",
          800: "#001D5C",
          900: "#000F2E",
        },
        accent: {
          50: "#F7EDE1",
          100: "#EFD9BF",
          200: "#DFB383",
          300: "#CF8E47",
          400: "#BF690A",
          500: "#9D5508", // Main accent color (Brown)
          600: "#7A4106",
          700: "#572D04",
          800: "#341902",
          900: "#110601",
        },
        background: "#f7f7f7", // Light Gray
        border: "#efeded", // Light Gray Border
        text: "#43281C", // Dark Brown for text
        hover: "#245836", // Dark Green for hover
        error: "#D94A4A", // Red for error messages
        success: "#28a745", // Green for success messages
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
      width: {
        s: "20rem",
        m: "28rem",
        l: "36rem",
        xl: "48rem",
        "2xl": "60rem",
        "3xl": "72rem",
        "4xl": "90rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
