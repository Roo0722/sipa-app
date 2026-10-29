import { ScrollView } from "react-native";
import { shared } from "../../src/theme";
import { Section, ToolCard } from "../../src/ui";

export default function Tools() {
  return (
    <ScrollView style={shared.screen} contentContainerStyle={shared.content}>
      <Section title="Training">
        <ToolCard icon="flame" title="Warm-Up Guide" subtitle="24 guided moves, colour-coded left and right" href="/warmup" />
        <ToolCard icon="flash" title="HIIT Interval Timer" subtitle="Presets or your own work, rest and rounds" href="/hiit" />
        <ToolCard icon="body" title="Flexibility & Kicking" subtitle="Stretches and kicking-range drills" href="/flexibility" />
      </Section>
      <Section title="Progress">
        <ToolCard icon="trophy" title="Training Log & Rank" subtitle="Your sessions, streak and rank" href="/log" />
      </Section>
    </ScrollView>
  );
}
