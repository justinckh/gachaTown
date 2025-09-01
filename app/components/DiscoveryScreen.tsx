import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
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
import Card from "./common/Card";

const { width, height } = Dimensions.get("window");

interface DiscoveryScreenProps {
  onHome: () => void;
  onAccount: () => void;
}

// Enhanced mock data for nearby shops
const nearbyShops = [
  {
    id: "1",
    name: "梦幻玩具城",
    address: "彩虹街123号，市中心",
    distance: "0.5 km",
    rating: 4.8,
    type: "玩具店",
    isOpen: true,
    coordinates: { x: 120, y: 150 },
    category: "premium",
  },
  {
    id: "2",
    name: "智慧玩具坊",
    address: "科技大道456号，中央区",
    distance: "1.2 km",
    rating: 4.6,
    type: "电子产品",
    isOpen: true,
    coordinates: { x: 200, y: 220 },
    category: "tech",
  },
  {
    id: "3",
    name: "童心乐园",
    address: "欢乐路789号，北区",
    distance: "2.1 km",
    rating: 4.9,
    type: "玩具店",
    isOpen: false,
    coordinates: { x: 80, y: 300 },
    category: "family",
  },
  {
    id: "4",
    name: "机器人王国",
    address: "未来大街321号，南区",
    distance: "1.8 km",
    rating: 4.7,
    type: "专门店",
    isOpen: true,
    coordinates: { x: 280, y: 180 },
    category: "specialty",
  },
  {
    id: "5",
    name: "AI伙伴屋",
    address: "星空巷654号，西区",
    distance: "3.2 km",
    rating: 4.5,
    type: "AI玩具",
    isOpen: true,
    coordinates: { x: 50, y: 100 },
    category: "ai",
  },
];

export default function DiscoveryScreen({
  onHome,
  onAccount,
}: DiscoveryScreenProps) {
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShops = nearbyShops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors_map = {
      premium: colors.accent,
      tech: colors.info,
      family: colors.secondary,
      specialty: colors.primary,
      ai: colors.warning,
    };
    return colors_map[category as keyof typeof colors_map] || colors.primary;
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
            <Text style={styles.headerTitle}>发现</Text>
            <Text style={styles.headerSubtitle}>寻找附近的玩具店</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color={colors.textOnPrimary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索玩具店、品牌..."
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={colors.textLight}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Map Area */}
        <Card variant="elevated" padding="none" style={styles.mapCard}>
          <View style={styles.mapContainer}>
            <View style={styles.mapBackground}>
              {/* Map Background Grid */}
              <View style={styles.mapGrid}>
                {Array.from({ length: 8 }, (_, i) => (
                  <View
                    key={`h-${i}`}
                    style={[styles.gridLine, { top: i * 50 }]}
                  />
                ))}
                {Array.from({ length: 6 }, (_, i) => (
                  <View
                    key={`v-${i}`}
                    style={[styles.gridLineVertical, { left: i * 60 }]}
                  />
                ))}
              </View>

              {/* User Location */}
              <View style={styles.userLocation}>
                <View style={styles.userLocationDot} />
                <Text style={styles.userLocationText}>You</Text>
              </View>

              {/* Shop Markers */}
              {filteredShops.map((shop) => (
                <TouchableOpacity
                  key={shop.id}
                  style={[
                    styles.shopMarker,
                    { left: shop.coordinates.x, top: shop.coordinates.y },
                    selectedShop === shop.id && styles.selectedMarker,
                  ]}
                  onPress={() =>
                    setSelectedShop(selectedShop === shop.id ? null : shop.id)
                  }
                >
                  <View
                    style={[
                      styles.markerDot,
                      { backgroundColor: getCategoryColor(shop.category) },
                      !shop.isOpen && styles.markerClosed,
                    ]}
                  >
                    <Ionicons
                      name="storefront"
                      size={14}
                      color={colors.textOnPrimary}
                    />
                  </View>
                  {selectedShop === shop.id && (
                    <View style={styles.markerLabel}>
                      <Text style={styles.markerLabelText}>{shop.name}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        {/* Quick Filters */}
        <View style={styles.filtersSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersList}>
              {["全部", "营业中", "市中心", "北区", "南区"].map(
                (filter, index) => (
                  <Button
                    key={filter}
                    title={filter}
                    onPress={() => {}}
                    variant={index === 0 ? "primary" : "outline"}
                    size="small"
                  />
                )
              )}
            </View>
          </ScrollView>
        </View>

        {/* Shop List */}
        <View style={styles.shopListContainer}>
          <View style={styles.shopListHeader}>
            <Text style={styles.shopListTitle}>
              附近商店 ({filteredShops.length})
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>查看全部</Text>
            </TouchableOpacity>
          </View>

          {filteredShops.map((shop) => (
            <Card
              key={shop.id}
              variant="default"
              padding="medium"
              style={{
                ...styles.shopCard,
                ...(selectedShop === shop.id ? styles.selectedShopCard : {}),
              }}
              onPress={() =>
                setSelectedShop(selectedShop === shop.id ? null : shop.id)
              }
            >
              <View style={styles.shopCardContent}>
                <View style={styles.shopCardLeft}>
                  <View style={styles.shopCardHeader}>
                    <Text style={styles.shopName}>{shop.name}</Text>
                    <View
                      style={[
                        styles.shopStatus,
                        {
                          backgroundColor: shop.isOpen
                            ? colors.success
                            : colors.error,
                        },
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {shop.isOpen ? "营业中" : "已关闭"}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.shopAddress}>{shop.address}</Text>

                  <View style={styles.shopMeta}>
                    <View style={styles.shopRating}>
                      <Ionicons name="star" size={14} color={colors.warning} />
                      <Text style={styles.ratingText}>{shop.rating}</Text>
                    </View>
                    <View
                      style={[
                        styles.shopTypeTag,
                        { backgroundColor: getCategoryColor(shop.category) },
                      ]}
                    >
                      <Text style={styles.shopType}>{shop.type}</Text>
                    </View>
                    <Text style={styles.shopDistance}>{shop.distance}</Text>
                  </View>
                </View>

                <View style={styles.shopCardRight}>
                  <TouchableOpacity style={styles.directionsButton}>
                    <Ionicons
                      name="navigate"
                      size={18}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons
                      name="heart-outline"
                      size={18}
                      color={colors.textLight}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ))}
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
  headerTitle: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: "700" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  headerSubtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    marginTop: spacing.xs,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.sm,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...shadows.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSizes.md,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    paddingVertical: spacing.sm,
  },
  mapCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  mapContainer: {
    height: height * 0.3,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },
  mapBackground: {
    flex: 1,
    backgroundColor: colors.secondaryLight,
    position: "relative",
  },
  mapGrid: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  gridLineVertical: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  userLocation: {
    position: "absolute",
    left: width * 0.4,
    top: height * 0.15,
    alignItems: "center",
  },
  userLocationDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.info,
    borderWidth: 3,
    borderColor: colors.surface,
    ...shadows.md,
  },
  userLocationText: {
    fontSize: typography.fontSizes.xs,
    color: colors.textPrimary,
    marginTop: spacing.xs,
    fontWeight: "600" as const,
    fontFamily: typography.fontFamily,
  },
  shopMarker: {
    position: "absolute",
    alignItems: "center",
  },
  selectedMarker: {
    zIndex: 10,
  },
  markerDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.surface,
    ...shadows.md,
  },
  markerClosed: {
    opacity: 0.6,
  },
  markerLabel: {
    marginTop: spacing.xs,
    backgroundColor: colors.textPrimary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    ...shadows.sm,
  },
  markerLabelText: {
    color: colors.textOnPrimary,
    fontSize: typography.fontSizes.xs,
    fontWeight: "600" as const,
    fontFamily: typography.fontFamily,
  },
  filtersSection: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  filtersList: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  filterChip: {
    marginRight: spacing.sm,
  },
  shopListContainer: {
    paddingHorizontal: spacing.lg,
  },
  shopListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  shopListTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  viewAllText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: "500" as const,
    fontFamily: typography.fontFamily,
  },
  shopCard: {
    marginBottom: spacing.md,
  },
  selectedShopCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  shopCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  shopCardLeft: {
    flex: 1,
  },
  shopCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  shopName: {
    fontSize: typography.fontSizes.md,
    fontWeight: "600" as const,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    flex: 1,
  },
  shopStatus: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  statusText: {
    fontSize: typography.fontSizes.xs,
    color: colors.textOnPrimary,
    fontWeight: "500" as const,
    fontFamily: typography.fontFamily,
  },
  shopAddress: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily,
  },
  shopMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  shopRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  ratingText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  shopTypeTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  shopType: {
    fontSize: typography.fontSizes.xs,
    color: colors.textOnPrimary,
    fontWeight: "500" as const,
    fontFamily: typography.fontFamily,
  },
  shopDistance: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  shopCardRight: {
    alignItems: "center",
    gap: spacing.sm,
    marginLeft: spacing.md,
  },
  directionsButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.sm,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.sm,
  },
});
