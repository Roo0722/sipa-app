import Constants from "expo-constants";
import { ScrollView, Text } from "react-native";
import { shared } from "../../src/theme";
import { ToolCard } from "../../src/ui";

export default function About() {
  return (
    <ScrollView style={shared.screen} contentContainerStyle={shared.content}>
      <Text style={shared.h1}>SIPA!</Text>
      <Text style={shared.muted}>A sepak takraw training guide · version {Constants.expoConfig?.version ?? "1.0.0"}</Text>
      <Text style={shared.body}>
        SIPA! is a free training companion for sepak takraw players. It works fully offline, has no accounts and
        collects no data. Your training log stays on your phone.
      </Text>
      <ToolCard icon="sparkles" title="What's New" subtitle="Release notes" href="/whats-new" />
    </ScrollView>
  );
}
