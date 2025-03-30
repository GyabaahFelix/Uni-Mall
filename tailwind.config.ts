import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lama: "#F35C7A",
      },
      animation: {
        "gradient-shift": "gradientAnimation 5s infinite alternate",
      },
      keyframes: {
        gradientAnimation: {
          "0%": { color: "rgba(255, 0, 0, 1)" }, // Red
          "50%": { color: "rgba(128, 0, 128, 1)" }, // Purple
          "100%": { color: "rgba(0, 0, 255, 1)" }, // Blue
        },
      },
    },
  },
  plugins: [],
};

export default config;
