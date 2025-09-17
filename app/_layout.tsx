import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { BLEProvider } from "./context/BLEContext";
import { ToyProvider } from "./context/ToyContext";

export default function RootLayout() {
  return (
    <BLEProvider>
      <ToyProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(toy-stack)/add-toy"
            options={{
              title: "添加玩具",
              headerShown: true,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="(toy-stack)/toy-characteristics"
            options={{
              title: "玩具设置",
              headerShown: true,
            }}
          />
        </Stack>
      </ToyProvider>
    </BLEProvider>
  );
}
