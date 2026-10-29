import { router } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { HIIT_DEFAULT, HIIT_PRESETS, hiitSeconds, type HiitConfig } from "../src/data/hiit";
import { getSetting, setSetting } from "../src/store";
import { colors, radius, shared, spacing } from "../src/theme";
import { PrimaryButton, Stepper, formatClock } from "../src/ui";

export default function Hiit() {
  useKeepAwake();
  const [cfg, setCfg] = useState<HiitConfig>(HIIT_DEFAULT);

  useEffect(() => {
    getSetting<HiitConfig>("hiit", HIIT_DEFAULT).then(setCfg);
  }, []);

  const update = (patch: Partial<HiitConfig>) => {
    const next = { ...cfg, ...patch };
    setCfg(next);
    setSetting("hiit", next);
  };

  return (
    <ScrollView style={shared.screen} contentContainerStyle={shared.content}>
      <Text style={shared.sectionLabel}>Presets</Text>
      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        {HIIT_PRESETS.map((p) => {
          const active = p.cfg.work === cfg.work && p.cfg.rest === cfg.rest && p.cfg.rounds === cfg.rounds;
          return (
            <Pressable
              key={p.name}
              onPress={() => update(p.cfg)}
              style={{
                flex: 1,
                alignItems: "center",
                padding: spacing.md,
                borderRadius: radius.pill,
                borderWidth: 1.5,
                borderColor: active ? colors.gold : colors.border,
                backgroundColor: active ? colors.brandSoft : colors.card,
              }}
            >
              <Text style={{ color: active ? colors.gold : colors.onSurface, fontWeight: "700" }}>{p.name}</Text>
            </Pressable>
          );
        })}
      </View>

      <Stepper label="Work" value={cfg.work} unit="s" min={5} max={180} step={5} onChange={(v) => update({ work: v })} />
      <Stepper label="Rest" value={cfg.rest} unit="s" min={5} max={180} step={5} onChange={(v) => update({ rest: v })} />
      <Stepper label="Rounds" value={cfg.rounds} unit="" min={1} max={30} step={1} onChange={(v) => update({ rounds: v })} />

      <Text style={shared.muted}>Total time: {formatClock(hiitSeconds(cfg))} including a 10 second countdown.</Text>
      <PrimaryButton
        label="Start"
        icon="play"
        onPress={() => router.push(`/run?kind=hiit&work=${cfg.work}&rest=${cfg.rest}&rounds=${cfg.rounds}` as never)}
      />
    </ScrollView>
  );
}
