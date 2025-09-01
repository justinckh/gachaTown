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
import useBLE from "../hooks/useBLE";
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

const BluetoothScreen: React.FC = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    isScanning,
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

  const handleConnectToDevice = (device: Device) => {
    connectToDevice(device);
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
      <View style={styles.header}>
        <Text style={styles.title}>Bluetooth Devices</Text>
        {connectedDevice && (
          <View style={styles.connectedInfo}>
            <Text style={styles.connectedLabel}>Connected to:</Text>
            <Text style={styles.connectedDeviceName}>
              {connectedDevice.name || "Unknown Device"}
            </Text>
            <TouchableOpacity
              style={styles.disconnectButton}
              onPress={disconnectFromDevice}
            >
              <Text style={styles.disconnectButtonText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 10,
  },
  connectedInfo: {
    backgroundColor: colors.success + "20",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  connectedLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  connectedDeviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.success,
    marginBottom: 10,
  },
  disconnectButton: {
    backgroundColor: colors.error,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  disconnectButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  controls: {
    padding: 20,
  },
  scanButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
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
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  deviceItem: {
    backgroundColor: colors.white,
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  connectedDevice: {
    backgroundColor: colors.success + "10",
    borderColor: colors.success,
    borderWidth: 2,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  deviceId: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  deviceRssi: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  deviceStatus: {
    alignItems: "flex-end",
  },
  connectedText: {
    color: colors.success,
    fontSize: 14,
    fontWeight: "600",
  },
  connectText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default BluetoothScreen;
