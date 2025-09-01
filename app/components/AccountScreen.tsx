import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "../styles/colors";
import Button from "./common/Button";
import Card from "./common/Card";

const { width } = Dimensions.get("window");

interface AccountScreenProps {
  onHome: () => void;
  onDiscovery: () => void;
}

export default function AccountScreen({
  onHome,
  onDiscovery,
}: AccountScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Section */}
        <Card variant="default" padding="large" style={styles.profileCard}>
          <View style={styles.profileContent}>
            <View style={styles.profileTop}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Ionicons
                    name="person"
                    size={32}
                    color={colors.textSecondary}
                  />
                </View>
                <View style={styles.avatarBadge}>
                  <Ionicons name="add" size={16} color={colors.textOnPrimary} />
                </View>
              </View>
              <Button
                title="签到"
                onPress={() => {}}
                variant="outline"
                size="small"
                icon="gift"
              />
            </View>

            <View style={styles.profileInfo}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>新用家</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* My Assets Section */}
        <Card variant="default" padding="large" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>我的资产</Text>
          <View style={styles.assetsContainer}>
            <View style={styles.assetItem}>
              <View
                style={[styles.assetIcon, { backgroundColor: colors.accent }]}
              >
                <Ionicons
                  name="diamond"
                  size={20}
                  color={colors.textOnPrimary}
                />
              </View>
              <Text style={styles.assetNumber}>0</Text>
              <Text style={styles.assetLabel}>积分</Text>
              <View style={styles.redDot} />
            </View>
            <View style={styles.assetItem}>
              <View
                style={[styles.assetIcon, { backgroundColor: colors.warning }]}
              >
                <Ionicons name="star" size={20} color={colors.textOnPrimary} />
              </View>
              <Text style={styles.assetNumber}>0</Text>
              <Text style={styles.assetLabel}>点数</Text>
              <View style={styles.redDot} />
            </View>
            <View style={styles.assetItem}>
              <View
                style={[styles.assetIcon, { backgroundColor: colors.info }]}
              >
                <Ionicons
                  name="trophy"
                  size={20}
                  color={colors.textOnPrimary}
                />
              </View>
              <Text style={styles.assetNumber}>-</Text>
              <Text style={styles.assetLabel}>徽章</Text>
            </View>
          </View>
        </Card>

        {/* Quick Access Section */}
        <Card variant="default" padding="large" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>快速访问</Text>
          <View style={styles.quickAccessContainer}>
            <Card
              variant="outlined"
              padding="medium"
              style={styles.quickAccessCard}
              onPress={() => {}}
            >
              <View
                style={[
                  styles.quickAccessIcon,
                  { backgroundColor: colors.secondary },
                ]}
              >
                <Ionicons
                  name="storefront"
                  size={24}
                  color={colors.textOnPrimary}
                />
              </View>
              <Text style={styles.quickAccessLabel}>机器人商店</Text>
              <Text style={styles.quickAccessSubtitle}>浏览AI玩具</Text>
            </Card>

            <Card
              variant="outlined"
              padding="medium"
              style={styles.quickAccessCard}
              onPress={() => {}}
            >
              <View
                style={[
                  styles.quickAccessIcon,
                  { backgroundColor: colors.accent },
                ]}
              >
                <Ionicons
                  name="camera"
                  size={24}
                  color={colors.textOnPrimary}
                />
              </View>
              <Text style={styles.quickAccessLabel}>拍照亭</Text>
              <Text style={styles.quickAccessSubtitle}>捕捉美好时刻</Text>
            </Card>
          </View>
        </Card>

        {/* Services & Tools Section */}
        <Card variant="default" padding="large" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>服务与工具</Text>
          <View style={styles.servicesContainer}>
            {[
              { icon: "person-add", label: "关注我们", color: colors.info },
              {
                icon: "search",
                label: "商店查找",
                color: colors.secondary,
              },
              { icon: "qr-code", label: "产品识别", color: colors.accent },
              {
                icon: "swap-horizontal",
                label: "交易区",
                color: colors.warning,
              },
              { icon: "headset", label: "客服支持", color: colors.primary },
              { icon: "location", label: "位置服务", color: colors.info },
              {
                icon: "notifications",
                label: "消息通知",
                color: colors.accent,
              },
              {
                icon: "settings",
                label: "设置",
                color: colors.textSecondary,
              },
            ].map((service, index) => (
              <TouchableOpacity key={index} style={styles.serviceItem}>
                <View
                  style={[
                    styles.serviceIcon,
                    { backgroundColor: service.color },
                  ]}
                >
                  <Ionicons
                    name={service.icon as keyof typeof Ionicons.glyphMap}
                    size={18}
                    color={colors.textOnPrimary}
                  />
                </View>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Stats Card */}
        <Card variant="filled" padding="large" style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>你的旅程</Text>
            <Ionicons name="trending-up" size={20} color={colors.primary} />
          </View>
          <View style={styles.statsContent}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>活跃天数</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>已连接玩具</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>游戏次数</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  profileCard: {
    marginBottom: spacing.lg,
  },
  profileContent: {
    flexDirection: "column",
  },
  profileTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.accent,
  },
  avatarBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.surface,
  },
  profileInfo: {
    alignItems: "center",
    textAlign: "center",
  },
  loginText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  profileSubtext: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily,
  },
  statusBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    alignSelf: "flex-start",
  },
  statusBadgeText: {
    fontSize: typography.fontSizes.xs,
    color: colors.primary,
    fontWeight: "600" as const,
    fontFamily: typography.fontFamily,
  },
  sectionCard: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily,
  },
  assetsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  assetItem: {
    alignItems: "center",
    position: "relative",
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  assetNumber: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "700" as const,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  assetLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  redDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  quickAccessContainer: {
    flexDirection: "row",
    gap: spacing.md,
  },
  quickAccessCard: {
    flex: 1,
    alignItems: "center",
  },
  quickAccessIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  quickAccessLabel: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: "center",
    fontFamily: typography.fontFamily,
  },
  quickAccessSubtitle: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    textAlign: "center",
    fontFamily: typography.fontFamily,
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceItem: {
    alignItems: "center",
    width: (width - spacing.lg * 2 - spacing.xl * 2) / 4, // 4 items per row
    marginBottom: spacing.lg,
  },
  serviceIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  serviceLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    textAlign: "center",
    fontFamily: typography.fontFamily,
  },
  statsCard: {
    marginBottom: spacing.lg,
  },
  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  statsTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  statsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: "700" as const,
    color: colors.primary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    textAlign: "center",
    fontFamily: typography.fontFamily,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
});
