import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-black": "var(--primary-black)",
        "primary-white": "var(--primary-white)",
        "primary-light-black": "var(--primary-light-black)",
        border: "var(--border)",
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
      },
    },
  },
  plugins: [],
} satisfies Config;
