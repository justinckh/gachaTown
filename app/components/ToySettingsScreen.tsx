import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { borderRadius, colors, spacing, typography } from "../styles/colors";
import Button from "./common/Button";
import Card from "./common/Card";

interface ToySettingsScreenProps {
  toyData: {
    name: string;
    battery: string;
    status: string;
    personality: string;
    parentalGuidance: boolean;
  };
  onBack: () => void;
  onSave: (updatedToy: {
    name: string;
    personality: string;
    parentalGuidance: boolean;
  }) => void;
}

const personalities = [
  {
    id: "friendly",
    name: "友善关爱型",
    description: "温暖且支持的伙伴",
  },
  {
    id: "playful",
    name: "活泼有趣型",
    description: "充满活力且有趣",
  },
  {
    id: "educational",
    name: "教育智能型",
    description: "专注于学习和成长",
  },
  {
    id: "calm",
    name: "平静安详型",
    description: "舒缓且放松的存在",
  },
];

export default function ToySettingsScreen({
  toyData,
  onBack,
  onSave,
}: ToySettingsScreenProps) {
  const [toyName, setToyName] = useState(toyData.name);
  const [selectedPersonality, setSelectedPersonality] = useState(
    toyData.personality
  );
  const [parentalGuidance, setParentalGuidance] = useState(
    toyData.parentalGuidance
  );

  const handleSave = () => {
    onSave({
      name: toyName,
      personality: selectedPersonality,
      parentalGuidance,
    });
    onBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>玩具设置</Text>
        <Button
          title="保存"
          onPress={handleSave}
          variant="primary"
          size="small"
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Toy Info Card */}
        <Card variant="filled" padding="large" style={styles.toyInfoCard}>
          <View style={styles.toyHeader}>
            <View>
              <Text style={styles.toyCurrentName}>{toyData.name}</Text>
              <Text style={styles.toySubtitle}>智能AI伴侣</Text>
            </View>
            <View style={styles.toyStats}>
              <View style={styles.batteryContainer}>
                <Ionicons
                  name="battery-charging"
                  size={14}
                  color={colors.primary}
                />
                <Text style={styles.batteryText}>{toyData.battery}</Text>
              </View>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: colors.success },
                  ]}
                />
                <Text style={styles.statusText}>{toyData.status}</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Toy Name Section */}
        <Card variant="default" padding="large" style={styles.section}>
          <Text style={styles.sectionTitle}>玩具名称</Text>
          <TextInput
            style={styles.nameInput}
            value={toyName}
            onChangeText={setToyName}
            placeholder="输入玩具名称"
            placeholderTextColor={colors.textLight}
          />
        </Card>

        {/* AI Personality Section */}
        <Card variant="default" padding="large" style={styles.section}>
          <Text style={styles.sectionTitle}>AI性格</Text>
          <Text style={styles.sectionDescription}>
            选择您的玩具如何与您互动
          </Text>

          {personalities.map((personality) => (
            <TouchableOpacity
              key={personality.id}
              style={[
                styles.personalityCard,
                selectedPersonality === personality.id &&
                  styles.selectedPersonality,
              ]}
              onPress={() => setSelectedPersonality(personality.id)}
            >
              <View style={styles.personalityContent}>
                <Text
                  style={[
                    styles.personalityName,
                    selectedPersonality === personality.id &&
                      styles.selectedPersonalityText,
                  ]}
                >
                  {personality.name}
                </Text>
                <Text
                  style={[
                    styles.personalityDescription,
                    selectedPersonality === personality.id &&
                      styles.selectedPersonalityDescription,
                  ]}
                >
                  {personality.description}
                </Text>
              </View>
              <View
                style={[
                  styles.radioCircle,
                  selectedPersonality === personality.id &&
                    styles.selectedRadio,
                ]}
              >
                {selectedPersonality === personality.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Parental Guidance Section */}
        <Card variant="default" padding="large" style={styles.section}>
          <View style={styles.switchRow}>
            <View style={styles.switchLeft}>
              <Text style={styles.sectionTitle}>家长指导</Text>
              <Text style={styles.sectionDescription}>
                启用内容过滤和安全互动
              </Text>
            </View>
            <Switch
              value={parentalGuidance}
              onValueChange={setParentalGuidance}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>
        </Card>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.xl,
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#333",
    borderRadius: 20,
  },
  saveText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  toyInfoCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: colors.primaryLight,
  },
  toyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toyCurrentName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "700" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  toySubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  toyStats: {
    alignItems: "flex-end",
  },
  batteryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  batteryText: {
    fontSize: typography.fontSizes.xs,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
    fontFamily: typography.fontFamily,
    fontWeight: "500" as const,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  statusText: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  section: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily,
  },
  sectionDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSizes.md,
    backgroundColor: colors.surfaceLight,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  personalityCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceLight,
  },
  selectedPersonality: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  personalityContent: {
    flex: 1,
  },
  personalityName: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  selectedPersonalityText: {
    color: colors.primary,
  },
  personalityDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  selectedPersonalityDescription: {
    color: colors.textSecondary,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: spacing.md,
  },
  selectedRadio: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLeft: {
    flex: 1,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});
