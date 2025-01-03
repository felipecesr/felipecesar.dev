import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#fff9e6",
          "100": "#fff3cc",
          "200": "#ffe699",
          "300": "#ffdb66",
          "400": "#ffd133",
          "500": "#ffc700",
          "600": "#e6b300",
          "700": "#ffd900",
          "800": "#b38a00",
          "900": "#806600",
          "950": "#4d3d00",
        },
        "black-pearl": {
          "50": "#f2f2f2",
          "100": "#e6e6e6",
          "200": "#cccccc",
          "300": "#b3b3b3",
          "400": "#999999",
          "500": "#808080",
          "600": "#666666",
          "700": "#4d4d4d",
          "800": "#333333",
          "900": "#1c1c1c",
          "950": "#0d0d0d",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
        },
        screens: {
          DEFAULT: "400px",
          sm: "640px",
          md: "700px",
          lg: "1024px",
        },
      },
      fontFamily: {
        body: ["Arial", "sans-serif"],
      },
    },
  },
  plugins: [typography, containerQueries],
} satisfies Config;
