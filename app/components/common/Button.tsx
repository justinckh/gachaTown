import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "../../styles/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
}: ButtonProps) {
  const buttonStyles: ViewStyle[] = [
    styles.button,
    styles[variant] as ViewStyle,
    styles[size] as ViewStyle,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
  ].filter(Boolean) as ViewStyle[];

  const textStyles: TextStyle[] = [
    styles.text,
    styles[`${variant}Text`] as TextStyle,
    styles[`${size}Text`] as TextStyle,
    disabled && styles.disabledText,
  ].filter(Boolean) as TextStyle[];

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  const renderIcon = () => {
    if (!icon) return null;

    const iconColor =
      variant === "outline" || variant === "ghost"
        ? colors.primary
        : colors.textOnPrimary;

    return (
      <Ionicons
        name={icon}
        size={size === "small" ? 16 : size === "large" ? 24 : 20}
        color={disabled ? colors.textLight : iconColor}
        style={iconPosition === "left" ? styles.iconLeft : styles.iconRight}
      />
    );
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
    >
      <View style={styles.content}>
        {iconPosition === "left" && renderIcon()}
        {loading ? (
          <ActivityIndicator
            size="small"
            color={
              variant === "outline" || variant === "ghost"
                ? colors.primary
                : colors.textOnPrimary
            }
          />
        ) : (
          <Text style={textStyles}>{title}</Text>
        )}
        {iconPosition === "right" && renderIcon()}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    ...shadows.sm,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  accent: {
    backgroundColor: colors.accent,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: "transparent",
  },

  // Sizes
  small: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: 56,
  },

  // Text styles
  text: {
    fontFamily: typography.fontFamily,
    fontWeight: "600" as const,
    textAlign: "center",
  },
  primaryText: {
    color: colors.textOnPrimary,
  },
  secondaryText: {
    color: colors.textOnPrimary,
  },
  accentText: {
    color: colors.textOnPrimary,
  },
  outlineText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.primary,
  },

  // Size-specific text
  smallText: {
    fontSize: typography.fontSizes.sm,
  },
  mediumText: {
    fontSize: typography.fontSizes.md,
  },
  largeText: {
    fontSize: typography.fontSizes.lg,
  },

  // States
  disabled: {
    backgroundColor: colors.borderLight,
    opacity: 0.6,
  },
  disabledText: {
    color: colors.textLight,
  },

  // Modifiers
  fullWidth: {
    width: "100%",
  },

  // Icons
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
});
