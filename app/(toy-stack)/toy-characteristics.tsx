import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CharacteristicsView from "../components/CharacteristicsView";
import { useBLE } from "../context/BLEContext";
import { useToys } from "../context/ToyContext";
import { colors } from "../styles/colors";

export default function ToyCharacteristicsScreen() {
  const router = useRouter();
  const { toyId } = useLocalSearchParams();
  const {
    discoverCharacteristics,
    writeCharacteristicValue,
    disconnectFromDevice,
  } = useBLE();
  const { removeToy } = useToys();

  const handleDisconnect = () => {
    Alert.alert("断开连接", "确定要断开连接并删除此玩具吗？", [
      {
        text: "取消",
        style: "cancel",
      },
      {
        text: "确定",
        style: "destructive",
        onPress: () => {
          disconnectFromDevice();
          if (toyId) {
            removeToy(toyId as string);
          }
          router.back();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CharacteristicsView
          onDiscoverCharacteristics={discoverCharacteristics}
          onWriteCharacteristic={writeCharacteristicValue}
        />
      </View>
      <TouchableOpacity
        style={styles.disconnectButton}
        onPress={handleDisconnect}
      >
        <Text style={styles.disconnectText}>断开连接</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  disconnectButton: {
    backgroundColor: colors.error,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  disconnectText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
