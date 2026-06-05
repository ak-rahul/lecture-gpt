import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          muted: "hsl(var(--foreground-muted))",
          subtle: "hsl(var(--foreground-subtle))",
        },
        surface: {
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(0 0% 100%)",
        },
        amber: "hsl(var(--amber))",
        border: {
          DEFAULT: "hsl(var(--border))",
          strong: "hsl(var(--border-strong))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(91, 91, 214, 0.2)',
        'glow': '0 0 20px rgba(91, 91, 214, 0.3)',
        'glow-lg': '0 0 30px rgba(91, 91, 214, 0.4)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.6)',
        'float': '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
      },
      transitionTimingFunction: {
        'fluid': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      animation: {
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(0.95)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
