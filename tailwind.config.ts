import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10222B",
        pine: { DEFAULT: "#1D5C4E", dark: "#144136", soft: "#E3EEEA" },
        mist: "#F3F6F8",
        line: "#D5DDE2",
        slate2: "#4B5F6B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,34,43,.06), 0 8px 24px rgba(16,34,43,.06)",
      },
    },
  },
  plugins: [],
};

export default config;
