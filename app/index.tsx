import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AccountScreen from "./components/AccountScreen";
import BluetoothScreen from "./components/BluetoothScreen";
import BottomNavigation from "./components/BottomNavigation";
import DailyQuestScreen from "./components/DailyQuestScreen";
import DiscoveryScreen from "./components/DiscoveryScreen";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import ToySettingsScreen from "./components/ToySettingsScreen";
import ToyStatusScreen from "./components/ToyStatusScreen";
import { useToys } from "./context/ToyContext";

type Screen =
  | "login"
  | "home"
  | "toySettings"
  | "toyStatus"
  | "discovery"
  | "quest"
  | "account"
  | "bluetooth";

interface ToyData {
  id: string;
  name: string;
  battery: string;
  status: string;
  personality: string;
  parentalGuidance: boolean;
}

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [selectedToyId, setSelectedToyId] = useState<string | null>(null);

  const { toys, updateToy } = useToys();

  const handleLogin = () => {
    setCurrentScreen("home");
  };

  const handleToySettings = (toyId: string) => {
    setSelectedToyId(toyId);
    setCurrentScreen("toySettings");
  };

  const handleToyPress = (toyId: string) => {
    setSelectedToyId(toyId);
    setCurrentScreen("toyStatus");
  };

  const handleDiscovery = () => {
    setCurrentScreen("discovery");
  };

  const handleAccount = () => {
    setCurrentScreen("account");
  };

  const handleQuest = () => {
    setCurrentScreen("quest");
  };

  const handleBluetooth = () => {
    setCurrentScreen("bluetooth");
  };

  const handleHome = () => {
    setCurrentScreen("home");
    setSelectedToyId(null);
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
    setSelectedToyId(null);
  };

  const handleSaveToySettings = (updatedSettings: {
    name: string;
    personality: string;
    parentalGuidance: boolean;
  }) => {
    if (selectedToyId) {
      updateToy(selectedToyId, updatedSettings);
      console.log("Saving toy settings for:", selectedToyId, updatedSettings);
    }
  };

  // Show login screen without navigation
  if (currentScreen === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Show toy settings screen without navigation
  if (currentScreen === "toySettings" && selectedToyId) {
    const selectedToy = toys.find((toy) => toy.id === selectedToyId);
    if (selectedToy) {
      return (
        <ToySettingsScreen
          toyData={selectedToy}
          onBack={handleBackToHome}
          onSave={handleSaveToySettings}
        />
      );
    }
  }

  // Show toy status screen without navigation
  if (currentScreen === "toyStatus" && selectedToyId) {
    const selectedToy = toys.find((toy) => toy.id === selectedToyId);
    if (selectedToy) {
      return (
        <ToyStatusScreen
          toyData={selectedToy}
          onBack={handleBackToHome}
          onSettings={() => handleToySettings(selectedToyId)}
        />
      );
    }
  }

  // Render main app with shared navigation
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {currentScreen === "home" && (
          <HomeScreen
            onToySettings={handleToySettings}
            onToyPress={handleToyPress}
            onDiscovery={handleDiscovery}
            onAccount={handleAccount}
          />
        )}
        {currentScreen === "discovery" && (
          <DiscoveryScreen onHome={handleHome} onAccount={handleAccount} />
        )}
        {currentScreen === "quest" && <DailyQuestScreen onBack={handleHome} />}
        {currentScreen === "account" && (
          <AccountScreen onHome={handleHome} onDiscovery={handleDiscovery} />
        )}
        {currentScreen === "bluetooth" && <BluetoothScreen />}
      </View>

      <BottomNavigation
        activeTab={
          currentScreen as
            | "home"
            | "discovery"
            | "quest"
            | "account"
            | "bluetooth"
        }
        onHome={handleHome}
        onDiscovery={handleDiscovery}
        onQuest={handleQuest}
        onAccount={handleAccount}
        onBluetooth={handleBluetooth}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  content: {
    flex: 1,
  },
});
