/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "768px",
      laptop: "1024px",
      laptopLarge: "1280px",
      desktop: "1440px",
    },
    extend: {
      backgroundImage: {
        noise: "url(/noise.png)",
      },
    },
  },
  plugins: [],
};
