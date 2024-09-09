/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily:{
      sans: ["Roboto Mono", "monospace"],
      serif: ["Roboto Mono", "monospace"],
    },
    extend: {
      height: {
        screen: '100dvh'
      }
    },
    
  },
  plugins: [],
};
