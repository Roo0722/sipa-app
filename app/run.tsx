import Ionicons from "@react-native-vector-icons/ionicons";
import { useKeepAwake } from "expo-keep-awake";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { buildFlex } from "../src/data/flexibility";
import { HIIT_DEFAULT, buildHiit } from "../src/data/hiit";
import { buildWarmup } from "../src/data/warmup";
import { addEntry } from "../src/store";
import { SideTag, sideColor, totalSeconds } from "../src/StagePreview";
import { colors, radius, shared, spacing } from "../src/theme";
import type { SessionKind, Step } from "../src/types";
import { PrimaryButton } from "../src/ui";
import { useSequence } from "../src/useSequence";

function num(v: string | string[] | undefined, fallback: number) {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : fallback;
}

export default function Run() {
  useKeepAwake();
  const p = useLocalSearchParams<{ kind?: string; work?: string; rest?: string; rounds?: string }>();
  const kind: SessionKind = (["warmup", "hiit", "flex", "full"] as const).find((k) => k === p.kind) ?? "warmup";

  const steps = useMemo<Step[]>(() => {
    const hiit = buildHiit({
      work: num(p.work, HIIT_DEFAULT.work),
      rest: num(p.rest, HIIT_DEFAULT.rest),
      rounds: num(p.rounds, HIIT_DEFAULT.rounds),
    });
    if (kind === "warmup") return buildWarmup();
    if (kind === "hiit") return hiit;
    if (kind === "flex") return buildFlex();
    // Full session: only the first stage keeps its get-ready step as a stage break.
    return [...buildWarmup(), ...hiit, ...buildFlex()];
  }, [kind, p.work, p.rest, p.rounds]);

  const insets = useSafeAreaInsets();
  const [saved, setSaved] = useState<{ xp: number } | null>(null);
  const savedOnce = useRef(false);

  const { index, remainingMs, running, finished, toggle, jump } = useSequence(steps, () => {
    if (savedOnce.current) return;
    savedOnce.current = true;
    addEntry(kind, totalSeconds(steps)).then((e) => setSaved({ xp: e.xp }));
  });

  const step = steps[index];
  const next = steps[index + 1];
  const secs = Math.ceil(remainingMs / 1000);
  const accent =
    step.kind === "work" ? colors.brand : step.kind === "prep" ? colors.gold : colors.rest;
  const elapsedBefore = steps.slice(0, index).reduce((s, x) => s + x.seconds, 0);
  const progress = Math.min(1, (elapsedBefore + step.seconds - remainingMs / 1000) / totalSeconds(steps));

  const confirmExit = () =>
    Alert.alert("End session?", "Progress for this session won't be saved.", [
      { text: "Keep going", style: "cancel" },
      { text: "End", style: "destructive", onPress: () => router.back() },
    ]);

  if (finished) {
    return (
      <View style={[shared.screen, styles.center, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Ionicons name="trophy" size={72} color={colors.gold} />
        <Text style={shared.h1}>Session complete</Text>
        <Text style={shared.muted}>{saved ? `+${saved.xp} XP added to your log` : "Saving…"}</Text>
        <View style={{ alignSelf: "stretch", paddingHorizontal: spacing.xl, marginTop: spacing.lg }}>
          <PrimaryButton label="Done" onPress={() => router.back()} />
        </View>
      </View>
    );
  }

  return (
    <View style={[shared.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + spacing.lg }]}>
      <View style={styles.topBar}>
        <Pressable accessibilityLabel="End session" onPress={confirmExit} hitSlop={12}>
          <Ionicons name="close" size={28} color={colors.onSurface} />
        </Pressable>
        <Text style={shared.muted}>
          {step.section} · {index + 1}/{steps.length}
        </Text>
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.bar}>
        <View style={{ height: 6, width: `${Math.round(progress * 100)}%`, backgroundColor: colors.gold }} />
      </View>

      <View style={styles.center}>
        <SideTag side={step.side} />
        <Text style={[styles.title, step.side && step.side !== "both" ? { color: sideColor[step.side] } : null]}>
          {step.title}
        </Text>
        {step.detail ? <Text style={[shared.muted, { textAlign: "center" }]}>{step.detail}</Text> : null}
        <Text style={[styles.clock, { color: accent }]}>{secs}</Text>
        {next ? (
          <Text style={shared.muted}>
            Next: {next.title}
            {next.side && next.side !== "both" ? ` (${next.side})` : ""}
          </Text>
        ) : (
          <Text style={shared.muted}>Last step</Text>
        )}
      </View>

      <View style={styles.controls}>
        <Pressable accessibilityLabel="Previous step" onPress={() => jump(-1)} style={styles.small}>
          <Ionicons name="play-skip-back" size={26} color={colors.onSurface} />
        </Pressable>
        <Pressable accessibilityLabel={running ? "Pause" : "Resume"} onPress={toggle} style={styles.big}>
          <Ionicons name={running ? "pause" : "play"} size={38} color={colors.onBrand} />
        </Pressable>
        <Pressable accessibilityLabel="Next step" onPress={() => jump(1)} style={styles.small}>
          <Ionicons name="play-skip-forward" size={26} color={colors.onSurface} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: spacing.lg },
  bar: { height: 6, backgroundColor: colors.card, marginHorizontal: spacing.lg, borderRadius: radius.pill, overflow: "hidden" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.md, padding: spacing.xl },
  title: { color: colors.onSurface, fontSize: 30, fontWeight: "800", textAlign: "center" },
  clock: { fontSize: 120, fontWeight: "800", fontVariant: ["tabular-nums"], lineHeight: 130 },
  controls: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.xxl },
  small: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  big: { width: 84, height: 84, borderRadius: radius.pill, backgroundColor: colors.brand, alignItems: "center", justifyContent: "center" },
});
