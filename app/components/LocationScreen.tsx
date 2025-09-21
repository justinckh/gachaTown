import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { colors, shadows } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";

const LocationScreen: React.FC = () => {
  // Placeholder state for demo purposes
  const [distance, setDistance] = useState("15m");
  const [direction, setDirection] = useState(45); // Degrees from north

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location Finder</Text>
        <Text style={styles.subtitle}>Find your destination</Text>
      </View>

      <View style={styles.mapContainer}>
        {/* Circular map background */}
        <View style={styles.mapCircle}>
          {/* Direction lines */}
          <View style={styles.directionLines}>
            <View style={[styles.directionLine, styles.northLine]} />
            <View style={[styles.directionLine, styles.eastLine]} />
            <View style={[styles.directionLine, styles.southLine]} />
            <View style={[styles.directionLine, styles.westLine]} />
          </View>
          
          {/* Cardinal directions */}
          <Text style={[styles.cardinalDirection, styles.northLabel]}>N</Text>
          <Text style={[styles.cardinalDirection, styles.eastLabel]}>E</Text>
          <Text style={[styles.cardinalDirection, styles.southLabel]}>S</Text>
          <Text style={[styles.cardinalDirection, styles.westLabel]}>W</Text>

          {/* Direction pointer */}
          <View style={[styles.pointer, { transform: [{ rotate: `${direction}deg` }] }]}>
            <Ionicons name="arrow-forward" size={40} color={colors.primary} />
          </View>
        </View>
      </View>

      {/* Distance indicator */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Distance to Destination</Text>
          <Text style={styles.infoValue}>{distance}</Text>
        </View>

        {/* Beacon status indicators */}
        <View style={styles.beaconContainer}>
          <View style={styles.beaconRow}>
            <View style={[styles.beaconIndicator, styles.beaconActive]} />
            <Text style={styles.beaconText}>Beacon 1 Connected</Text>
          </View>
          <View style={styles.beaconRow}>
            <View style={[styles.beaconIndicator, styles.beaconActive]} />
            <Text style={styles.beaconText}>Beacon 2 Connected</Text>
          </View>
          <View style={styles.beaconRow}>
            <View style={[styles.beaconIndicator, styles.beaconActive]} />
            <Text style={styles.beaconText}>Beacon 3 Connected</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.calibrateButton}>
          <Text style={styles.calibrateButtonText}>Calibrate Position</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mapCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.white,
    ...shadows.lg,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  directionLines: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  directionLine: {
    position: 'absolute',
    backgroundColor: colors.borderLight,
    width: 1,
    height: '100%',
    left: '50%',
  },
  northLine: {
    transform: [{ rotate: '0deg' }],
  },
  eastLine: {
    transform: [{ rotate: '90deg' }],
  },
  southLine: {
    transform: [{ rotate: '180deg' }],
  },
  westLine: {
    transform: [{ rotate: '270deg' }],
  },
  cardinalDirection: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  northLabel: {
    top: 10,
    color: colors.primary,
  },
  eastLabel: {
    right: 10,
  },
  southLabel: {
    bottom: 10,
  },
  westLabel: {
    left: 10,
  },
  pointer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    ...shadows.md,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  beaconContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    ...shadows.md,
    marginBottom: 20,
  },
  beaconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  beaconIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  beaconActive: {
    backgroundColor: colors.success,
  },
  beaconInactive: {
    backgroundColor: colors.textLight,
  },
  beaconText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  calibrateButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    ...shadows.sm,
  },
  calibrateButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LocationScreen;
