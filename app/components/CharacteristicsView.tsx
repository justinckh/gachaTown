import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../styles/colors";

interface Characteristic {
  uuid: string;
  isReadable: boolean;
  isWritableWithResponse: boolean;
  isWritableWithoutResponse: boolean;
  isNotifiable: boolean;
}

interface Service {
  serviceUUID: string;
  characteristics: Characteristic[];
}

interface CharacteristicsViewProps {
  onDiscoverCharacteristics: () => Promise<Service[]>;
  onWriteCharacteristic: (
    serviceUUID: string,
    characteristicUUID: string,
    value: string
  ) => Promise<void>;
}

const CharacteristicsView: React.FC<CharacteristicsViewProps> = ({
  onDiscoverCharacteristics,
  onWriteCharacteristic,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedChar, setSelectedChar] = useState<{
    serviceUUID: string;
    characteristic: Characteristic;
  } | null>(null);
  const [writeValue, setWriteValue] = useState("");

  const loadCharacteristics = async () => {
    try {
      setLoading(true);
      console.log("Starting characteristic discovery in view...");
      const discoveredServices = await onDiscoverCharacteristics();
      console.log("Received services in view:", discoveredServices.length);

      if (discoveredServices.length === 0) {
        Alert.alert(
          "No Services Found",
          "No BLE services were discovered on this device. Make sure the device is properly connected and has the expected services."
        );
      }

      setServices(discoveredServices);
    } catch (error) {
      console.error("Error in loadCharacteristics:", error);
      Alert.alert(
        "Error",
        "Failed to discover characteristics. Please try disconnecting and reconnecting to the device."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacteristics();
  }, []);

  const handleWrite = async (predefinedValue?: string) => {
    if (!selectedChar) {
      Alert.alert("Error", "Please select a characteristic first");
      return;
    }

    const valueToWrite = predefinedValue ?? writeValue;
    if (!valueToWrite) {
      Alert.alert("Error", "Please enter a value or use a predefined value");
      return;
    }

    try {
      setLoading(true);
      await onWriteCharacteristic(
        selectedChar.serviceUUID,
        selectedChar.characteristic.uuid,
        valueToWrite
      );
      Alert.alert("Success", "Value written successfully");
      if (!predefinedValue) {
        setWriteValue("");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to write value");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderCharacteristic = (
    characteristic: Characteristic,
    serviceUUID: string
  ) => {
    const isSelected =
      selectedChar?.characteristic.uuid === characteristic.uuid &&
      selectedChar?.serviceUUID === serviceUUID;

    const isWritable =
      characteristic.isWritableWithResponse ||
      characteristic.isWritableWithoutResponse;

    return (
      <TouchableOpacity
        key={characteristic.uuid}
        style={[
          styles.characteristicItem,
          isSelected && styles.selectedItem,
          isWritable && styles.writableCharacteristic,
        ]}
        onPress={() => setSelectedChar({ serviceUUID, characteristic })}
      >
        <View style={styles.characteristicHeader}>
          <Text style={styles.characteristicLabel}>Characteristic UUID:</Text>
          <Text style={styles.characteristicUUID}>{characteristic.uuid}</Text>
        </View>
        <View style={styles.propertiesContainer}>
          {characteristic.isReadable && (
            <Text style={[styles.property, styles.readableProperty]}>
              Readable
            </Text>
          )}
          {characteristic.isWritableWithResponse && (
            <Text style={[styles.property, styles.writableProperty]}>
              Write with Response
            </Text>
          )}
          {characteristic.isWritableWithoutResponse && (
            <Text style={[styles.property, styles.writableProperty]}>
              Write without Response
            </Text>
          )}
          {characteristic.isNotifiable && (
            <Text style={[styles.property, styles.notifiableProperty]}>
              Notifiable
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.servicesContainer}>
        {services.map((service) => (
          <View key={service.serviceUUID} style={styles.serviceContainer}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceLabel}>Service UUID:</Text>
              <Text style={styles.serviceUUID}>{service.serviceUUID}</Text>
            </View>
            <View style={styles.characteristicsContainer}>
              {service.characteristics.map((char) =>
                renderCharacteristic(char, service.serviceUUID)
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {selectedChar && (
        <View style={styles.writeContainer}>
          <Text style={styles.writeTitle}>Write to Characteristic</Text>
          <Text style={styles.selectedCharInfo}>
            Service: {selectedChar.serviceUUID}
            {"\n"}
            Characteristic: {selectedChar.characteristic.uuid}
          </Text>
          <View style={styles.writeInputContainer}>
            <TextInput
              style={styles.input}
              value={writeValue}
              onChangeText={setWriteValue}
              placeholder="Enter value to write"
              placeholderTextColor={colors.textSecondary}
            />
            <TouchableOpacity
              style={styles.writeButton}
              onPress={() => handleWrite()}
              disabled={!writeValue}
            >
              <Text style={styles.writeButtonText}>Write</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quickWriteContainer}>
            <TouchableOpacity
              style={[
                styles.quickWriteButton,
                { backgroundColor: colors.error },
              ]}
              onPress={() => handleWrite("0x0")}
            >
              <Text style={styles.quickWriteButtonText}>Write 0x0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.quickWriteButton,
                { backgroundColor: colors.success },
              ]}
              onPress={() => handleWrite("0x1")}
            >
              <Text style={styles.quickWriteButtonText}>Write 0x1</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  servicesContainer: {
    flex: 1,
  },
  serviceContainer: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  serviceHeader: {
    marginBottom: 8,
    padding: 4,
    backgroundColor: colors.background,
    borderRadius: 4,
  },
  serviceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  serviceUUID: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    fontFamily: "monospace",
  },
  characteristicsContainer: {
    marginLeft: 8,
  },
  characteristicItem: {
    padding: 8,
    marginVertical: 4,
    backgroundColor: colors.background,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  writableCharacteristic: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  selectedItem: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  characteristicHeader: {
    marginBottom: 4,
  },
  characteristicLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  characteristicUUID: {
    fontSize: 12,
    color: colors.textPrimary,
    fontFamily: "monospace",
  },
  propertiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  property: {
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  readableProperty: {
    backgroundColor: colors.success + "20",
    color: colors.success,
  },
  writableProperty: {
    backgroundColor: colors.primary + "20",
    color: colors.primary,
  },
  notifiableProperty: {
    backgroundColor: colors.warning + "20",
    color: colors.warning,
  },
  writeContainer: {
    padding: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  writeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  selectedCharInfo: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  writeInputContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 8,
    color: colors.textPrimary,
    fontSize: 14,
  },
  writeButton: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 6,
    justifyContent: "center",
    minWidth: 70,
    alignItems: "center",
  },
  writeButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  quickWriteContainer: {
    flexDirection: "row",
    gap: 8,
  },
  quickWriteButton: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  quickWriteButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default CharacteristicsView;
