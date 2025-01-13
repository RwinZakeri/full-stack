import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-black": "var(--primary-black)",
        "primary-gray": "var(--primary-gray)",
        "btn-bg-hover": "var(--btn-bg-color)",
        "primary-white": "var(--primary-white)",
        "primary-light-black": "var(--primary-light-black)",
        "border-color": "var(--border-color)",
        "border-text": "var(--border-text-color)",
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
      },
    },
  },
  plugins: [],
};

export default config;
