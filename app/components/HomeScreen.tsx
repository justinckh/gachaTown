import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  Image,
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

interface ToyData {
  id: string;
  name: string;
  battery: string;
  status: string;
  personality: string;
  parentalGuidance: boolean;
}

interface HomeScreenProps {
  toys: ToyData[];
  onToySettings: (toyId: string) => void;
  onToyPress: (toyId: string) => void;
  onDiscovery: () => void;
  onAccount: () => void;
}

export default function HomeScreen({
  toys,
  onToySettings,
  onToyPress,
  onDiscovery,
  onAccount,
}: HomeScreenProps) {
  const handleSettingsPress = (toyId: string) => {
    onToySettings(toyId);
  };

  const getBatteryColor = (battery: string) => {
    const level = parseInt(battery);
    if (level > 60) return colors.success;
    if (level > 30) return colors.warning;
    return colors.error;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return colors.toyActive;
      case "standby":
        return colors.toyStandby;
      default:
        return colors.toyOffline;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Gacha Town</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons
              name="notifications"
              size={22}
              color={colors.textOnPrimary}
            />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* New Release Section */}
        <View style={styles.newReleaseSection}>
          <Text style={styles.sectionTitle}>新品上架</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.toyScrollView}
            contentContainerStyle={styles.toyScrollContent}
          >
            {/* Featured Toy Cards */}
            {[
              {
                image: require("../../assets/images/bunny.jpg"),
                name: "兔子朋友",
                color: colors.accent,
              },
              {
                image: require("../../assets/images/bird.jpg"),
                name: "机器伙伴",
                color: colors.info,
              },
              {
                image: require("../../assets/images/car.jpg"),
                name: "魔法独角兽",
                color: colors.secondary,
              },
              {
                image: require("../../assets/images/lego.jpg"),
                name: "龙之伙伴",
                color: colors.warning,
              },
              {
                image: require("../../assets/images/pika.jpeg"),
                name: "小猫朋友",
                color: colors.primary,
              },
            ].map((item, index) => {
              const imageContainerStyle = {
                ...styles.toyImageContainer,
                backgroundColor: `${item.color}20`,
              };
              const badgeStyle = {
                ...styles.newBadge,
                backgroundColor: item.color,
              };

              return (
                <Card
                  key={index}
                  variant="elevated"
                  padding="medium"
                  style={styles.toyCard}
                >
                  <View style={imageContainerStyle}>
                    <Image
                      source={item.image}
                      style={styles.toyImage}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={styles.toyCardName}>{item.name}</Text>
                  <View style={badgeStyle}>
                    <Text style={styles.newBadgeText}>新品</Text>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
        </View>

        {/* Connected Toys Section */}
        <View style={styles.connectedSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>我的玩具</Text>
              <Text style={styles.sectionSubtitle}>
                已连接 {toys.length} 个
              </Text>
            </View>
            <Button
              title="添加玩具"
              onPress={() => {}}
              variant="ghost"
              size="small"
              icon="add"
            />
          </View>

          {/* Toy Cards */}
          <View style={styles.toyCardsContainer}>
            {toys.map((toy, index) => (
              <Card
                key={toy.id}
                variant="elevated"
                padding="medium"
                style={{
                  ...styles.toyStatusCard,
                  ...(index === 0 ? styles.primaryToyCard : {}),
                }}
              >
                <TouchableOpacity onPress={() => onToyPress(toy.id)}>
                  <View style={styles.toyCardContent}>
                    <View style={styles.toyCardLeft}>
                      <View style={styles.toyHeader}>
                        <Text
                          style={[
                            styles.toyName,
                            index === 0 && styles.toyNamePrimary,
                          ]}
                        >
                          {toy.name}
                        </Text>
                        <View
                          style={[
                            styles.statusIndicator,
                            { backgroundColor: getStatusColor(toy.status) },
                          ]}
                        />
                      </View>

                      <View style={styles.toyInfo}>
                        <View style={styles.batteryContainer}>
                          <Ionicons
                            name="battery-charging"
                            size={16}
                            color={getBatteryColor(toy.battery)}
                          />
                          <Text
                            style={[
                              styles.batteryText,
                              { color: getBatteryColor(toy.battery) },
                            ]}
                          >
                            {toy.battery}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.statusText,
                            index === 0 && styles.statusTextPrimary,
                          ]}
                        >
                          {toy.status}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.settingsButton}
                      onPress={() => handleSettingsPress(toy.id)}
                    >
                      <Ionicons
                        name="settings"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>快捷操作</Text>
          <View style={styles.quickActionsGrid}>
            <Card
              variant="outlined"
              padding="medium"
              style={styles.quickActionCard}
            >
              <Ionicons name="flash" size={24} color={colors.accent} />
              <Text style={styles.quickActionText}>全部同步</Text>
            </Card>
            <Card
              variant="outlined"
              padding="medium"
              style={styles.quickActionCard}
            >
              <Ionicons name="moon" size={24} color={colors.info} />
              <Text style={styles.quickActionText}>睡眠模式</Text>
            </Card>
            <Card
              variant="outlined"
              padding="medium"
              style={styles.quickActionCard}
            >
              <Ionicons
                name="game-controller"
                size={24}
                color={colors.secondary}
              />
              <Text style={styles.quickActionText}>游戏时间</Text>
            </Card>
            <Card
              variant="outlined"
              padding="medium"
              style={styles.quickActionCard}
            >
              <Ionicons
                name="shield-checkmark"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.quickActionText}>安全模式</Text>
            </Card>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  greeting: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: "700" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    ...shadows.sm,
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  newReleaseSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  sectionSubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    marginTop: spacing.xs,
  },
  toyScrollView: {
    marginTop: spacing.md,
  },
  toyScrollContent: {
    paddingHorizontal: spacing.sm,
  },
  toyCard: {
    width: 140,
    marginHorizontal: spacing.sm,
    position: "relative",
  },
  toyImageContainer: {
    width: "100%",
    height: 100,
    borderRadius: borderRadius.md,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  toyImage: {
    width: "100%",
    height: "100%",
  },
  toyCardName: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "500" as const,
    color: colors.textPrimary,
    textAlign: "center",
    fontFamily: typography.fontFamily,
  },
  newBadge: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: "600" as const,
    color: colors.textOnPrimary,
    fontFamily: typography.fontFamily,
  },
  connectedSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  toyCardsContainer: {
    gap: spacing.md,
  },
  toyStatusCard: {
    backgroundColor: colors.surface,
  },
  primaryToyCard: {
    backgroundColor: colors.primaryLight,
  },
  toyCardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toyCardLeft: {
    flex: 1,
  },
  toyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  toyName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  toyNamePrimary: {
    color: colors.primary,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  toyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  batteryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  batteryText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: "500" as const,
    fontFamily: typography.fontFamily,
  },
  statusText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  statusTextPrimary: {
    color: colors.primary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.sm,
  },
  quickActionsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: spacing.md,
  },
  quickActionCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    alignItems: "center",
    marginBottom: spacing.md,
  },
  quickActionText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    marginTop: spacing.sm,
    fontWeight: "500" as const,
  },
});
