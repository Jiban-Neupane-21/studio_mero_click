/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E50914",
        },
      },
    },
  },
  plugins: [],
  // To avoid conflicts with MUI, you can add a prefix to Tailwind classes
  // prefix: 'tw-',
};
