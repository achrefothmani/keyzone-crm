import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        surface: "#F7F7F7",
        elevated: "#FAFAFA",
        ink: {
          DEFAULT: "#1F2937",
          muted: "#6B7280",
          soft: "#9CA3AF",
        },
        line: {
          DEFAULT: "#E5E7EB",
          soft: "#F0F0F0",
        },
        gold: {
          DEFAULT: "#C9A646",
          deep: "#A8881F",
          soft: "#E9D9A6",
          tint: "#FBF6E5",
          mist: "#FDFAF0",
        },
        success: "#0E9F6E",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["56px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["40px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["32px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "10px",
        md: "12px",
        lg: "14px",
        xl: "18px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 1px rgba(15, 23, 42, 0.02)",
        lift: "0 8px 28px -8px rgba(15, 23, 42, 0.10), 0 2px 6px -2px rgba(15, 23, 42, 0.04)",
        gold: "0 6px 18px -6px rgba(201, 166, 70, 0.55)",
        focus: "0 0 0 4px rgba(201, 166, 70, 0.18)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.2s ease-out both",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
