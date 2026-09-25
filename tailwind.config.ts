import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        gold: { DEFAULT: "#E3D062", dark: "#CDB84A", deep: "#735406" },
        mist: "#F4F4F4",
        line: "#E2E2E2",
        slate2: "#555555",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,10,10,.06), 0 8px 24px rgba(10,10,10,.08)",
      },
    },
  },
  plugins: [],
};

export default config;
