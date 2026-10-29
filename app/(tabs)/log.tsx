import { Alert, ScrollView, Text, View } from "react-native";
import { RANKS, rankFor, streakDays } from "../../src/rank";
import { clearLog, useLog } from "../../src/store";
import { colors, radius, shared, spacing } from "../../src/theme";
import { PrimaryButton } from "../../src/ui";

const LABEL = { warmup: "Warm-Up", hiit: "HIIT", flex: "Flexibility & Kicking", full: "Full session" } as const;

export default function LogScreen() {
  const log = useLog();
  const xp = log.reduce((s, e) => s + e.xp, 0);
  const rank = rankFor(xp);
  const streak = streakDays(log);
  const minutes = log.reduce((s, e) => s + e.minutes, 0);

  return (
    <ScrollView style={shared.screen} contentContainerStyle={shared.content}>
      <View style={[shared.card, { gap: spacing.sm, alignItems: "center" }]}>
        {/* Placeholder emblem: swap for a real image later. */}
        <View
          style={{
            width: 88,
            height: 88,
            borderRadius: 44,
            backgroundColor: colors.brand,
            borderWidth: 3,
            borderColor: colors.gold,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: colors.gold, fontSize: 34, fontWeight: "800" }}>{rank.current.name[0]}</Text>
        </View>
        <Text style={shared.h1}>{rank.current.name}</Text>
        <Text style={shared.muted}>{xp} XP</Text>
        <View style={{ height: 10, alignSelf: "stretch", backgroundColor: colors.cardAlt, borderRadius: radius.pill, overflow: "hidden" }}>
          <View style={{ height: 10, width: `${Math.round(rank.progress * 100)}%`, backgroundColor: colors.gold }} />
        </View>
        <Text style={shared.muted}>
          {rank.next ? `${rank.next.xp - xp} XP to ${rank.next.name}` : "Top rank reached"}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <View style={[shared.card, { flex: 1 }]}>
          <Text style={shared.muted}>Streak</Text>
          <Text style={shared.h2}>{streak} {streak === 1 ? "day" : "days"}</Text>
        </View>
        <View style={[shared.card, { flex: 1 }]}>
          <Text style={shared.muted}>Sessions</Text>
          <Text style={shared.h2}>{log.length}</Text>
        </View>
        <View style={[shared.card, { flex: 1 }]}>
          <Text style={shared.muted}>Minutes</Text>
          <Text style={shared.h2}>{minutes}</Text>
        </View>
      </View>

      <Text style={shared.sectionLabel}>Ranks</Text>
      <Text style={shared.muted}>{RANKS.map((r) => `${r.name} ${r.xp}`).join("  ·  ")}</Text>

      <Text style={shared.sectionLabel}>History</Text>
      {log.length === 0 ? (
        <Text style={shared.muted}>No sessions yet. Finish a stage to earn XP. Your log stays on this phone.</Text>
      ) : (
        log.slice(0, 50).map((e) => (
          <View key={e.id} style={[shared.card, { flexDirection: "row", justifyContent: "space-between", padding: spacing.md }]}>
            <View>
              <Text style={shared.body}>{LABEL[e.kind]}</Text>
              <Text style={shared.muted}>{e.day} · {e.minutes} min</Text>
            </View>
            <Text style={{ color: colors.gold, fontWeight: "700" }}>+{e.xp} XP</Text>
          </View>
        ))
      )}

      {log.length > 0 ? (
        <PrimaryButton
          secondary
          label="Reset log"
          onPress={() =>
            Alert.alert("Reset log?", "This deletes your sessions, XP and streak from this phone.", [
              { text: "Cancel", style: "cancel" },
              { text: "Reset", style: "destructive", onPress: () => clearLog() },
            ])
          }
        />
      ) : null}
    </ScrollView>
  );
}
