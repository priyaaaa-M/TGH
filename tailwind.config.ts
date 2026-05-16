import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        handwritten: ["var(--font-caveat)", "cursive"],
      },
      colors: {
        lavender: "var(--lavender)",
        "pastel-yellow": "var(--pastel-yellow)",
        peach: "var(--peach)",
        "sage-green": "var(--sage-green)",
        "baby-blue": "var(--baby-blue)",
        "soft-pink": "var(--soft-pink)",
        cream: "var(--cream)",
        "orange-highlight": "var(--orange-highlight)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        "soft-lg": "0 8px 30px rgba(0, 0, 0, 0.08)",
        "sticky-note": "2px 4px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
