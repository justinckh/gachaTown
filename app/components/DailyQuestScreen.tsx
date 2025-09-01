import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

interface DailyQuestScreenProps {
  onBack: () => void;
}

interface Quest {
  id: string;
  title: string;
  description: string;
  type: "talk" | "sing" | "play" | "care";
  points: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const dailyQuests: Quest[] = [
  {
    id: "1",
    title: "晨间问候",
    description: "与您的玩具说早安",
    type: "talk",
    points: 50,
    progress: 0,
    maxProgress: 1,
    completed: false,
    icon: "chatbubbles",
    color: colors.primary,
  },
  {
    id: "2",
    title: "唱歌时光",
    description: "为您的玩具唱一首歌",
    type: "sing",
    points: 100,
    progress: 0,
    maxProgress: 1,
    completed: false,
    icon: "musical-notes",
    color: colors.accent,
  },
  {
    id: "3",
    title: "游戏伙伴",
    description: "与玩具一起玩游戏",
    type: "play",
    points: 80,
    progress: 1,
    maxProgress: 3,
    completed: false,
    icon: "game-controller",
    color: colors.secondary,
  },
  {
    id: "4",
    title: "关爱时间",
    description: "检查玩具的状态并充电",
    type: "care",
    points: 60,
    progress: 0,
    maxProgress: 2,
    completed: false,
    icon: "heart",
    color: colors.warning,
  },
];

export default function DailyQuestScreen({ onBack }: DailyQuestScreenProps) {
  const [quests, setQuests] = useState<Quest[]>(dailyQuests);
  const [totalPoints, setTotalPoints] = useState(280);

  const handleQuestAction = (questId: string) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) => {
        if (quest.id === questId && !quest.completed) {
          const newProgress = Math.min(quest.progress + 1, quest.maxProgress);
          const completed = newProgress >= quest.maxProgress;

          if (completed && !quest.completed) {
            setTotalPoints((prev) => prev + quest.points);
          }

          return {
            ...quest,
            progress: newProgress,
            completed,
          };
        }
        return quest;
      })
    );
  };

  const completedQuests = quests.filter((q) => q.completed).length;
  const totalQuests = quests.length;

  const getQuestActionText = (quest: Quest) => {
    if (quest.completed) return "已完成";
    switch (quest.type) {
      case "talk":
        return "开始对话";
      case "sing":
        return "开始唱歌";
      case "play":
        return "开始游戏";
      case "care":
        return "关爱玩具";
      default:
        return "开始";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>每日任务</Text>
          <Text style={styles.headerSubtitle}>与您的玩具互动赚取积分</Text>
        </View>
        <View style={styles.pointsContainer}>
          <Ionicons name="star" size={16} color={colors.warning} />
          <Text style={styles.pointsText}>{totalPoints}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Progress Card */}
        <Card variant="filled" padding="large" style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>今日进度</Text>
            <Text style={styles.progressCount}>
              {completedQuests}/{totalQuests}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(completedQuests / totalQuests) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressPercentage}>
              {Math.round((completedQuests / totalQuests) * 100)}%
            </Text>
          </View>
          <Text style={styles.progressDescription}>
            完成所有任务可获得奖励积分！
          </Text>
        </Card>

        {/* Quest List */}
        <View style={styles.questsSection}>
          <Text style={styles.sectionTitle}>任务列表</Text>

          {quests.map((quest) => (
            <Card
              key={quest.id}
              variant="default"
              padding="large"
              style={{
                ...styles.questCard,
                ...(quest.completed ? styles.completedQuestCard : {}),
              }}
            >
              <View style={styles.questContent}>
                <View style={styles.questLeft}>
                  <View
                    style={[styles.questIcon, { backgroundColor: quest.color }]}
                  >
                    <Ionicons
                      name={quest.icon}
                      size={24}
                      color={colors.textOnPrimary}
                    />
                  </View>
                  <View style={styles.questInfo}>
                    <Text style={styles.questTitle}>{quest.title}</Text>
                    <Text style={styles.questDescription}>
                      {quest.description}
                    </Text>

                    {/* Progress Bar */}
                    <View style={styles.questProgressContainer}>
                      <View style={styles.questProgressBar}>
                        <View
                          style={[
                            styles.questProgressFill,
                            {
                              width: `${
                                (quest.progress / quest.maxProgress) * 100
                              }%`,
                              backgroundColor: quest.color,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.questProgressText}>
                        {quest.progress}/{quest.maxProgress}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.questRight}>
                  <View style={styles.questReward}>
                    <Ionicons name="star" size={14} color={colors.warning} />
                    <Text style={styles.questPoints}>+{quest.points}</Text>
                  </View>
                  <Button
                    title={getQuestActionText(quest)}
                    onPress={() => handleQuestAction(quest.id)}
                    variant={quest.completed ? "ghost" : "primary"}
                    size="small"
                    disabled={quest.completed}
                  />
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Special Rewards */}
        <Card variant="outlined" padding="large" style={styles.rewardsCard}>
          <View style={styles.rewardsHeader}>
            <Ionicons name="gift" size={24} color={colors.accent} />
            <Text style={styles.rewardsTitle}>特殊奖励</Text>
          </View>
          <Text style={styles.rewardsDescription}>
            连续7天完成所有任务可获得神秘礼品！
          </Text>
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>连续完成天数：</Text>
            <Text style={styles.streakCount}>3 天</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  headerSubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    marginTop: spacing.xs,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  pointsText: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
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
  progressCard: {
    marginBottom: spacing.lg,
    backgroundColor: colors.primaryLight,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  progressTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  progressCount: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "700" as const,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
  },
  progressPercentage: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "600" as const,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },
  progressDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  questsSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily,
  },
  questCard: {
    marginBottom: spacing.md,
  },
  completedQuestCard: {
    opacity: 0.7,
    borderColor: colors.success,
    borderWidth: 1,
  },
  questContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  questIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
    ...shadows.sm,
  },
  questInfo: {
    flex: 1,
  },
  questTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  questDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily,
  },
  questProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  questProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  questProgressFill: {
    height: "100%",
    borderRadius: borderRadius.sm,
  },
  questProgressText: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  questRight: {
    alignItems: "flex-end",
    marginLeft: spacing.md,
  },
  questReward: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  questPoints: {
    fontSize: typography.fontSizes.sm,
    fontWeight: "600" as const,
    color: colors.warning,
    marginLeft: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  rewardsCard: {
    borderColor: colors.accent,
  },
  rewardsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  rewardsTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
    fontFamily: typography.fontFamily,
  },
  rewardsDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  streakText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  streakCount: {
    fontSize: typography.fontSizes.md,
    fontWeight: "700" as const,
    color: colors.accent,
    fontFamily: typography.fontFamily,
  },
});
