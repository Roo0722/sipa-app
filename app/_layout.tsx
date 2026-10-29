import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { loadLog } from "../src/store";
import { colors } from "../src/theme";

export default function RootLayout() {
  useEffect(() => {
    loadLog();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.surface }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.onSurface,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: colors.surface },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="warmup" options={{ title: "Warm-Up Guide" }} />
        <Stack.Screen name="hiit" options={{ title: "HIIT Interval Timer" }} />
        <Stack.Screen name="flexibility" options={{ title: "Flexibility & Kicking" }} />
        <Stack.Screen name="whats-new" options={{ title: "What's New" }} />
        <Stack.Screen name="run" options={{ headerShown: false, gestureEnabled: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
