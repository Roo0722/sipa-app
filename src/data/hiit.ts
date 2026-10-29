import type { Step } from "../types";

export type HiitConfig = { work: number; rest: number; rounds: number };

export const HIIT_DEFAULT: HiitConfig = { work: 30, rest: 15, rounds: 8 };

export const HIIT_PRESETS: { name: string; cfg: HiitConfig }[] = [
  { name: "Beginner", cfg: { work: 20, rest: 20, rounds: 6 } },
  { name: "Standard", cfg: { work: 30, rest: 15, rounds: 8 } },
  { name: "Hard", cfg: { work: 40, rest: 20, rounds: 10 } },
];

export function hiitSeconds(c: HiitConfig) {
  return 10 + c.rounds * c.work + (c.rounds - 1) * c.rest;
}

export function buildHiit(c: HiitConfig): Step[] {
  const steps: Step[] = [
    { id: "h-prep", title: "Get ready", detail: "HIIT starts shortly.", seconds: 10, kind: "prep", section: "HIIT" },
  ];
  for (let r = 1; r <= c.rounds; r++) {
    steps.push({ id: `h-w${r}`, title: `Round ${r} of ${c.rounds}`, detail: "Go hard!", seconds: c.work, kind: "work", section: "HIIT" });
    if (r < c.rounds) {
      steps.push({ id: `h-r${r}`, title: "Rest", detail: "Breathe and shake it out.", seconds: c.rest, kind: "rest", section: "HIIT" });
    }
  }
  return steps;
}
