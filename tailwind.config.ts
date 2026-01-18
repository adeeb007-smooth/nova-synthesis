import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505", // The Void
        gold: "#D4AF37",     // The Luxury Accent
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'drift': 'drift 10s infinite ease-in-out',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '33%': { transform: 'translate(30px, -50px)' },
          '66%': { transform: 'translate(-20px, 40px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;