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
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#127BAD",
          secondary: "#909286",
          accent: "#d870a8",
          neutral: "#1A1B1E",
          "base-100": "#14171F",
          info: "#5aa7d3",
          success: "#29db79",
          warning: "#f5c13d",
          error: "#f96666",
        },
      },
    ],
  },
};
export default config;
