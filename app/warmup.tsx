import { useMemo } from "react";
import { buildWarmup } from "../src/data/warmup";
import { StagePreview } from "../src/StagePreview";

export default function Warmup() {
  const steps = useMemo(() => buildWarmup(), []);
  return (
    <StagePreview
      intro="Move through each step in order. Blue is left, orange is right. A short countdown beeps before each change."
      steps={steps}
      startHref="/run?kind=warmup"
    />
  );
}
