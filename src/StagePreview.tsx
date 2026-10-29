import { router } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";
import { ScrollView, Text, View } from "react-native";
import { colors, shared, spacing } from "./theme";
import type { Step } from "./types";
import { PrimaryButton, formatClock } from "./ui";

export const sideColor = { left: colors.left, right: colors.right, both: colors.gold } as const;

export function SideTag({ side }: { side?: "left" | "right" | "both" }) {
  if (!side || side === "both") return null;
  return (
    <Text style={{ color: sideColor[side], fontWeight: "800", fontSize: 12, textTransform: "uppercase" }}>
      {side}
    </Text>
  );
}

export function totalSeconds(steps: Step[]) {
  return steps.reduce((s, x) => s + x.seconds, 0);
}

export function StagePreview(props: { intro: string; steps: Step[]; startHref: string; header?: React.ReactNode }) {
  useKeepAwake();
  const list = props.steps.filter((s) => s.kind !== "prep");
  return (
    <ScrollView style={shared.screen} contentContainerStyle={shared.content}>
      {props.header}
      <Text style={shared.muted}>{props.intro}</Text>
      <Text style={shared.sectionLabel}>
        {list.length} steps · {formatClock(totalSeconds(props.steps))}
      </Text>
      {list.map((s, i) => (
        <View key={s.id} style={[shared.card, { padding: spacing.md, flexDirection: "row", gap: spacing.md }]}>
          <Text style={{ color: colors.muted, width: 24 }}>{i + 1}</Text>
          <View style={{ flex: 1 }}>
            <Text style={shared.body}>{s.title}</Text>
            {s.detail ? <Text style={shared.muted}>{s.detail}</Text> : null}
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <SideTag side={s.side} />
            <Text style={{ color: colors.gold, fontWeight: "700" }}>{s.seconds}s</Text>
          </View>
        </View>
      ))}
      <PrimaryButton label="Start" icon="play" onPress={() => router.push(props.startHref as never)} />
    </ScrollView>
  );
}
