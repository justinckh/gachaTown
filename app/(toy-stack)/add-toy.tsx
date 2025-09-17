import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Device } from "react-native-ble-plx";
import CharacteristicsView from "../components/CharacteristicsView";
import { useBLE } from "../context/BLEContext";
import { useToys } from "../context/ToyContext";
import { colors } from "../styles/colors";

interface DeviceListItemProps {
  device: Device;
  onConnect: (device: Device) => void;
  isConnected: boolean;
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({
  device,
  onConnect,
  isConnected,
}) => {
  return (
    <TouchableOpacity
      style={[styles.deviceItem, isConnected && styles.connectedDevice]}
      onPress={() => onConnect(device)}
      disabled={isConnected}
    >
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{device.name || "Unknown Device"}</Text>
        <Text style={styles.deviceId}>ID: {device.id}</Text>
        <Text style={styles.deviceRssi}>RSSI: {device.rssi} dBm</Text>
      </View>
      <View style={styles.deviceStatus}>
        {isConnected ? (
          <Text style={styles.connectedText}>Connected</Text>
        ) : (
          <Text style={styles.connectText}>Tap to Connect</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function AddToyScreen() {
  const router = useRouter();
  const { addToy } = useToys();
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    isScanning,
    discoverCharacteristics,
    writeCharacteristicValue,
  } = useBLE();

  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(() => {
    const initializeBLE = async () => {
      const permissionsGranted = await requestPermissions();
      setHasPermissions(permissionsGranted);

      if (!permissionsGranted) {
        Alert.alert(
          "Permissions Required",
          "Bluetooth and Location permissions are required to scan for devices.",
          [{ text: "OK" }]
        );
      }
    };

    initializeBLE();
  }, [requestPermissions]);

  const handleScanForDevices = () => {
    if (!hasPermissions) {
      Alert.alert(
        "Permissions Required",
        "Please grant Bluetooth and Location permissions first."
      );
      return;
    }
    scanForPeripherals();
  };

  const handleConnectToDevice = async (device: Device) => {
    try {
      const connected = await connectToDevice(device);
      console.log("Connection result:", connected);

      if (connected) {
        // Create a new toy object
        const newToy = {
          id: device.id,
          name: device.name || "Unknown Device",
          battery: "100%",
          status: "Active",
          personality: "friendly",
          parentalGuidance: true,
          isNewlyConnected: true,
        };

        console.log("Adding new toy:", newToy);
        addToy(newToy);

        // Navigate back to home screen
        if (router.canGoBack()) {
          router.back();
        }
      }
    } catch (error) {
      console.error("Error connecting to device:", error);
      Alert.alert(
        "Connection Error",
        "Failed to connect to the device. Please try again."
      );
    }
  };

  const renderDeviceItem = ({ item }: { item: Device }) => (
    <DeviceListItem
      device={item}
      onConnect={handleConnectToDevice}
      isConnected={connectedDevice?.id === item.id}
    />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {isScanning ? "Scanning for devices..." : "No devices found"}
      </Text>
      <Text style={styles.emptySubtext}>
        {isScanning
          ? "Make sure your Bluetooth device is discoverable"
          : 'Tap "Scan for Devices" to start scanning'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {!connectedDevice ? (
        <>
          <View style={styles.controls}>
            <TouchableOpacity
              style={[
                styles.scanButton,
                isScanning && styles.scanButtonDisabled,
              ]}
              onPress={handleScanForDevices}
              disabled={isScanning}
            >
              {isScanning ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : null}
              <Text style={styles.scanButtonText}>
                {isScanning ? "Scanning..." : "Scan for Devices"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.connectedHeader}>
          <View style={styles.connectedInfo}>
            <Text style={styles.connectedDeviceName}>
              {connectedDevice.name || "Unknown Device"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.disconnectButton}
            onPress={disconnectFromDevice}
          >
            <Text style={styles.disconnectButtonText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      )}

      {!connectedDevice ? (
        <FlatList
          data={allDevices}
          keyExtractor={(item) => item.id}
          renderItem={renderDeviceItem}
          ListEmptyComponent={renderEmptyList}
          refreshControl={
            <RefreshControl
              refreshing={isScanning}
              onRefresh={handleScanForDevices}
              tintColor={colors.primary}
            />
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <CharacteristicsView
          onDiscoverCharacteristics={discoverCharacteristics}
          onWriteCharacteristic={writeCharacteristicValue}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  connectedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: colors.success + "10",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  connectedInfo: {
    flex: 1,
  },
  connectedDeviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.success,
  },
  disconnectButton: {
    backgroundColor: colors.error,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  disconnectButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  controls: {
    padding: 16,
  },
  scanButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scanButtonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  scanButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  deviceItem: {
    backgroundColor: colors.white,
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  connectedDevice: {
    backgroundColor: colors.success + "10",
    borderColor: colors.success,
    borderWidth: 1,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 2,
  },
  deviceId: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  deviceRssi: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  deviceStatus: {
    alignItems: "flex-end",
  },
  connectedText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "600",
  },
  connectText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
});
