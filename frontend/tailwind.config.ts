import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#D8F3DC",
          100: "#B7E4C7",
          200: "#74C69D",
          300: "#52B788",
          400: "#40916C",
          500: "#2D6A4F",
          600: "#1A3C2E",
          700: "#163326",
          800: "#11271D",
          900: "#0B1A13"
        },
        text: {
          primary: "#0D0D0D",
          body: "#2C2C2C",
          muted: "#555555"
        },
        borderSoft: "#EEEEEE",
        gold: "#C9A84C"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Montserrat", "Inter", "sans-serif"]
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)"
      },
      backgroundSize: {
        grid: "32px 32px"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(26,60,46,0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;

