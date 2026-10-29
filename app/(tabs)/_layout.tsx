import Ionicons from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import { colors } from "../../src/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.onSurface,
        sceneStyle: { backgroundColor: colors.surface },
        tabBarStyle: { backgroundColor: colors.cardAlt, borderTopColor: colors.divider },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.muted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="tools"
        options={{ title: "Tools", tabBarIcon: ({ color, size }) => <Ionicons name="construct" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="log"
        options={{ title: "Log & Rank", tabBarIcon: ({ color, size }) => <Ionicons name="trophy" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="about"
        options={{ title: "About", tabBarIcon: ({ color, size }) => <Ionicons name="information-circle" color={color} size={size} /> }}
      />
    </Tabs>
  );
}
