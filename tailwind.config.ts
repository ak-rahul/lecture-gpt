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
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        "foreground-muted":  "hsl(var(--foreground-muted))",
        "foreground-subtle": "hsl(var(--foreground-subtle))",
        surface: {
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          hover:   "hsl(var(--accent-hover))",
          text:    "hsl(var(--accent-text))",
        },
        border: "hsl(var(--border))",
        "border-muted":  "hsl(var(--border-muted))",
        "border-strong": "hsl(var(--border-strong))",
        // keep shadcn compat tokens
        card:       { DEFAULT: "hsl(var(--surface-1))", foreground: "hsl(var(--foreground))" },
        primary:    { DEFAULT: "hsl(var(--accent))", foreground: "0 0% 100%" },
        muted:      { DEFAULT: "hsl(var(--surface-1))", foreground: "hsl(var(--foreground-muted))" },
        ring:       "hsl(var(--accent))",
        input:      "hsl(var(--surface-1))",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Geist", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Geist Mono", "monospace"],
      },
      animation: {
        "fade-up":   "fade-up 0.45s ease-out forwards",
        "fade-in":   "fade-in 0.35s ease-out forwards",
        "scale-in":  "scale-in 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "spin-slow": "spin-slow 3s linear infinite",
      },
      boxShadow: {
        "glow":    "0 0 24px var(--glow-accent)",
        "glow-sm": "0 0 12px var(--glow-accent)",
        "card":    "0 1px 3px rgba(0,0,0,0.4)",
        "float":   "0 8px 32px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
