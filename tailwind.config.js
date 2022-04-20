/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md,html}", "./src/**/*.svg"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light", "black"], // false: only light + dark | true: all themes |
    darkTheme: "black", // name of one of the included themes for dark mode
  },
};
