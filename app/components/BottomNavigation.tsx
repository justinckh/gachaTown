import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
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
} from "../styles/colors";

interface BottomNavigationProps {
  activeTab: "home" | "discovery" | "quest" | "account" | "bluetooth";
  onHome: () => void;
  onDiscovery: () => void;
  onQuest: () => void;
  onAccount: () => void;
  onBluetooth: () => void;
}

export default function BottomNavigation({
  activeTab,
  onHome,
  onDiscovery,
  onQuest,
  onAccount,
  onBluetooth,
}: BottomNavigationProps) {
  const NavButton = ({
    tab,
    onPress,
    icon,
    label,
  }: {
    tab: string;
    onPress: () => void;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
  }) => {
    const isActive = activeTab === tab;
    const iconName = isActive
      ? icon
      : (`${icon}-outline` as keyof typeof Ionicons.glyphMap);

    const iconContainerStyle: ViewStyle[] = [
      styles.navIconContainer,
      !isActive && styles.navIconContainerInactive,
    ].filter(Boolean) as ViewStyle[];

    const textStyle: TextStyle[] = [
      styles.navText,
      isActive ? styles.navTextActive : styles.navTextInactive,
    ].filter(Boolean) as TextStyle[];

    return (
      <TouchableOpacity
        style={styles.navItem}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="tab"
        accessibilityLabel={label}
        accessibilityState={{ selected: isActive }}
      >
        <View style={iconContainerStyle}>
          <Ionicons
            name={iconName}
            size={22}
            color={isActive ? colors.textOnPrimary : colors.textSecondary}
          />
        </View>
        <Text style={textStyle}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.bottomNav}>
      <NavButton tab="home" onPress={onHome} icon="home" label="首页" />
      <NavButton
        tab="discovery"
        onPress={onDiscovery}
        icon="map"
        label="发现"
      />
      <NavButton tab="quest" onPress={onQuest} icon="trophy" label="任务" />
      <NavButton
        tab="bluetooth"
        onPress={onBluetooth}
        icon="bluetooth"
        label="蓝牙"
      />
      <NavButton tab="account" onPress={onAccount} icon="person" label="我的" />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.sm,
  },
  navItem: {
    alignItems: "center",
    minWidth: 60,
    paddingVertical: spacing.xs,
  },
  navIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xs,
    ...shadows.sm,
  },
  navIconContainerInactive: {
    backgroundColor: "transparent",
    shadowOpacity: 0,
  },
  navText: {
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizes.xs,
    fontWeight: "500" as const,
    textAlign: "center",
  },
  navTextActive: {
    color: colors.textPrimary,
    fontWeight: "600" as const,
  },
  navTextInactive: {
    color: colors.textSecondary,
  },
});
