// Design System Colors - Family-friendly, playful yet professional
export const colors = {
  // Primary Colors - Soft Blues and Greens
  primary: "#6B9DFF", // Soft blue
  primaryLight: "#B8D4FF",
  primaryDark: "#4A7FE8",

  secondary: "#7ED957", // Soft green
  secondaryLight: "#B8F299",
  secondaryDark: "#5CB842",

  // Accent Colors
  accent: "#FF9F7A", // Soft coral
  accentLight: "#FFB8A3",
  accentDark: "#FF8A5B",

  // Neutral Colors
  white: "#FFFFFF",
  background: "#F8FBFF", // Very light blue tint
  surface: "#FFFFFF",
  surfaceLight: "#F5F9FF",

  // Text Colors
  textPrimary: "#2D3748",
  textSecondary: "#718096",
  textLight: "#A0AEC0",
  textOnPrimary: "#FFFFFF",

  // Status Colors
  success: "#7ED957",
  warning: "#FFB84D",
  error: "#FF6B6B",
  info: "#6B9DFF",

  // Interactive Colors
  border: "#E2E8F0",
  borderLight: "#F7FAFC",
  shadow: "rgba(107, 157, 255, 0.1)",

  // Toy Status Colors
  toyActive: "#7ED957",
  toyStandby: "#FFB84D",
  toyOffline: "#A0AEC0",

  // Gradient Colors
  gradientPrimary: ["#6B9DFF", "#B8D4FF"],
  gradientSecondary: ["#7ED957", "#B8F299"],
  gradientAccent: ["#FF9F7A", "#FFB8A3"],
  gradientBackground: ["#F8FBFF", "#FFFFFF"],
};

// Typography System
export const typography = {
  fontFamily: "Poppins", // Fallback to system fonts
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};

// Spacing System
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border Radius System
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

// Shadow System
export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};
