import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
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

const { width, height } = Dimensions.get("window");

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    console.log("Login pressed with email:", email);
    onLogin();
  };

  const handleSignUp = () => {
    console.log("Sign up pressed");
  };

  const handleWeChatLogin = () => {
    console.log("WeChat login pressed");
    onLogin();
  };

  const handleGoogleLogin = () => {
    console.log("Google login pressed");
    onLogin();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Top section with playful icon */}
        <View style={styles.topSection}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Ionicons
                name="sparkles"
                size={48}
                color={colors.textOnPrimary}
              />
            </View>

            <Text style={styles.welcomeText}>欢迎来到 GachaTown</Text>
            <Text style={styles.subtitleText}>与您的AI玩具朋友连接</Text>
          </View>
        </View>

        {/* Login form section */}
        <View style={styles.formSection}>
          <Text style={styles.title}>登录</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="输入您的邮箱"
                placeholderTextColor={colors.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <Button
            title="登录"
            onPress={handleLogin}
            variant="primary"
            size="large"
            fullWidth
            accessibilityHint="点击登录您的账户"
          />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>还没有账户？ </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>注册</Text>
            </TouchableOpacity>
          </View>

          {/* Social Login Section */}
          <View style={styles.socialLoginSection}>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>或者使用</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <Button
                title="微信"
                onPress={handleWeChatLogin}
                variant="outline"
                size="medium"
                icon="logo-wechat"
                accessibilityHint="使用微信登录"
              />

              <Button
                title="Google"
                onPress={handleGoogleLogin}
                variant="outline"
                size="medium"
                icon="logo-google"
                accessibilityHint="使用Google登录"
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: spacing.xxxl,
  },
  iconContainer: {
    alignItems: "center",
  },
  iconBackground: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  welcomeText: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: "700" as const,
    color: colors.textOnPrimary,
    textAlign: "center",
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily,
  },
  subtitleText: {
    fontSize: typography.fontSizes.md,
    color: colors.textOnPrimary,
    textAlign: "center",
    opacity: 0.9,
    fontFamily: typography.fontFamily,
  },
  formSection: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    minHeight: height * 0.55,
    ...shadows.lg,
  },
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: "700" as const,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    textAlign: "left",
    fontFamily: typography.fontFamily,
  },
  inputContainer: {
    marginBottom: spacing.xl,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    ...shadows.sm,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  signUpText: {
    color: colors.textSecondary,
    fontSize: typography.fontSizes.sm,
    fontFamily: typography.fontFamily,
  },
  signUpLink: {
    color: colors.primary,
    fontSize: typography.fontSizes.sm,
    fontWeight: "600" as const,
    fontFamily: typography.fontFamily,
  },
  socialLoginSection: {
    marginTop: spacing.lg,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: colors.textLight,
    fontSize: typography.fontSizes.sm,
    fontFamily: typography.fontFamily,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
});
