export type StepKind = "prep" | "work" | "rest" | "stretch";
export type Side = "left" | "right" | "both";

export type Step = {
  id: string;
  title: string;
  detail?: string;
  seconds: number;
  kind: StepKind;
  side?: Side;
  section?: string;
};

export type SessionKind = "warmup" | "hiit" | "flex" | "full";
