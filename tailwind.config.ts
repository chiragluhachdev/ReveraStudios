import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FAFAF8",
        ivory: "#F1EEE9",
        ink: "#0A0A0A",
        stone: "#6B6862",
        // Dark charcoal replaces the old terracotta accent.
        accent: "#2A2A2A",
        // Logo red — the "ê" and full stop in the "Rêvera." wordmark.
        brand: "#AB0003",
        // Gen Z pops — used on dark surfaces (banners, stickers, highlights).
        lime: "#DCFC5A",
        lilac: "#927FF7",
        sky: "#8EDCFB",
        pink: "#FFA8D4",
        gold: "#B08D57",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse":
          "marquee-reverse var(--marquee-duration, 40s) linear infinite",
        "spin-slow": "spin 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
