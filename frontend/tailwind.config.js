/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2192FF",
        secondary: "#38E54D",
        tertiary: "#9CFF2E",
        quaternary: "#FDFF00",
      },
    },
  },
  plugins: [],
};
