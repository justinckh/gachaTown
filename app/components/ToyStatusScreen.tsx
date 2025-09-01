import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
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

interface ToyStatusScreenProps {
  toyData: {
    id: string;
    name: string;
    battery: string;
    status: string;
    personality: string;
    parentalGuidance: boolean;
  };
  onBack: () => void;
  onSettings: () => void;
}

export default function ToyStatusScreen({
  toyData,
  onBack,
  onSettings,
}: ToyStatusScreenProps) {
  const getBatteryColor = (battery: string) => {
    const level = parseInt(battery);
    if (level > 60) return colors.success;
    if (level > 30) return colors.warning;
    return colors.error;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return colors.success;
      case "standby":
        return colors.warning;
      default:
        return colors.error;
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "活跃中";
      case "standby":
        return "待机中";
      default:
        return "离线";
    }
  };

  const getPersonalityText = (personality: string) => {
    switch (personality) {
      case "friendly":
        return "友善关爱型";
      case "playful":
        return "活泼有趣型";
      case "educational":
        return "教育智能型";
      case "calm":
        return "平静安详型";
      default:
        return "未知";
    }
  };

  const batteryLevel = parseInt(toyData.battery);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Simple Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>玩具状态</Text>
        <TouchableOpacity style={styles.headerButton} onPress={onSettings}>
          <Ionicons name="settings" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Toy Info Card */}
        <Card variant="default" padding="large" style={styles.toyInfoCard}>
          <View style={styles.toyInfoHeader}>
            <View style={styles.toyAvatarContainer}>
              <View style={styles.toyAvatar}>
                <Ionicons
                  name="hardware-chip"
                  size={40}
                  color={colors.primary}
                />
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(toyData.status) },
                ]}
              >
                <Text style={styles.statusBadgeText}>
                  {getStatusText(toyData.status)}
                </Text>
              </View>
            </View>
            <View style={styles.toyInfoContent}>
              <Text style={styles.toyName}>{toyData.name}</Text>
              <Text style={styles.toySubtitle}>智能AI伙伴</Text>
              <View style={styles.batteryInfo}>
                <Ionicons
                  name="battery-charging"
                  size={16}
                  color={getBatteryColor(toyData.battery)}
                />
                <Text
                  style={[
                    styles.batteryText,
                    { color: getBatteryColor(toyData.battery) },
                  ]}
                >
                  {toyData.battery} 电量
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Quick Stats Cards */}
        <View style={styles.quickStatsContainer}>
          <Card variant="default" padding="medium" style={styles.quickStatCard}>
            <View style={styles.quickStatContent}>
              <View
                style={[styles.quickStatIcon, { backgroundColor: colors.info }]}
              >
                <Ionicons name="time" size={20} color={colors.textOnPrimary} />
              </View>
              <Text style={styles.quickStatValue}>2分钟前</Text>
              <Text style={styles.quickStatLabel}>上次活动</Text>
            </View>
          </Card>

          <Card variant="default" padding="medium" style={styles.quickStatCard}>
            <View style={styles.quickStatContent}>
              <View
                style={[
                  styles.quickStatIcon,
                  { backgroundColor: colors.secondary },
                ]}
              >
                <Ionicons name="flash" size={20} color={colors.textOnPrimary} />
              </View>
              <Text style={styles.quickStatValue}>3小时</Text>
              <Text style={styles.quickStatLabel}>运行时间</Text>
            </View>
          </Card>

          <Card variant="default" padding="medium" style={styles.quickStatCard}>
            <View style={styles.quickStatContent}>
              <View
                style={[
                  styles.quickStatIcon,
                  { backgroundColor: colors.warning },
                ]}
              >
                <Ionicons
                  name="thermometer"
                  size={20}
                  color={colors.textOnPrimary}
                />
              </View>
              <Text style={styles.quickStatValue}>23°C</Text>
              <Text style={styles.quickStatLabel}>温度</Text>
            </View>
          </Card>
        </View>

        {/* Battery Details */}
        <Card variant="default" padding="large" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="battery-charging"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.sectionTitle}>电池状态</Text>
          </View>

          <View style={styles.batteryDetails}>
            <View style={styles.batteryProgressContainer}>
              <View style={styles.batteryProgress}>
                <View
                  style={[
                    styles.batteryProgressFill,
                    {
                      width: `${batteryLevel}%`,
                      backgroundColor: getBatteryColor(toyData.battery),
                    },
                  ]}
                />
              </View>
              <Text style={styles.batteryPercentage}>{toyData.battery}</Text>
            </View>

            <View style={styles.batteryInfoDetails}>
              <View style={styles.batteryInfoItem}>
                <Text style={styles.batteryInfoLabel}>预计剩余</Text>
                <Text style={styles.batteryInfoValue}>4.5 小时</Text>
              </View>
              <View style={styles.batteryInfoItem}>
                <Text style={styles.batteryInfoLabel}>充电状态</Text>
                <Text style={styles.batteryInfoValue}>正常</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Activity Summary */}
        <Card variant="filled" padding="large" style={styles.activityCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="analytics" size={24} color={colors.accent} />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              今日活动
            </Text>
          </View>

          <View style={styles.activityGrid}>
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons
                  name="game-controller"
                  size={24}
                  color={colors.secondary}
                />
              </View>
              <Text style={styles.activityValue}>2小时15分</Text>
              <Text style={styles.activityLabel}>游戏时间</Text>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons name="chatbubbles" size={24} color={colors.primary} />
              </View>
              <Text style={styles.activityValue}>12次</Text>
              <Text style={styles.activityLabel}>互动次数</Text>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons
                  name="musical-notes"
                  size={24}
                  color={colors.accent}
                />
              </View>
              <Text style={styles.activityValue}>5首</Text>
              <Text style={styles.activityLabel}>学习歌曲</Text>
            </View>
          </View>
        </Card>

        {/* System Info */}
        <Card variant="default" padding="large" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color={colors.info} />
            <Text style={styles.sectionTitle}>系统信息</Text>
          </View>

          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>AI性格</Text>
              <View style={styles.infoValueContainer}>
                <Text style={styles.infoValue}>
                  {getPersonalityText(toyData.personality)}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>家长指导</Text>
              <View
                style={[
                  styles.infoValueContainer,
                  {
                    backgroundColor: toyData.parentalGuidance
                      ? colors.primaryLight
                      : colors.accentLight,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.infoValue,
                    {
                      color: toyData.parentalGuidance
                        ? colors.success
                        : colors.error,
                    },
                  ]}
                >
                  {toyData.parentalGuidance ? "已启用" : "已禁用"}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>网络连接</Text>
              <View
                style={[
                  styles.infoValueContainer,
                  { backgroundColor: colors.secondaryLight },
                ]}
              >
                <Text style={[styles.infoValue, { color: colors.success }]}>
                  WiFi 正常
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>固件版本</Text>
              <View style={styles.infoValueContainer}>
                <Text style={styles.infoValue}>v2.1.4</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button
            title="重启设备"
            onPress={() => {}}
            variant="outline"
            size="large"
            icon="refresh"
            fullWidth
          />
          <View style={styles.actionButtonsRow}>
            <Button
              title="进入睡眠"
              onPress={() => {}}
              variant="ghost"
              size="medium"
              icon="moon"
            />
            <Button
              title="同步数据"
              onPress={() => {}}
              variant="primary"
              size="medium"
              icon="sync"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surfaceLight,
  },
  headerTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  toyInfoCard: {
    marginBottom: spacing.lg,
  },
  toyInfoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  toyAvatarContainer: {
    position: "relative",
  },
  toyAvatar: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.sm,
  },
  statusBadge: {
    position: "absolute",
    bottom: -6,
    right: -6,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  statusBadgeText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: "600" as const,
    color: colors.textOnPrimary,
    fontFamily: typography.fontFamily,
  },
  toyInfoContent: {
    flex: 1,
  },
  toyName: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: "700" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  },
  toySubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.md,
  },
  batteryInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  batteryText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "600" as const,
    fontFamily: typography.fontFamily,
  },
  quickStatsContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  quickStatCard: {
    flex: 1,
  },
  quickStatContent: {
    alignItems: "center",
  },
  quickStatIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  quickStatValue: {
    fontSize: typography.fontSizes.md,
    fontWeight: "700" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  },
  quickStatLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    textAlign: "center",
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  batteryDetails: {
    gap: spacing.lg,
  },
  batteryProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  batteryProgress: {
    flex: 1,
    height: 12,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.sm,
    overflow: "hidden",
  },
  batteryProgressFill: {
    height: "100%",
    borderRadius: borderRadius.sm,
  },
  batteryPercentage: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "700" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  batteryInfoDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  batteryInfoItem: {
    alignItems: "center",
  },
  batteryInfoLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  },
  batteryInfoValue: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  activityCard: {
    marginBottom: spacing.lg,
    backgroundColor: colors.accentLight,
  },
  activityGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  activityItem: {
    alignItems: "center",
  },
  activityIconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  activityValue: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "700" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  },
  activityLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    textAlign: "center",
  },
  infoList: {
    gap: spacing.md,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  infoValueContainer: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  infoValue: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  actionsContainer: {
    gap: spacing.md,
  },
  actionButtonsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
});
