import type { Side, Step } from "../types";

// DRAFT CONTENT: structure is final, exercise list and timings are to be optimised.
type Move = { title: string; detail: string; seconds: number; side?: Side; section: string };

export const warmupMoves: Move[] = [
  { section: "Raise", title: "Easy jog on the spot", detail: "Light bounce, relaxed shoulders.", seconds: 60 },
  { section: "Raise", title: "Jumping jacks", detail: "Land softly on the balls of your feet.", seconds: 40 },
  { section: "Raise", title: "High knees", detail: "Drive the knees up to hip height.", seconds: 30 },
  { section: "Raise", title: "Butt kicks", detail: "Heels toward the glutes, stay tall.", seconds: 30 },
  { section: "Mobilise", title: "Neck half-circles", detail: "Slow and gentle, no full backward rolls.", seconds: 20 },
  { section: "Mobilise", title: "Arm circles forward", detail: "Big circles, shoulders loose.", seconds: 20, side: "both" },
  { section: "Mobilise", title: "Arm circles backward", detail: "Reverse the direction.", seconds: 20, side: "both" },
  { section: "Mobilise", title: "Torso twists", detail: "Hips forward, rotate through the upper body.", seconds: 30 },
  { section: "Mobilise", title: "Hip circles clockwise", detail: "Hands on hips, draw wide circles.", seconds: 20 },
  { section: "Mobilise", title: "Hip circles anticlockwise", detail: "Reverse the direction.", seconds: 20 },
  { section: "Legs", title: "Front leg swings", detail: "Hold a wall if needed. Swing forward and back.", seconds: 20, side: "left" },
  { section: "Legs", title: "Front leg swings", detail: "Swap legs.", seconds: 20, side: "right" },
  { section: "Legs", title: "Side leg swings", detail: "Swing across the body and out to the side.", seconds: 20, side: "left" },
  { section: "Legs", title: "Side leg swings", detail: "Swap legs.", seconds: 20, side: "right" },
  { section: "Legs", title: "Ankle circles", detail: "Toe on the floor, rotate the ankle.", seconds: 15, side: "left" },
  { section: "Legs", title: "Ankle circles", detail: "Swap legs.", seconds: 15, side: "right" },
  { section: "Legs", title: "Bodyweight squats", detail: "Chest up, knees track over the toes.", seconds: 30 },
  { section: "Legs", title: "Lunge with twist", detail: "Step forward, rotate toward the front leg.", seconds: 30, side: "left" },
  { section: "Legs", title: "Lunge with twist", detail: "Swap legs.", seconds: 30, side: "right" },
  { section: "Activate", title: "Side shuffles", detail: "Low stance, quick feet, stay on the toes.", seconds: 30 },
  { section: "Activate", title: "Quick feet", detail: "Fast, small steps on the spot.", seconds: 20 },
  { section: "Activate", title: "Low kicks, controlled", detail: "Gentle kicking motion, no full power yet.", seconds: 20, side: "left" },
  { section: "Activate", title: "Low kicks, controlled", detail: "Swap legs.", seconds: 20, side: "right" },
  { section: "Activate", title: "Light hops and landings", detail: "Soft landings, knees bent.", seconds: 20 },
];

export function buildWarmup(): Step[] {
  const steps: Step[] = [
    { id: "w-prep", title: "Get ready", detail: "Warm-up starts shortly.", seconds: 5, kind: "prep", section: "Warm-up" },
  ];
  warmupMoves.forEach((m, i) =>
    steps.push({ id: `w-${i}`, title: m.title, detail: m.detail, seconds: m.seconds, kind: "work", side: m.side, section: m.section }),
  );
  return steps;
}
