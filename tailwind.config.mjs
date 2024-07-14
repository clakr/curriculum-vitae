import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      // radix gray
      gray: {
        1: "color(display-p3 0.988 0.988 0.988)",
        2: "color(display-p3 0.975 0.975 0.975)",
        3: "color(display-p3 0.939 0.939 0.939)",
        4: "color(display-p3 0.908 0.908 0.908)",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Montserrat Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
