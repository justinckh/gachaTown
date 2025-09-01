import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { borderRadius, colors, shadows, spacing } from "../../styles/colors";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "filled";
  padding?: "none" | "small" | "medium" | "large";
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export default function Card({
  children,
  variant = "default",
  padding = "medium",
  onPress,
  style,
  disabled = false,
  accessibilityLabel,
}: CardProps) {
  const cardStyles: ViewStyle[] = [
    styles.card,
    styles[variant],
    styles[padding],
    disabled && styles.disabled,
    style,
  ].filter(Boolean) as ViewStyle[];

  const CardContent = ({ children }: { children: React.ReactNode }) => (
    <View style={cardStyles}>{children}</View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.95}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
        style={cardStyles}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <CardContent>{children}</CardContent>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },

  // Variants
  default: {
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  elevated: {
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  outlined: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filled: {
    backgroundColor: colors.surfaceLight,
  },

  // Padding
  none: {
    padding: 0,
  },
  small: {
    padding: spacing.md,
  },
  medium: {
    padding: spacing.lg,
  },
  large: {
    padding: spacing.xl,
  },

  // States
  disabled: {
    opacity: 0.6,
  },
});
