import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { BleError, BleManager, Device, State } from "react-native-ble-plx";

interface BLEContextType {
  requestPermissions: () => Promise<boolean>;
  scanForPeripherals: () => void;
  connectToDevice: (device: Device) => Promise<boolean>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  isScanning: boolean;
  discoverCharacteristics: () => Promise<
    Array<{
      serviceUUID: string;
      characteristics: Array<{
        uuid: string;
        isReadable: boolean;
        isWritableWithResponse: boolean;
        isWritableWithoutResponse: boolean;
        isNotifiable: boolean;
      }>;
    }>
  >;
  writeCharacteristicValue: (
    serviceUUID: string,
    characteristicUUID: string,
    value: string
  ) => Promise<void>;
}

const BLEContext = createContext<BLEContextType | undefined>(undefined);

export function BLEProvider({ children }: { children: React.ReactNode }) {
  const bleManager = useMemo(() => {
    try {
      return new BleManager();
    } catch (error) {
      console.error("Failed to initialize BleManager:", error);
      return null;
    }
  }, []);

  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((Platform.Version ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();
        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = useCallback(() => {
    if (!bleManager) {
      console.error("BLE Manager not initialized");
      Alert.alert(
        "Error",
        "Bluetooth is not initialized. Please restart the app."
      );
      return;
    }

    bleManager.onStateChange((state) => {
      if (state === State.PoweredOn) {
        setIsScanning(true);
        try {
          bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
              console.log("Scan error:", error);
              setIsScanning(false);
              return;
            }
            if (device && device.name) {
              setAllDevices((prevState: Device[]) => {
                if (!isDuplicateDevice(prevState, device)) {
                  return [...prevState, device];
                }
                return prevState;
              });
            }
          });

          // Stop scanning after 10 seconds
          setTimeout(() => {
            if (bleManager) {
              bleManager.stopDeviceScan();
              setIsScanning(false);
            }
          }, 10000);
        } catch (error) {
          console.error("Error starting device scan:", error);
          setIsScanning(false);
          Alert.alert("Error", "Failed to start scanning for devices.");
        }
      }
    }, true);
  }, [bleManager]);

  const connectToDevice = async (device: Device): Promise<boolean> => {
    if (!bleManager) {
      console.error("BLE Manager not initialized");
      Alert.alert(
        "Error",
        "Bluetooth is not initialized. Please restart the app."
      );
      return false;
    }

    try {
      console.log("Starting connection to device:", device.id);
      const deviceConnection = await bleManager.connectToDevice(device.id, {
        requestMTU: 512,
      });
      console.log("Connected to device");

      console.log("Discovering services and characteristics...");
      await deviceConnection.discoverAllServicesAndCharacteristics();
      console.log("Discovery completed");

      setConnectedDevice(deviceConnection);
      bleManager.stopDeviceScan();
      setIsScanning(false);

      // Monitor connection state
      deviceConnection.onDisconnected(
        (error: BleError | null, device: Device | null) => {
          console.log("Device disconnected:", device?.name);
          setConnectedDevice(null);
          if (error) {
            console.log("Disconnect error:", error);
          }
        }
      );

      Alert.alert("Connected", `Successfully connected to ${device.name}`);
      return true;
    } catch (e) {
      console.error("FAILED TO CONNECT", e);
      setConnectedDevice(null);
      Alert.alert("Connection Failed", "Could not connect to the device");
      return false;
    }
  };

  const disconnectFromDevice = () => {
    if (!bleManager) {
      console.error("BLE Manager not initialized");
      return;
    }

    if (connectedDevice) {
      try {
        bleManager.cancelDeviceConnection(connectedDevice.id);
        setConnectedDevice(null);
        Alert.alert("Disconnected", "Device has been disconnected");
      } catch (error) {
        console.error("Error disconnecting from device:", error);
        Alert.alert("Error", "Failed to disconnect from device");
      }
    }
  };

  const discoverCharacteristics = async () => {
    if (!bleManager || !connectedDevice) {
      throw new Error("No device connected");
    }

    try {
      console.log("Starting service discovery...");
      const services = await connectedDevice.services();
      console.log(
        "Found services:",
        services.map((s) => s.uuid)
      );

      const servicesWithCharacteristics = await Promise.all(
        services.map(async (service) => {
          console.log(
            `Discovering characteristics for service: ${service.uuid}`
          );
          const characteristics = await service.characteristics();
          console.log(
            `Found characteristics for ${service.uuid}:`,
            characteristics.map((c) => c.uuid)
          );
          return {
            serviceUUID: service.uuid,
            characteristics: characteristics.map((char) => ({
              uuid: char.uuid,
              isReadable: char.isReadable,
              isWritableWithResponse: char.isWritableWithResponse,
              isWritableWithoutResponse: char.isWritableWithoutResponse,
              isNotifiable: char.isNotifiable,
            })),
          };
        })
      );
      console.log(
        "All services and characteristics:",
        JSON.stringify(servicesWithCharacteristics, null, 2)
      );
      return servicesWithCharacteristics;
    } catch (error) {
      console.error("Error discovering characteristics:", error);
      throw error;
    }
  };

  const writeCharacteristicValue = async (
    serviceUUID: string,
    characteristicUUID: string,
    value: string
  ) => {
    if (!bleManager || !connectedDevice) {
      throw new Error("No device connected");
    }

    try {
      const service = await connectedDevice.services();
      const targetService = service.find((s) => s.uuid === serviceUUID);
      if (!targetService) {
        throw new Error(`Service ${serviceUUID} not found`);
      }

      const characteristics = await targetService.characteristics();
      const targetChar = characteristics.find(
        (c) => c.uuid === characteristicUUID
      );
      if (!targetChar) {
        throw new Error(`Characteristic ${characteristicUUID} not found`);
      }

      // Convert hex string or regular string to base64
      let base64Value;
      if (value.startsWith("0x")) {
        // Handle hex values
        const hexValue = value.slice(2); // Remove '0x' prefix
        const number = parseInt(hexValue, 16);
        if (isNaN(number)) {
          throw new Error("Invalid hex value");
        }
        // Convert to single byte
        const uint8 = new Uint8Array([number]);
        base64Value = btoa(String.fromCharCode.apply(null, uint8));
      } else {
        // Handle regular strings
        base64Value = btoa(value);
      }

      console.log(`Writing value: ${value}`);
      console.log(
        `As number: ${
          value.startsWith("0x") ? parseInt(value.slice(2), 16) : "N/A"
        }`
      );
      console.log(`Base64 encoded: ${base64Value}`);

      if (targetChar.isWritableWithResponse) {
        await targetChar.writeWithResponse(base64Value);
        console.log("Write with response completed");
      } else if (targetChar.isWritableWithoutResponse) {
        await targetChar.writeWithoutResponse(base64Value);
        console.log("Write without response completed");
      } else {
        throw new Error("Characteristic is not writable");
      }
    } catch (error) {
      console.error("Error writing to characteristic:", error);
      throw error;
    }
  };

  return (
    <BLEContext.Provider
      value={{
        scanForPeripherals,
        requestPermissions,
        connectToDevice,
        allDevices,
        connectedDevice,
        disconnectFromDevice,
        isScanning,
        discoverCharacteristics,
        writeCharacteristicValue,
      }}
    >
      {children}
    </BLEContext.Provider>
  );
}

export function useBLE() {
  const context = useContext(BLEContext);
  if (context === undefined) {
    throw new Error("useBLE must be used within a BLEProvider");
  }
  return context;
}

