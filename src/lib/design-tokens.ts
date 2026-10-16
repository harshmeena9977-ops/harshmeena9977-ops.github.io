import { colors } from "./colors";

export const designTokens = {
  colors,
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
  },
  radius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
  typography: {
    fontFamily: {
      sans: "var(--font-sans)",
      mono: "var(--font-mono)",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      display: "2.5rem",
    },
    lineHeight: {
      tight: "1.2",
      normal: "1.5",
      relaxed: "1.7",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  layout: {
    contentMaxWidth: "80rem",
    readingMaxWidth: "48rem",
    pageGutter: "clamp(1rem, 4vw, 2rem)",
  },
  shadow: {
    card: "0 8px 24px rgb(0 0 0 / 0.24)",
    floating: "0 16px 40px rgb(0 0 0 / 0.32)",
    focus: "0 0 0 3px rgb(34 211 238 / 0.45)",
  },
  animation: {
    duration: {
      instant: 0,
      fast: 0.12,
      standard: 0.2,
      deliberate: 0.32,
      slow: 0.48,
    },
    easing: {
      standard: [0.2, 0, 0, 1],
      enter: [0, 0, 0.2, 1],
      exit: [0.4, 0, 1, 1],
    },
    staggerChildren: 0.04,
    reducedMotionDuration: 0,
  },
} as const;
