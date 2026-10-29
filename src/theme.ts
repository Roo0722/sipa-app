// SIPA! design tokens: dark-first, red + gold on near-black.
import { StyleSheet } from "react-native";

export const colors = {
  surface: "#0a0a0c",
  onSurface: "#f5f2ea",
  card: "#141419",
  cardAlt: "#101014",
  muted: "rgba(245, 242, 234, 0.64)",
  finePrint: "rgba(245, 242, 234, 0.40)",
  brand: "#e0362c",
  onBrand: "#f5f2ea",
  gold: "#fcd116",
  onGold: "#0a0a0c",
  brandSoft: "rgba(224, 54, 44, 0.15)",
  success: "#34d399",
  border: "#2a2a2e",
  divider: "#1a1a20",
  left: "#60a5fa",
  right: "#fb923c",
  rest: "#34d399",
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 } as const;
export const radius = { sm: 6, md: 12, lg: 20, pill: 999 } as const;

export const shared = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl, gap: spacing.md },
  h1: { color: colors.onSurface, fontSize: 28, fontWeight: "800" },
  h2: { color: colors.onSurface, fontSize: 18, fontWeight: "700" },
  body: { color: colors.onSurface, fontSize: 15, lineHeight: 22 },
  muted: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  sectionLabel: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
});
