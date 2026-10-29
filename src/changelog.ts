// Newest first. Every release needs a new entry at the top with a unique id.
export type ChangeEntry = { id: string; version: string; date: string; items: string[] };

export const changelog: ChangeEntry[] = [
  {
    id: "1.0.0",
    version: "1.0.0",
    date: "2026-10-28",
    items: [
      "First SIPA! release: training only, works fully offline.",
      "Warm-Up Guide, HIIT Interval Timer and Flexibility & Kicking.",
      "Full session mode: warm-up, HIIT and stretching in one go.",
      "Training Log & Rank, stored on your phone only.",
    ],
  },
];
