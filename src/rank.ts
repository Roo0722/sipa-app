import type { LogEntry } from "./store";
import { localDay } from "./store";

// English rank names only. Local-only until an online hub exists.
export const RANKS = [
  { name: "Rookie", xp: 0 },
  { name: "Apprentice", xp: 50 },
  { name: "Kicker", xp: 150 },
  { name: "Setter", xp: 350 },
  { name: "Striker", xp: 700 },
  { name: "Tekong", xp: 1200 },
  { name: "Master", xp: 2000 },
] as const;

export function rankFor(totalXp: number) {
  let i = 0;
  RANKS.forEach((r, idx) => {
    if (totalXp >= r.xp) i = idx;
  });
  const cur = RANKS[i];
  const next = RANKS[i + 1] ?? null;
  const progress = next ? (totalXp - cur.xp) / (next.xp - cur.xp) : 1;
  return { index: i, current: cur, next, progress };
}

export function streakDays(entries: LogEntry[]) {
  const days = new Set(entries.map((e) => e.day));
  const d = new Date();
  // Today may not be trained yet: start from yesterday in that case.
  if (!days.has(localDay(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(localDay(d))) {
    n += 1;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
