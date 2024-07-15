import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

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
        5: "color(display-p3 0.88 0.88 0.88)",
        6: "color(display-p3 0.849 0.849 0.849)",
        7: "color(display-p3 0.807 0.807 0.807)",
        8: "color(display-p3 0.732 0.732 0.732)",
        9: "color(display-p3 0.553 0.553 0.553)",
        10: "color(display-p3 0.512 0.512 0.512)",
        11: "color(display-p3 0.392 0.392 0.392)",
        12: "color(display-p3 0.125 0.125 0.125)",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Montserrat Variable", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        noise: "url(/noise.png)",
      },
    },
  },
  plugins: [],
};
