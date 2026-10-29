import type { Side, Step } from "../types";

// DRAFT CONTENT: 7 exercises, to be verified and optimised.
export type FlexExercise = { name: string; detail: string; seconds: number; bothSides: boolean };

export const flexExercises: FlexExercise[] = [
  { name: "Standing quad stretch", detail: "Heel to glute, knees together, hips tucked.", seconds: 30, bothSides: true },
  { name: "Seated hamstring stretch", detail: "One leg straight, reach toward the toes with a flat back.", seconds: 30, bothSides: true },
  { name: "Hip flexor lunge stretch", detail: "Back knee down, push the hips forward gently.", seconds: 30, bothSides: true },
  { name: "Butterfly stretch", detail: "Soles together, knees drop toward the floor.", seconds: 45, bothSides: false },
  { name: "Wide-leg (straddle) stretch", detail: "Legs wide, hinge forward from the hips.", seconds: 45, bothSides: false },
  { name: "Calf and ankle stretch", detail: "Hands on a wall, back heel pressed down.", seconds: 30, bothSides: true },
  { name: "Controlled high-kick swings", detail: "Hold a support. Swing the leg up smoothly, no bouncing.", seconds: 30, bothSides: true },
];

export function buildFlex(): Step[] {
  const steps: Step[] = [
    { id: "f-prep", title: "Get ready", detail: "Stretching starts shortly. Breathe slowly.", seconds: 5, kind: "prep", section: "Flexibility & Kicking" },
  ];
  flexExercises.forEach((e, i) => {
    const sides: Side[] = e.bothSides ? ["left", "right"] : ["both"];
    sides.forEach((side) =>
      steps.push({
        id: `f-${i}-${side}`,
        title: e.name,
        detail: e.detail,
        seconds: e.seconds,
        kind: "stretch",
        side: e.bothSides ? side : undefined,
        section: "Flexibility & Kicking",
      }),
    );
  });
  return steps;
}
