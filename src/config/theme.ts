export const themeConfig = {
  colors: {
    // Brand colors (HSL)
    brand: {
      DEFAULT: "262 86% 60%", // Violet Vaonix
      600: "262 70% 52%",
      700: "262 60% 45%",
      50: "262 86% 97%",
      100: "262 86% 94%"
    },
    
    // Base colors
    background: "0 0% 100%", // White
    foreground: "240 10% 10%", // Dark text
    muted: "240 4% 46%", // Muted text
    accent: "210 14% 95%", // Light accent
    
    // Semantic colors
    border: "214 32% 91%",
    input: "214 32% 91%",
    ring: "262 86% 60%"
  },
  
  // Typography
  fonts: {
    sans: ["Inter", "system-ui", "sans-serif"],
    heading: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"]
  },
  
  // Spacing & layout
  borderRadius: {
    DEFAULT: "0.75rem", // rounded-xl
    lg: "1rem", // rounded-2xl
    sm: "0.5rem"
  },
  
  // Shadows
  shadows: {
    soft: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    brand: "0 4px 14px 0 hsl(262 86% 60% / 0.15)"
  },
  
  // Animation durations
  animation: {
    fast: "120ms",
    normal: "220ms",
    slow: "300ms"
  }
};