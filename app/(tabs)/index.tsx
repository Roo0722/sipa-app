import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { buildFlex } from "../../src/data/flexibility";
import { HIIT_DEFAULT, buildHiit } from "../../src/data/hiit";
import { buildWarmup } from "../../src/data/warmup";
import { rankFor, streakDays } from "../../src/rank";
import { useLog } from "../../src/store";
import { colors, shared, spacing } from "../../src/theme";
import { totalSeconds } from "../../src/StagePreview";
import { PrimaryButton, ToolCard } from "../../src/ui";

export default function Home() {
  const log = useLog();
  const xp = log.reduce((s, e) => s + e.xp, 0);
  const rank = rankFor(xp);
  const streak = streakDays(log);
  const fullMinutes = Math.round(
    (totalSeconds(buildWarmup()) + totalSeconds(buildHiit(HIIT_DEFAULT)) + totalSeconds(buildFlex())) / 60,
  );

  return (
    <ScrollView style={shared.screen} contentContainerStyle={shared.content}>
      <View>
        <Text style={shared.h1}>SIPA!</Text>
        <Text style={shared.muted}>A sepak takraw training guide</Text>
      </View>

      <View style={[shared.card, { gap: spacing.md, borderColor: colors.brand }]}>
        <Text style={shared.sectionLabel}>Full session</Text>
        <Text style={shared.h2}>Warm-up, HIIT, then stretch</Text>
        <Text style={shared.muted}>
          About {fullMinutes} minutes. Runs the three stages back to back, or start any stage on its own below.
        </Text>
        <PrimaryButton label="Start full session" icon="play" onPress={() => router.push("/run?kind=full" as never)} />
      </View>

      <Text style={shared.sectionLabel}>Start a stage</Text>
      <ToolCard icon="flame" title="Warm-Up Guide" subtitle="Step-by-step, with get-ready countdowns" href="/warmup" />
      <ToolCard icon="flash" title="HIIT Interval Timer" subtitle="Work and rest rounds you can adjust" href="/hiit" />
      <ToolCard icon="body" title="Flexibility & Kicking" subtitle="7 stretches and kicking-range drills" href="/flexibility" />

      <View style={[shared.card, { flexDirection: "row", justifyContent: "space-between" }]}>
        <View>
          <Text style={shared.muted}>Rank</Text>
          <Text style={shared.h2}>{rank.current.name}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={shared.muted}>Streak</Text>
          <Text style={shared.h2}>
            {streak} {streak === 1 ? "day" : "days"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
