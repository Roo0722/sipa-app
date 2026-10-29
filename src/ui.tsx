import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import type { ComponentProps, ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, shared, spacing } from "./theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

export function ToolCard(props: { icon: IconName; title: string; subtitle: string; href: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.title}
      onPress={() => router.push(props.href as never)}
      style={({ pressed }) => [styles.toolCard, pressed && { opacity: 0.8 }]}
    >
      <View style={styles.toolIcon}>
        <Ionicons name={props.icon} size={24} color={colors.gold} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={shared.h2}>{props.title}</Text>
        <Text style={shared.muted}>{props.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </Pressable>
  );
}

export function PrimaryButton(props: { label: string; onPress: () => void; icon?: IconName; secondary?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={props.onPress}
      style={({ pressed }) => [
        styles.btn,
        props.secondary ? styles.btnSecondary : styles.btnPrimary,
        pressed && { opacity: 0.85 },
      ]}
    >
      {props.icon ? (
        <Ionicons name={props.icon} size={20} color={props.secondary ? colors.gold : colors.onBrand} />
      ) : null}
      <Text style={[styles.btnText, props.secondary && { color: colors.gold }]}>{props.label}</Text>
    </Pressable>
  );
}

export function Stepper(props: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const dec = () => props.onChange(Math.max(props.min, props.value - props.step));
  const inc = () => props.onChange(Math.min(props.max, props.value + props.step));
  return (
    <View style={[shared.card, styles.stepperRow]}>
      <Text style={[shared.h2, { flex: 1 }]}>{props.label}</Text>
      <Pressable accessibilityLabel={`Decrease ${props.label}`} onPress={dec} style={styles.stepBtn}>
        <Ionicons name="remove" size={22} color={colors.onSurface} />
      </Pressable>
      <Text style={styles.stepValue}>
        {props.value}
        {props.unit}
      </Text>
      <Pressable accessibilityLabel={`Increase ${props.label}`} onPress={inc} style={styles.stepBtn}>
        <Ionicons name="add" size={22} color={colors.onSurface} />
      </Pressable>
    </View>
  );
}

export function Section(props: { title: string; children: ReactNode }) {
  return (
    <View style={{ gap: spacing.sm }}>
      <Text style={shared.sectionLabel}>{props.title}</Text>
      {props.children}
    </View>
  );
}

export function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  toolCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  toolIcon: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: colors.brandSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    minHeight: 52,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xl,
  },
  btnPrimary: { backgroundColor: colors.brand },
  btnSecondary: { borderWidth: 1.5, borderColor: colors.gold },
  btnText: { color: colors.onBrand, fontSize: 16, fontWeight: "700" },
  stepperRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  stepValue: { color: colors.gold, fontSize: 20, fontWeight: "800", minWidth: 64, textAlign: "center" },
});
